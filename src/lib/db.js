import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db;

async function initDb() {
    if (db) return db;

    db = await open({
      filename: `${process.cwd()}/db/main.db`,
      driver: sqlite3.Database
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS auth (username TEXT, password TEXT, ip TEXT, valid TEXT);
    `);
    await db.run(`
      CREATE TABLE IF NOT EXISTS token (username TEXT, token TEXT, scope TEXT);
    `);

    return db;
}

export {
    initDb
};