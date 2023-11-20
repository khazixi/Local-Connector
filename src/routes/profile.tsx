import Elysia from "elysia"
import { Base, BaseLayout, Nav } from '../templates'
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

    const post = db
      .select()
      .from(posts)
      .where(eq(posts.author, session.user.username))

    const authenticated = !!session
    return (
      <Base>
        <BaseLayout>
          <Nav authenticated={authenticated} />
        </BaseLayout>
      </Base>
    )
  })
