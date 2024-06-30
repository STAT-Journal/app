import * as SQLite from 'expo-sqlite';

import { ElementsJSON, Entry, InventoryItem } from './models';


const dbPromise = SQLite.openDatabaseAsync('app.db');

export const setupDatabase = async () => {
  const db = await dbPromise;

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS Entries (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Elements_JSON TEXT
    );
    CREATE TABLE IF NOT EXISTS App (
      Username TEXT PRIMARY KEY,
      Streak INTEGER,
      CurrencyAmount INTEGER,
      InventoryOfItems TEXT
    );
    DROP Table IF EXISTS Item_json;
    CREATE TABLE IF NOT EXISTS Item_json (
      items TEXT
    );
    INSERT INTO Item_json (items) 
    VALUES ('[{"id": 1, "name": "apple", "cost": 10, "icon": "🍎" }, 
              {"id": 2, "name": "banana", "cost": 20, "icon": "🍌" },
              {"id": 3, "name": "cherry", "cost": 30, "icon": "🍒" },
              {"id": 4, "name": "grapes", "cost": 40, "icon": "🍇" },
              {"id": 5, "name": "lemon", "cost": 50, "icon": "🍋" },
              {"id": 6, "name": "orange", "cost": 60, "icon": "🍊" },
              {"id": 7, "name": "pear", "cost": 70, "icon": "🍐" },
              {"id": 8, "name": "pineapple", "cost": 80, "icon": "🍍" },
              {"id": 9, "name": "strawberry", "cost": 90, "icon": "🍓" },
              {"id": 10, "name": "watermelon", "cost": 100, "icon": "🍉" }
              ]');
  `);
};



export const createEntry = async (elementsJSON: ElementsJSON) => {
  const db = await dbPromise;
  const result = await db.runAsync('INSERT INTO Entries (Elements_JSON) VALUES (?)', JSON.stringify(elementsJSON));
  console.log(`Inserted row with ID: ${result.lastInsertRowId}`);
};

export const createUser = async (username: string, streak: number, currencyAmount: number, inventoryOfItems: InventoryItem[]) => {
  const db = await dbPromise;
  const result = await db.runAsync(
    'INSERT INTO App (Username, Streak, CurrencyAmount, InventoryOfItems) VALUES (?, ?, ?, ?)',
    username, streak, currencyAmount, JSON.stringify(inventoryOfItems)
  );
  console.log(`Inserted row with Username: ${username}`);
};

export const createItem = async (items: InventoryItem[]) => {
  const db = await dbPromise;
  const result = await db.runAsync('INSERT INTO Item_json (items) VALUES (?)', JSON.stringify(items));
  console.log(`Inserted row with ID: ${result.lastInsertRowId}`);
};

export const readEntries = async () => {
  const db = await dbPromise;
  const rows = await db.getAllAsync('SELECT * FROM Entries');
  console.log(rows);
  return rows;
};

export const readUsers = async () => {
  const db = await dbPromise;
  const rows = await db.getAllAsync('SELECT * FROM App');
  console.log(rows);
  return rows;
};

interface RowType {
  items: string;
}

export const readItems = async (): Promise<InventoryItem[]> => {
  const db = await dbPromise;
  const rows: RowType[] = await db.getAllAsync('SELECT * FROM Item_json');
  if (rows.length > 0) {
    return JSON.parse(rows[0].items) as InventoryItem[];
  }
  return [];
};


export const readElementsJSON = async (id: number): Promise<ElementsJSON | null> => {
  const db = await dbPromise;
  const row: { Elements_JSON: string } | null = await db.getFirstAsync<{ Elements_JSON: string }>(
    'SELECT Elements_JSON FROM Entries WHERE ID = ?',
    [id]
  );
  
  if (row) {
    return JSON.parse(row.Elements_JSON) as ElementsJSON;
  }
  return null;
};

export const updateEntry = async (id: number, elementsJSON: ElementsJSON) => {
  const db = await dbPromise;
  const result = await db.runAsync('UPDATE Entries SET Elements_JSON = ? WHERE ID = ?', JSON.stringify(elementsJSON), id);
  console.log(`Updated ${result.changes} row(s)`);
};

export const updateUser = async (username: string, streak: number, currencyAmount: number, inventoryOfItems: InventoryItem[]) => {
  const db = await dbPromise;
  const result = await db.runAsync(
    'UPDATE App SET Streak = ?, CurrencyAmount = ?, InventoryOfItems = ? WHERE Username = ?',
    streak, currencyAmount, JSON.stringify(inventoryOfItems), username
  );
  console.log(`Updated ${result.changes} row(s)`);
};

export const updateItem = async (items: InventoryItem[]) => {
  const db = await dbPromise;
  const result = await db.runAsync('UPDATE Item_json SET items = ?', JSON.stringify(items));
  console.log(`Updated ${result.changes} row(s)`);
};

export const updateElementsJSON = async (id: number, elementsJSON: ElementsJSON) => {
  const db = await dbPromise;
  const result = await db.runAsync(
    'UPDATE Entries SET Elements_JSON = ? WHERE ID = ?',
    JSON.stringify(elementsJSON),
    id
  );
  console.log(`Updated ${result.changes} row(s)`);
};

export const deleteEntry = async (id: number) => {
  const db = await dbPromise;
  const result = await db.runAsync('DELETE FROM Entries WHERE ID = ?', id);
  console.log(`Deleted ${result.changes} row(s)`);
};

export const deleteUser = async (username: string) => {
  const db = await dbPromise;
  const result = await db.runAsync('DELETE FROM App WHERE Username = ?', username);
  console.log(`Deleted ${result.changes} row(s)`);
};

export const deleteItem = async () => {
  const db = await dbPromise;
  const result = await db.runAsync('DELETE FROM Item_json');
  console.log(`Deleted ${result.changes} row(s)`);
};

export const deleteElementsJSON = async (id: number) => {
  const db = await dbPromise;
  const result = await db.runAsync('DELETE FROM Entries WHERE ID = ?', id);
  console.log(`Deleted ${result.changes} row(s)`);
};

export const deleteItem = async () => {
  const db = await dbPromise;
  const result = await db.runAsync('DELETE FROM Item_json');
  console.log(`Deleted ${result.changes} row(s)`);
};

export const deleteElementsJSON = async (id: number) => {
  const db = await dbPromise;
  const result = await db.runAsync('DELETE FROM Entries WHERE ID = ?', id);
  console.log(`Deleted ${result.changes} row(s)`);
};