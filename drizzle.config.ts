import type { Config } from 'drizzle-kit'
 
export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./app.db"
  }
} satisfies Config
