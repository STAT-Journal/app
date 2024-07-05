import * as SQLite from 'expo-sqlite';
import { Element, TextEntry, InventoryItem } from './models';

/****************************************************************



NOTE
I believe, because this file is not a functional component, changes made to it will not be hotloaded during runtime.
To see changes, you must restart the server. 



*/
const dbPromise = SQLite.openDatabaseAsync('app.db');

export const setupDatabase = async () => {
  const db = await dbPromise;
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS Entries (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Elements_JSON TEXT,
      CreatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    );
    DROP TABLE IF EXISTS App;
    CREATE TABLE IF NOT EXISTS App (
      StreakLastChecked INTEGER,
      Streak INTEGER,
      CurrencyAmount INTEGER,
      InventoryOfItems TEXT
    );
    INSERT INTO App (StreakLastChecked, Streak, CurrencyAmount, InventoryOfItems)
    VALUES (-1, 0, 100, '[]');
    DROP TABLE IF EXISTS Item_json;
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
    CREATE TABLE IF NOT EXISTS Text_Entries (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Entry TEXT,
      CreatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    );
  `);
};
export const getEntryTimes = async () => {
  const db = await dbPromise;
  const rows :{CreatedAt:string}[]= await db.getAllAsync('SELECT CreatedAt FROM Text_Entries ORDER BY CreatedAt');
  //Create array just from created At values
  let arr: number[] = [];
  rows.map((row) => {
    arr.push(parseInt(row.CreatedAt))
  })
     
  return arr
}
export const checkStreak = async () => {
  const STREAK_BREAK_TIME_IN_SECONDS = 60*24*60;
  const STREAK_WAIT_TIME_IN_SECONDS = 60*12*60;
  const AUTOCHECK_INTERVAL_IN_SECONDS = 60*24*60;


  const entryTimes = await getEntryTimes();
  if(entryTimes.length === 0){
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);


  const result = calculateStreak(entryTimes, currentTime, STREAK_WAIT_TIME_IN_SECONDS, STREAK_BREAK_TIME_IN_SECONDS);
  console.log(`Current streak: ${result}`);

  setTimeout(checkStreak, AUTOCHECK_INTERVAL_IN_SECONDS * 60000); 
  return result;
};

function calculateStreak(entryTimes: number[], currentTime :number, waitTime :number, breakTime :number) {
  if (entryTimes.length === 0) {
    return 0;
  }

  // Sort the entry times in ascending order
  entryTimes.sort((a, b) => a - b);

  let streak = 1; // Start with a streak of 1 since there's at least one entry
  let lastEntryTime = entryTimes[0];

  for (let i = 1; i < entryTimes.length; i++) {
    const entryTime = entryTimes[i];

    // Calculate the time difference between consecutive entries
    const timeDifference = entryTime - lastEntryTime;

    if (timeDifference <= breakTime ) {
      // If the time difference is within the allowed break time, increment the streak
      if (timeDifference >= waitTime) {
        streak++;
      }
      else{

      }
    } else {
      // If the time difference exceeds the break time, reset the streak
      streak = 1;
    }

    // Update the last entry time
    lastEntryTime = entryTime;
  }

  // Calculate the time difference between the last entry and the current time
  const timeSinceLastEntry = currentTime - lastEntryTime;

  // Check if the current time is within the break time to count towards the streak
  if (timeSinceLastEntry > breakTime) {
    streak = 0;
  } else if (timeSinceLastEntry >= waitTime) {
    streak++;
  }

  return streak;
}


export const createTextEntry = async (entry: string) => {
  const db = await dbPromise;
  const result = await db.runAsync("INSERT INTO Text_Entries (Entry, CreatedAt) VALUES (?, strftime('%s', 'now'))", [entry]);
};


export const readTextEntries = async () => {
  const db = await dbPromise;
  const rows = await db.getAllAsync('SELECT * FROM Text_Entries');
  return rows;
}

export const removeTextEntry = async (id: number) => {
  const db = await dbPromise;
  const result = await db.runAsync('DELETE FROM Text_Entries WHERE ID = ?', id);
}

export const updateTextEntry = async (id: number, entry: string) => {
  const db = await dbPromise;
  const result = await db.runAsync('UPDATE Text_Entries SET Entry = ? WHERE ID = ?', entry, id);
}

export const createEntry = async (elementsJSON: Element[]) => {
  const db = await dbPromise;
  console.log(JSON.stringify(elementsJSON));
  const result = await db.runAsync('INSERT INTO Entries (Elements_JSON) VALUES (?)', JSON.stringify(elementsJSON));
};

export const createItem = async (items: InventoryItem[]) => {
  const db = await dbPromise;
  const result = await db.runAsync('INSERT INTO Item_json (items) VALUES (?)', JSON.stringify(items));
  console.log(`Inserted row with ID: ${result.lastInsertRowId}`);
};

export const readEntries = async () => {
  const db = await dbPromise;
  const rows = await db.getAllAsync('SELECT * FROM Entries');
  //console.log(rows);
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


export const readElementsJSON = async (id: number): Promise<Element[] | null> => {
  const db = await dbPromise;
  const row: { Elements_JSON: string } | null = await db.getFirstAsync<{ Elements_JSON: string }>(
    'SELECT Elements_JSON FROM Entries WHERE ID = ?',
    [id]
  );
  
  if (row) {
    return JSON.parse(row.Elements_JSON) as Element[];
  }
  return null;
};

export const updateEntry = async (id: number, elementsJSON:Element[]) => {
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
}
