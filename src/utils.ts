import { eq } from "drizzle-orm"
import { db } from "./db"
import { tokens } from "./schema"
import { isWithinExpiration, generateRandomString } from "lucia/utils"

export const blobToB64 = async (b: Blob) => {
  const buf = Buffer.from(await b.arrayBuffer())
  return buf.toString('base64')
}

export const SECOND = 1000
export const MINUTE = SECOND * 60
export const HOUR = MINUTE * 60
export const DAY = HOUR * 24

const TOKEN_EXPIRATION = HOUR * 2

export const generateVerificationToken = async (userId: string) => {
  const userTokens = await db.select()
    .from(tokens)
    .where(eq(tokens.id, userId))

  if (userTokens.length) {
    const reusableToken = userTokens.find((token) => {
      return isWithinExpiration(Number(token.expires) - TOKEN_EXPIRATION / 2)
    })
    if (reusableToken) return reusableToken.id
  }

  const token = generateRandomString(63)

  await db.insert(tokens)
    .values({
      id: token,
      userId: userId,
      expires: BigInt(new Date().getTime() + TOKEN_EXPIRATION)
    })

  return token
}

export const validateEmailVerificationToken = async (token: string) => {
  const storedToken = await db.transaction(async tx => {
    const [tkn] = await tx // WARNING: Could break Here
      .select()
      .from(tokens)
      .where(eq(tokens.id, token))
      .limit(1)

    if (!tkn) throw Error('Invalid Token')

    await tx
      .delete(tokens)
      .where(eq(tokens.userId, tkn.userId))

    return tkn
  })

  const tokenExpiration = Number(storedToken.expires)
  if (!isWithinExpiration(tokenExpiration)) throw new Error('Token Expired')
  return storedToken.userId
}

export const sendVerificationLink = async(email: string, token: string) => {
  const url = `http://localhost:3000/email-verification/${token}`
    await sendEmail
}
