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
