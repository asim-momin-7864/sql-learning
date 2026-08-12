//* schema
import {
  pgEnum,
  pgTable,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

// Define the enum outside the table
export const statusEnum = pgEnum("status", ["draft", "published", "archived"]);

// notes schema
export const notesTable = pgTable("notes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  status: statusEnum("status").notNull().default("draft"),
  tags: varchar({ length: 100 }).array().notNull().default([]),
  is_archived: boolean().notNull(),
  author_id: integer().notNull().default(1),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
