import Elysia from "elysia";
import { Base, BaseLayout, Nav, PostPreview, PostView, Preview } from '../templates'

export const conn = new Elysia({ prefix: '/connect' })

conn.get('/', () => {
  return (
    <Base>
      <BaseLayout>
        <Nav authenticated={false} />

        <h1 class="text-6xl font-bold drop-shadow-md"> Connect </h1>

        <div class="grid grid-cols-3 gap-4">
          <PostPreview
            class="bg-white h-32"
            title="Business Opens"
            author="Boba Shop Owner"
            description="We opened a new Boba shop in Peabody"
          />

          <PostPreview
            class="bg-white h-32"
            title="Farmer's Market"
            author="Jon Silver"
            description="We have Black Corn at the Farmer's Market today"
          />

          <PostPreview
            class="bg-white h-32"
            title="Party at Umass!"
            author="Alpha Beta Phi"
            description="Fall Celebration!"
          />
          <PostPreview
            class="bg-white h-32"
            title="Business Opens"
            author="Boba Shop Owner"
            description="We opened a new Boba shop in Peabody"
          />

          <PostPreview
            class="bg-white h-32"
            title="Farmer's Market"
            author="Jon Silver"
            description="We have Black Corn at the Farmer's Market today"
          />

          <PostPreview
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

conn.get('/:id', () => {
  return (
    <Base>
      <BaseLayout>
        <PostView
          title="Some Title"
          author="Some Author"
          description="Some Description"
          date={ new Date('3/11/04') }
        />
      </BaseLayout>
    </Base>
  )
})
