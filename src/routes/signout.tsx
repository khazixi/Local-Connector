import Elysia from "elysia";
import { auth } from '../auth'

export const signout = new Elysia({ prefix: '/signout' })
  .post('/', async (c) => {
    const authRequest = auth.handleRequest(c)
    const session = await authRequest.validate()

    console.log(session)

    if (!session) {
      c.set.status = 401
      throw new Error('Unauthorized')
    }

    await auth.invalidateSession(session.sessionId)

    const sessionCookie = auth.createSessionCookie(null)

    c.set.headers = { 'Set-Cookie': sessionCookie.serialize() }
    c.set.status = 302
    c.set.redirect = '/'
  })
