// use tsc build schema from dist folder for successful generate:sqlite
// npx drizzle-kit generate:sqlite   
// npx drizzle-kit push:sqlite  

// node ./dist/main-setup.js

// --config=./src/drizzle_orm/drizzle.config.ts  

// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  // schema: ['./src/drizzle_orm/schema/NSale.ts','./src/drizzle_orm/schema/NSaleDtl.ts'],
  schema: './drizzle.schema.ts',
  out: "./dist/drizzle_orm/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./dps-server.sqlite",
  },
  verbose: true,
  strict: true,
} satisfies Config;