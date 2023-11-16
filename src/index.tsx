import { Html, html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { Base, BaseLayout, ErrorTemplate, Nav, Preview } from "./templates";
import { staticPlugin } from "@elysiajs/static";
import { conn } from './routes/connect'
import { signin } from './routes/signin'
import { signup } from './routes/signup'
import { create } from './routes/create';

const app = new Elysia()
  .use(html())
  .use(staticPlugin({ prefix: '/' }))
  .use(conn)
  .use(signin)
  .use(signup)
  .use(create)
  .onError(({ error, code, set }) => {
    set.headers['content-type'] = 'text/html'
    return (<Base>
      <ErrorTemplate 
        code={code}
        error={error}
      />
    </Base>)
    })
  .get("/", () => (
      <Base>
        <BaseLayout>
          <Nav authenticated={false}></Nav>
          <div>
            <h1 class="text-8xl font-extrabold my-8 drop-shadow-lg"> Local Connector </h1>
            <h3 class="text-gray-400"> Connect with Your Local Area </h3>
          </div>

          <div class="w-full p-8 drop-shadow-md">
            <h2 class="text-6xl font-bold mb-8 w-7/12"> New Ways to Connect! </h2>

            <p class="text-xl text-gray-600 w-7/12">
              In the modern world we are <b class="font-semibold text-gray-900"> Disconnected </b> from the people around us.
              We often know more about the world thousands of miles away than one thats just one.
              At Local Connector we seek to provide people <b class="font-semibold text-gray-900">fun, informative,</b> and <b class="font-semibold text-gray-900"> intriguing</b> ways to connect
              to the towns they are from.
            </p>
          </div>



          <div class="grid grid-cols-3 gap-20 bg-blue-700 justify-center w-full h-96 p-4">
            <h2 class="text-5xl text-white font-bold drop-shadow col-span-3 text-center mt-8"> View Events </h2>
            <Preview
              class="rotate-[351deg] bg-white h-32"
              title="Business Opens"
              author="Boba Shop Owner"
              description="We opened a new Boba shop in Peabody"
            />

            <Preview
              class="rotate-3 bg-white h-32"
              title="Farmer's Market"
              author="Jon Silver"
              description="We have Black Corn at the Farmer's Market today"
            />

            <Preview
              class="rotate-[6deg] bg-white h-32"
              title="Party at Umass!"
              author="Alpha Beta Phi"
              description="Fall Celebration!"
            />
          </div>

          <div class="w-full flex flex-col items-center gap-8">
            <h3 class='text-2xl drop-shadow-sm'> Start Connecting to your local community </h3>
            <a class="text-xl bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700" href="/connect"> Here! </a>
          </div>

          <footer class="bg-white flex flex-col gap-8 p-8 justify-start w-full">
            <h6 class="text-gray-400"> Made with Elysia, Bun, SQLite, HTMX, and Tailwind </h6>
            <h6 class="text-gray-400"> Made by Jason Simmonds </h6>
          </footer>
        </BaseLayout>
      </Base>
    ))

app.listen(Bun.env.PORT)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
