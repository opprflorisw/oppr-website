import "server-only";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "blog.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    // Ensure data directory exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");

    _db.exec(`
      CREATE TABLE IF NOT EXISTS articles (
        slug TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        category_label TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT 'en',
        format TEXT NOT NULL DEFAULT 'post',
        published_date TEXT NOT NULL,
        reading_time INTEGER NOT NULL DEFAULT 3,
        image TEXT,
        youtube_url TEXT,
        pdf_url TEXT,
        featured INTEGER NOT NULL DEFAULT 0,
        draft INTEGER NOT NULL DEFAULT 0
      )
    `);
  }
  return _db;
}
