import * as SQLite from 'expo-sqlite';
import { AppUser, ElementsJSON, Entry, InventoryItem } from './models';
import { time } from 'drizzle-orm/mysql-core';

const dbPromise = SQLite.openDatabaseAsync('app.db');

export const setupDatabase = async () => {
  const db = await dbPromise;

    //if you have issues with the database, uncomment the following line to drop the tables and then comment it back after running the app once
    //Drop tables if they exist
   /* await db.execAsync(`
      DROP TABLE IF EXISTS Entries;
      DROP TABLE IF EXISTS App;
      DROP TABLE IF EXISTS Item_json;
    `);*/

  //Create tables
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
      LastEntry INTERGER,
      InventoryOfItems TEXT
    );
    CREATE TABLE IF NOT EXISTS Item_json (
      items TEXT
    );
  `);

  //uncomment the following line to test the user creation and streak incrementation then comment it back after running the app once
 //testUser();
};

const testUser = async () => {
  const username = 'testUser';
  const streak = 0;
  const currencyAmount = 100;
  const lastEntry = new Date().getTime() / 1000;
  const inventoryOfItems: InventoryItem[] = [];

  await createUser(username, streak, currencyAmount, lastEntry, inventoryOfItems);
  console.log('Test user created successfully');
};

export const createEntry = async (elementsJSON: ElementsJSON, username: string) => {
  const db = await dbPromise;
  const result = await db.runAsync('INSERT INTO Entries (Elements_JSON) VALUES (?)', JSON.stringify(elementsJSON));
  const lastInsertId = result.lastInsertRowId;
  console.log(`Inserted row with ID: ${lastInsertId}`);

  //Get current date/time
  const currentDateTime = new Date().getTime() / 1000;

  //Update the LastEntry for the user
  const updateResult = await db.runAsync('UPDATE App SET LastEntry = ? WHERE Username = ?', [currentDateTime, username]);
  console.log(`Updated LastEntry for username: ${username}, affected rows: ${updateResult.changes}`);
};


export const updateStreak = async (username: string) => {
  const db = await dbPromise;
  const user = await db.getFirstAsync<AppUser>('SELECT * FROM App WHERE Username = ?', [username]);

  if (user) {
    const lastEntryTime = new Date(user.LastEntry * 1000); // Convert back to milliseconds
    const currentTime = new Date();
    const timeDifference = (currentTime.getTime() - lastEntryTime.getTime()) / 1000; // in seconds

    //console.log('lastEntryTime: ', lastEntryTime.getTime() / 1000); // Log in seconds
    //console.log('timeDifference: ', timeDifference);


    //reset the streak if the user streak is 0 and the user has not entered in the last 7 days
    if (user.Streak > 0 && timeDifference > 604800){
      //Reset streak
      await db.runAsync('UPDATE App SET Streak = 0 WHERE Username = ?', [username]);
      console.log(`Streak reset for username: ${username}`);
    }
  }
};

export const incrementStreak = async (username: string) => {

  const db = await dbPromise;
  const user = await db.getFirstAsync<AppUser>('SELECT * FROM App WHERE Username = ?', [username]);
  
  if(user) {
    const lastEntryTime = new Date(user.LastEntry * 1000); //Convert back to milliseconds
    const currentTime = new Date();
    const timeDifference = (currentTime.getTime() - lastEntryTime.getTime()) / 1000; //in seconds

    //Increment the streak if the user has not entered in the last 24 hours or if the streak is 0
    if (timeDifference >= 86400 || user.Streak === 0){
      //Increment streak
      const newStreak = user.Streak + 1;
      await db.runAsync('UPDATE App SET Streak = ? WHERE Username = ?', [newStreak, username]);
      console.log(`Streak incremented for username: ${username}, new streak: ${newStreak}`);
    }
  }
};

export const getUserStreak = async (username: string): Promise<number> => {
  const db = await dbPromise;
  const user = await db.getFirstAsync<AppUser>('SELECT Streak FROM App WHERE Username = ?', [username]);
  return user ? user.Streak : 0;
};


export const createUser = async (username: string, streak: number, currencyAmount: number, lastEntry: number, inventoryOfItems: InventoryItem[]) => {
  const db = await dbPromise;
  const result = await db.runAsync(
    'INSERT INTO App (Username, Streak, CurrencyAmount, LastEntry, InventoryOfItems) VALUES (?, ?, ?, ?, ?)',
    username, streak, currencyAmount, lastEntry, JSON.stringify(inventoryOfItems)
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

export const updateUser = async (username: string, streak: number, currencyAmount: number, lastEntry: number, inventoryOfItems: InventoryItem[]) => {
  const db = await dbPromise;
  const result = await db.runAsync(
    'UPDATE App SET Streak = ?, CurrencyAmount = ?, LastEntry = ?, InventoryOfItems = ? WHERE Username = ?',
    streak, currencyAmount, lastEntry, JSON.stringify(inventoryOfItems), username
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