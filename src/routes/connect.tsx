import Elysia from "elysia";
import { Base, BaseLayout, Nav } from '../templates'

export const conn = new Elysia({ prefix: '/connect' })

conn.get('/', () => {
  return (
    <Base>
      <BaseLayout>
        <Nav authenticated={false}/>

        <h1> Connect </h1>
      </BaseLayout>
    </Base>
  )
})

