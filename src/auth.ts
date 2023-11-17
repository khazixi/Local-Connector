import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { google } from '@lucia-auth/oauth/providers'
import { lucia } from "lucia";
import { elysia } from "lucia/middleware";
import { sqlite } from "./db";

export const auth = lucia({
  adapter: betterSqlite3(sqlite, {
    user: 'user',
    session: 'session',
    key: 'key'
  }),
  env: "DEV",
  middleware: elysia(),
  sessionCookie: {
    expires: false
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      verified: data.verified,
    }
  }
})

export const googleAuth = google(auth, {
  clientId: Bun.env.GOOGLE_CLIENT_ID,
  clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
  // WARNING: Will break with real URLs
  redirectUri: `http://localhost:${Bun.env.PORT}/signin/google/callback`
})

export type Auth = typeof auth
