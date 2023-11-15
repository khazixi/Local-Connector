import Elysia from "elysia";
import { AuthView, Base, BaseLayout, Nav } from '../templates'

export const signin = new Elysia({ prefix: '/signin' })

signin.get('/', () => {
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

signin.post('/', ({ set }) => {
  set.redirect='/'
})
