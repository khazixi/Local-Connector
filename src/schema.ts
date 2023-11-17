import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  image: blob('image', { mode: 'buffer' }),
  type: text('text'), // INFO: Should be either a jpeg or png
})

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey(),
  parent_id: integer('parent_id').notNull(),
  author: text('author').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  image: blob('image', { mode: 'buffer' }),
  type: text('text'), // INFO: Should be either a jpeg or png
})

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  // NOTE: Fields below should be nullable because 
  // The user either has a username or has an email
  // not both (yet)
  username: text('username'),
  email: text('email'),
  verified: integer('verified'),
})

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id),
  activeExpires: blob("active_expires", { mode: "bigint" })
    .notNull(),
  idleExpires: blob("idle_expires", { mode: "bigint" })
    .notNull()
})

export const key = sqliteTable("key", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password")
})
