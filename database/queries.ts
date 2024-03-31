import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm/sql/expressions";
import { openDatabaseSync } from "expo-sqlite/next";

import { entries, SelectUser } from "./schema";

const expo = openDatabaseSync("db.db");
const db = drizzle(expo);

export const addEntryToDB = (title: string, description: string) => {
  return db
    .insert(entries)
    .values({ title, description })
    .returning({ id: entries.id });
};

export const getEntries = (): Promise<SelectUser[]> => {
  return db.select().from(entries);
};
export const removeEntryFromDB = (id: number) => {
  db.delete(entries).where(eq(entries.id, id));
};
