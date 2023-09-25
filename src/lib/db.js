import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db;

async function initDb() {
    if (db) return db;

    db = await open({
      filename: `${process.cwd()}/db/main.db`,
      driver: sqlite3.Database
    });

    return db;
}

export {
    initDb
};