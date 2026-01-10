import sqlite3 from "sqlite3"

const db = new sqlite3.Database("./rsvp.db")

// Initialize table
db.run(`
  CREATE TABLE IF NOT EXISTS rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    attending TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export default db
