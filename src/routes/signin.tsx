import Elysia from "elysia";
import { Base, BaseLayout, Nav } from '../templates'

export const signin = new Elysia({ prefix: '/signin' })

signin.get('/', () => {
  return (
    <Base>
      <BaseLayout>
        <form
          class="flex flex-col shadow rounded-md justify-center items-center p-4 gap-y-4 mt-24"
          action="/signin" method="post">
          <h2 class="text-gray-800 font-semibold text-center text-xl"> Sign Up</h2>
          <label> Email </label>
          <input type="email" name="email" class="border border-gray-500 rounded-sm" />
          <label> Password </label>
          <input type='password' name="password" class="border border-gray-500 rounded-sm" />
          <div class="flex flex-row gap-4">
            <button type="submit" class="bg-green-400 p-2 rounded"> Save </button>
            <a class="bg-blue-400 p-2 rounded" href="/signup"> Sign Up </a>
            <a class="bg-blue-400 p-2 rounded" href="/"> Back </a>
          </div>
        </form>
      </BaseLayout>
    </Base>
  )
})

