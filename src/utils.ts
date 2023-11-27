import { eq } from "drizzle-orm"
import { db } from "./db"
import { tokens } from "./schema"
import { isWithinExpiration, generateRandomString } from "lucia/utils"

export const blobToB64 = async (b: Blob) => {
  const buf = Buffer.from(await b.arrayBuffer())
  return buf.toString('base64')
}

export const imageCorrecter = async (b?: Blob) => {
  if (b) {
    return {
      type: b.type,
      image: Buffer.from(await b.arrayBuffer())
    }
  } else {
    return {
      type: null,
      image: null
    }
  }

}
