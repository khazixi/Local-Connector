import Elysia, { t } from "elysia";
import { Base, BaseLayout, Nav, PostPreview, PostView, Preview } from '../templates'
import { db } from "../db";
import { posts } from "../schema";
import { eq } from "drizzle-orm";
import { blobToB64 } from "../utils";

export const conn = new Elysia({ prefix: '/connect' })

conn.get('/', () => {
  return (
    <Base>
      <BaseLayout>
        <Nav authenticated={false} />

        <h1 class="text-6xl font-bold drop-shadow-md"> Connect </h1>

        <div class="grid grid-cols-3 gap-4">
          <PostPreview
            id={1}
            class="bg-white h-32"
            title="Business Opens"
            author="Boba Shop Owner"
            description="We opened a new Boba shop in Peabody"
          />

          <PostPreview
            id={1}
            class="bg-white h-32"
            title="Farmer's Market"
            author="Jon Silver"
            description="We have Black Corn at the Farmer's Market today"
          />

          <PostPreview
            id={1}
            class="bg-white h-32"
            title="Party at Umass!"
            author="Alpha Beta Phi"
            description="Fall Celebration!"
          />
          <PostPreview
            id={1}
            class="bg-white h-32"
            title="Business Opens"
            author="Boba Shop Owner"
            description="We opened a new Boba shop in Peabody"
          />

          <PostPreview
            id={1}
            class="bg-white h-32"
            title="Farmer's Market"
            author="Jon Silver"
            description="We have Black Corn at the Farmer's Market today"
          />

          <PostPreview
            id={1}
            class="bg-white h-32"
            title="Party at Umass!"
            author="Alpha Beta Phi"
            description="Fall Celebration!"
          />
        </div>
      </BaseLayout>
    </Base>
  )
})

conn.get('/:id', async ({ params: { id } }) => {
  const [d] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))

  let image
  if (!d.image) image = null
  else image = d.image.toString('base64')

  return (
    <Base>
      <BaseLayout>
        <Nav authenticated={false} />
        <PostView
          image={image}
          title={d.title}
          author={d.author}
          description={d.description}
          date={new Date('3/11/04')}
        />
      </BaseLayout>
    </Base>
  )
}, {
  params: t.Object({
    id: t.Numeric()
  })
})
