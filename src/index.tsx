import { Html, html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { Base, BaseLayout, Preview } from "./templates";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia()
  .use(html())
  .use(staticPlugin({ prefix: '/' }))
  .get("/", () => (
    <Base>
      <BaseLayout>
        <div>
          <h1 class="text-8xl font-bold my-8 drop-shadow-lg"> Local Connector </h1>
          <h3 class="text-gray-400"> Connect To Your Local Area </h3>
        </div>


        <h2 class="text-4xl font-bold drop-shadow-sm"> View Events </h2>

        <div class="grid grid-cols-3 gap-20">
          <Preview
            class="rotate-[351deg]"
            title="Business Opens"
            author="Boba Shop Owner"
            description="We opened a new Boba shop in Peabody"
          />

          <Preview
            class="rotate-3"
            title="Farmer's Market"
            author="Jon Silver"
            description="We have Black Corn at the Farmer's Market today"
          />

          <Preview
            class="rotate-[6deg]"
            title="Party at Umass!"
            author="Alpha Beta Phi"
            description="Fall Celebration!"
          />
        </div>
      </BaseLayout>
    </Base>
  ))

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
