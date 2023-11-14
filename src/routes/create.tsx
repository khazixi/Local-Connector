import { Elysia, t } from "elysia";
import { Base, BaseLayout, Nav } from '../templates'
import { posts } from '../schema'
import { db } from "../db";


export const create = new Elysia({ prefix: '/create' })

create.get('/', () => (
  <Base>
    <BaseLayout>
      <Nav authenticated={false} />
      <form action="/create" method='POST' class='flex flex-col' enctype='multipart/form-data'>
        <h1 class='text-4xl'> Create a new post </h1>
        <label for="title"> Title </label>
        <input type="text" name="title" />
        <label for='author'> Author </label>
        <input type='text' name='author' />
        <label for='desc'> Description </label>
        <input type='text' name='desc' />
        <label for='image'> Image </label>
        <input type='file' name='image' />
        <button type="submit"> Submit </button>
      </form>
    </BaseLayout>
  </Base>
))

create.post('/', async ({ body, set }) => {
  const date = new Date()

  let image = null
  if (typeof body.image === 'string') {
    image = null
  } else if (body.image === undefined) {
    image = null
  } else {
    image = Buffer.from(await body.image.arrayBuffer())
  }

  try {
    await db
      .insert(posts)
      .values({
        title: body.title,
        author: body.author,
        description: body.desc,
        date: (date).toISOString(),
        image: image
      })
  } catch (e) {
    return (
      <h1> Failed to Save Data do the database </h1>
    )
  }

  set.redirect = '/'
}
  , {
    type: 'multipart/form-data',
    body: t.Object({
      title: t.String(),
      author: t.String(),
      desc: t.String(),
      image: t.Union([t.String(), t.File()])
    })
  }
)