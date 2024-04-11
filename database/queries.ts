import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm/sql/expressions";
import { openDatabaseSync } from "expo-sqlite/next";

import { entries, SelectEntry, InsertEntry } from "./schema";

const expo = openDatabaseSync("db.db");
const db = drizzle(expo);

export const addEntryToDB = async (
  newEntry: InsertEntry,
): Promise<SelectEntry[]> => {
  return db
    .insert(entries)
    .values({ title: newEntry.title, description: newEntry.description })
    .returning();
};

export const getEntries = async (): Promise<SelectEntry[]> => {
  return db.select().from(entries);
};

export const removeEntryFromDB = async (
  id: number,
): Promise<{ id: number }[]> => {
  return db
    .delete(entries)
    .where(eq(entries.id, id))
    .returning({ id: entries.id });
};
