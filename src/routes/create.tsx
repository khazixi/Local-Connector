import { Elysia, t } from "elysia";
import { Base, BaseLayout, Nav } from '../templates'
import { posts } from '../schema'
import { db } from "../db";
import { auth } from "../auth";


export const create = new Elysia({ prefix: '/create' })

create.get('/', async (c) => {
  const authRequest = auth.handleRequest(c)
  const session = await authRequest.validate()

  if (!session) {
    c.set.redirect = '/'
    c.set.status = 401
    return 'Not Authenticated'
  }

  const authenticated = !!session

  return (
    <Base>
      <BaseLayout>
        <Nav authenticated={authenticated} />
        <form action="/create" method='POST' class='flex flex-col gap-4' enctype='multipart/form-data'>
          <h1 class='text-4xl'> Create a new post </h1>
          <label for="title"> Title </label>
          <input
            type="text"
            class="border invalid:border-red-400 invalid:text-red-400 valid:border-gray-200 valid:text-gray-300 rounded"
            name="title"
            required
            hx-validate
          />
          <label for='desc'> Description </label>
          <input
            type='text'
            class="border invalid:border-red-400 invalid:text-red-400 valid:border-gray-200 valid:text-gray-300 rounded"
            name='desc'
            required
            hx-validate
          />
          <label for='image'> Image </label>
          <input type='file' class="border invalid:border-red-400 invalid:text-red-400 valid:border-gray-200 valid:text-gray-300 rounded" name='image' />
          <button type="submit" class="bg-black text-white p-2 rounded"> Submit </button>
        </form>
      </BaseLayout>
    </Base>
  )
})

create.post('/', async (c) => {

  const authRequest = auth.handleRequest(c)
  const session = await authRequest.validate()

  if (!session) {
    c.set.status = 401
    throw new Error('Not Authenticated')
  }

  const date = new Date()

  let image = null
  let type = null
  if (typeof c.body.image === 'string') {
    image = null
  } else if (c.body.image === undefined) {
    image = null
  } else {
    type = c.body.image.type
    image = Buffer.from(await c.body.image.arrayBuffer())
  }

  try {
    await db
      .insert(posts)
      .values({
        title: c.body.title,
        author: session.user.googleUsername,
        description: c.body.desc,
        date: (date).toISOString(),
        image: image,
        type: type
      })
  } catch (e) {
    return (
      <h1> Failed to Save Data do the database </h1>
    )
  }

  c.set.redirect = '/'
}
  , {
    type: 'multipart/form-data',
    body: t.Object({
      title: t.String(),
      desc: t.String(),
      image: t.Optional(t.Union([t.String(), t.File()]))
    })
  }
)
