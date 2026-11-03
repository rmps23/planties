// Applies db/schema.sql and db/seed_species.sql to the Neon database in DATABASE_URL_UNPOOLED
// (written to .env by `neon deploy`). Run once on an empty database: npm run db:setup
import { readFile } from "node:fs/promises";
import pg from "pg";

try {
  process.loadEnvFile(".env");
} catch {
  // variables may come from the environment instead
}

const url = process.env.DATABASE_URL_UNPOOLED;
if (!url) {
  console.error("DATABASE_URL_UNPOOLED is not set. Run `neon deploy` first.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  for (const file of ["schema.sql", "seed_species.sql"]) {
    await client.query(await readFile(new URL(`../db/${file}`, import.meta.url), "utf8"));
    console.log(`applied db/${file}`);
  }
} finally {
  await client.end();
}
