import Elysia from "elysia";
import { AuthView, Base, BaseLayout, Nav } from '../templates'
import { auth } from "../auth";

export const signup = new Elysia({ prefix: 'signup' })

signup.get('/', async (c) => {
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
        <AuthView
          route="/signup"
          desc="Sign Up"
          alt="Sign In"
          altroute="/signin"
        />
      </BaseLayout>
    </Base>
  )
})

signup.post('/', ({ set }) => {
  set.redirect = '/'
})
