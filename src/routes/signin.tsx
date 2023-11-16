import Elysia from "elysia";
import { AuthView, Base, BaseLayout, Nav } from '../templates'
import { auth, googleAuth } from "../auth";
import { parseCookie, serializeCookie } from "lucia/utils";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { User } from "lucia";

export const signin = new Elysia({ prefix: '/signin' })
  .get('/', async () => {
    return (
      <Base>
        <BaseLayout>
          <AuthView
            route="/signin"
            desc="Sign In"
            alt="Sign Up"
            altroute="/signup"
          />
        </BaseLayout>
      </Base>
    )
  })
  .post('/', ({ set }) => {
    set.redirect = '/'
  })
  .get('/google', async () => {
    const [url, state] = await googleAuth.getAuthorizationUrl()
    const stateCookie = serializeCookie('google_oauth_state', state, {
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: 60 * 60
    })
    return new Response(null, {
      status: 302,
      headers: {
        location: url.toString(),
        'Set-Cookie': stateCookie
      }
    })
  })
  .get('/google/callback', async ({ request, set }) => { // TODO: Turn this into more idionomatic Elysia Code
    const cookies = parseCookie(request.headers.get('Cookie') ?? "")
    const storedState = cookies.google_oauth_state
    const url = new URL(request.url)
    const state = url.searchParams.get('state')
    const code = url.searchParams.get('code')

    if (!storedState || !state || storedState !== state || !code) {
      return new Response(null, {
        status: 400
      })
    }

    try {
      let user: User | null = null
      const { getExistingUser, googleUser, createUser } = await googleAuth.validateCallback(code)

      const existingUser = await getExistingUser()
      if (existingUser) user = existingUser
      else user = await createUser({
        attributes: {
          username: googleUser.name
        }
      })

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      })

      const sessionCookie = auth.createSessionCookie(session)
      // console.log('cookie', sessionCookie)
      // console.log('serialized cookie', sessionCookie.serialize())
      return new Response(null, {
        headers: {
          location: '/',
          'Set-Cookie': sessionCookie.serialize()
        },
        status: 302
      })
    } catch (e) {
      if (e instanceof OAuthRequestError) {
        console.log(e.message)
        return new Response(null, { status: 400 })
      }
      console.log('An Unknown Error Occured')
      console.log(e.message)
      return new Response(null, { status: 500 })
    }

  })
