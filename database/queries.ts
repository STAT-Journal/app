import * as SQLite from "expo-sqlite";

import { Entry } from "./models";
// From database/models.ts
// export interface Entry {
//     id: number;
//     title: string;
//     description: string;
//   }

// Open the database

const db = SQLite.openDatabaseSync("db.db");

// Create a table if it doesn't already exist
export const initDB = () => {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    )`
);
};


