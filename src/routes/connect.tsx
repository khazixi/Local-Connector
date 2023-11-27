import Elysia, { t } from "elysia";
import { Base, BaseLayout, CommentView, Nav, PostPreview, PostView, Preview } from '../templates'
import { db } from "../db";
import { comments, posts } from "../schema";
import { eq } from "drizzle-orm";
import { auth } from "../auth";

export const conn = new Elysia({ prefix: '/connect' })

conn.get('/', async (c) => {
  const authRequest = auth.handleRequest(c)
  const session = await authRequest.validate()

  const authenticated = !!session
  const p = await db
    .select({
      id: posts.id,
      title: posts.title,
      author: posts.author,
      description: posts.description,
    })
    .from(posts)
  return (
    <Base>
      <BaseLayout>
        <Nav authenticated={authenticated} />

        <h1 class="text-6xl font-bold drop-shadow-md"> Connect </h1>

        <div class="grid grid-cols-3 gap-4">

          {
            p.map(post => (
              <PostPreview
                class="bg-white h-32"
                id={post.id}
                title={post.title}
                author={post.author}
                description={post.description}
              />

            ))
          }
        </div>
      </BaseLayout>
    </Base>
  )
})

conn.get('/:id', async (c) => {
  const authRequest = auth.handleRequest(c)
  const session = await authRequest.validate()

  const authenticated = !!session

  const [d] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, c.params.id))

  const comment = await db
    .select()
    .from(comments)
    .where(eq(comments.parent_id, c.params.id))

  let image
  if (!d.image) image = null
  else image = Buffer.from(d.image).toString('base64')

  return (
    <Base>
      <BaseLayout>
        <Nav authenticated={authenticated} />
        <PostView
          authenticated={authenticated}
          id={d.id}
          tag={d.type}
          image={image}
          title={d.title}
          author={d.author}
          description={d.description}
          date={new Date('3/11/04')}
        >
          {
            comment.map(v => <CommentView {...v} />)
          }
        </PostView>
      </BaseLayout>
    </Base>
  )
}, {
  params: t.Object({
    id: t.Numeric()
  })
})
