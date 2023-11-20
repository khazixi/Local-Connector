import Elysia, { t } from "elysia"
import { Base, BaseLayout, Nav, PostEditableView } from '../templates'
import { auth } from "../auth";
import { db } from "../db";
import { posts } from '../schema'
import { eq } from "drizzle-orm";

export const profile = new Elysia({ prefix: '/profile' })
  .get('/', async (c) => {
    const authRequest = auth.handleRequest(c)
    const session = await authRequest.validate()

    if (!session) {
      c.set.redirect = '/'
      c.set.status = 401
      return 'Not Authenticated'
    }

    const post = await db
      .select()
      .from(posts)
      .where(
        eq(posts.author, session.user.username!)
      )

    const authenticated = !!session
    return (
      <Base>
        <BaseLayout>
          <Nav authenticated={authenticated} />
          {
            post.map(v => <PostEditableView {...v} />)
          }
        </BaseLayout>
      </Base>
    )
  })
  .delete('/:id', async (c) => {
    const authRequest = auth.handleRequest(c)
    const session = await authRequest.validate()

    if (!session) {
      c.set.redirect = '/'
      c.set.status = 401
      return 'Not Authenticated'
    }

    await db
      .delete(posts)
      .where(
        eq(posts.id, c.params.id)
      )

    return ""
  }, {
    params: t.Object({
      id: t.Numeric()
      })
  })
