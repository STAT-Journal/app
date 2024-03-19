import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import * as SQLite from 'expo-sqlite';
import { Entry } from './models';
// From database/models.ts
// export interface Entry {
//     id: number;
//     title: string;
//     description: string;
//   }

// Open the database

const db = SQLite.openDatabase('db.db');

// Create a table if it doesn't already exist
export const initDB = () => new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT);',
            [],
            () => resolve(),
            (_, error) => {
                console.error('Database initialization error: ', error);
                reject(error);
                return true;
            }
        );
    });

 });

export const addFakeEntries = () => new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO entries (title, description) VALUES (?, ?)',
            ['Hello', 'World'],
            () => resolve(),
            (_, error) => {
                console.error('Database initialization error: ', error);
                reject(error);
                return true;
            }
        );
    });

 });


export const addEntryToDB = (title: string, description: string) => new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql('insert into entries (title, description) values (?, ?)', [title, description], () => {
            resolve();
        }, (_, error) => {
            reject(error);
            return true;
        });
    });
});


export const getEntries = (): Promise<Entry[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('select * from entries', [], (_, { rows }) => {
                console.log((rows._array))
                resolve(rows._array);
            }, (_, error) => {
                reject(error);
                return true;
            });
        });
    });
}
