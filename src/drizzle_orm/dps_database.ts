
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

// import { Database } from "bun:sqlite";
// import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("dps-server.sqlite");
export const dbDps2n3 = drizzle(sqlite);

// if (import.meta.url === `file://$ {process.argv[1]}`) { }