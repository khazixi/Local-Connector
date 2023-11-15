import Elysia from "elysia";
import { AuthView, Base, BaseLayout, Nav } from '../templates'

export const signup = new Elysia({ prefix: 'signup' })

signup.get('/', () => {
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
  set.redirect='/'
})
