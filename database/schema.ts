import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const entries = sqliteTable("entries", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export type SelectUser = InferSelectModel<typeof entries>;
export type InsertUser = InferInsertModel<typeof entries>;
