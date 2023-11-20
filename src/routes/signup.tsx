import Elysia, { t } from "elysia";
import { AuthView, Base, BaseLayout, Nav, SignupView } from '../templates'
import { generateVerificationToken, validateEmailVerificationToken } from '../utils'
import { auth } from "../auth";

export const signup = new Elysia({ prefix: 'signup' })
  .get('/', async (c) => {
    const authRequest = auth.handleRequest(c)
    const session = await authRequest.validate()
    if (session) {
      return new Response(null, {
        headers: {
          location: '/'
        },
        status: 302
      })
    }
    return (
      <Base>
        <BaseLayout>
          <SignupView
            route="/signup"
            desc="Sign Up"
            alt="Sign In"
            altroute="/signin"
          />
        </BaseLayout>
      </Base>
    )
  })
  .post('/', async ({ set, body }) => {
    try {
      const user = await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: body.email,
          password: body.password,
        },
        attributes: {
          email: body.email.toLowerCase(),
          verified: false
        }
      })

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      })

      const token = await generateVerificationToken(user.userId)
      await validateEmailVerificationToken(token)

      const sessionCookie = auth.createSessionCookie(session)
      set.status = 302
      set.redirect = '/'
      set.headers = {
        'Set-Cookie': sessionCookie.serialize()
      }
      return null
    } catch (e) {
      if (e instanceof Error) {
        set.status = 400
        throw e
      }
    }
  }, {
    type: 'application/x-www-form-urlencoded',
    body: t.Object({
      email: t.String({ format: 'email' }),
      username: t.String({ maxLength: 32, minLength: 8 }),
      password: t.String({ maxLength: 32, minLength: 8 }),
    })
  })
