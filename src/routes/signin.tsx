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
      set.status = 400
      return null
    }

    try {
      console.log('Entering Try')
      let user: User | null = null
      const { getExistingUser, googleUser, createUser } = await googleAuth.validateCallback(code)

      console.log('Validated Callback')
      const existingUser = await getExistingUser()
      console.log('Retrieved initial user: ', existingUser)
      if (existingUser) {
        user = existingUser
      } else {
        user = await createUser({
          attributes: {
            username: googleUser.name
          }
        })
      }
      console.log('User: ', user)

      console.log('Checked User')

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      })

      console.log('Creating Session')

      const sessionCookie = auth.createSessionCookie(session)
      // console.log('cookie', sessionCookie)
      // console.log('serialized cookie', sessionCookie.serialize())
      console.log('Setting Cookies')
      set.status = 302
      set.headers = {
        "Set-Cookie": sessionCookie.serialize()
      }
      set.redirect = '/'
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
        throw e
        // return new Response(null, { status: 400 })
      }
      console.log('An Unknown Error Occured')
      console.log(e.message)
      return new Response(null, { status: 500 })
    }

  })
