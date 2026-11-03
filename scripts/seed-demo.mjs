// Creates the demo account and a few sample posts, comments and a question on the Neon database.
// Reads DATABASE_URL_UNPOOLED and NEON_AUTH_BASE_URL from .env (written by `neon deploy`).
// Demo credentials come from VITE_DEMO_EMAIL / VITE_DEMO_PASSWORD (or DEMO_EMAIL / DEMO_PASSWORD).
// Usage: npm run seed:demo
import { readFile } from "node:fs/promises";
import pg from "pg";
import sharp from "sharp";

try {
  process.loadEnvFile(".env");
} catch {
  // variables may come from the environment instead
}

const env = process.env;
const email = env.DEMO_EMAIL ?? env.VITE_DEMO_EMAIL;
const password = env.DEMO_PASSWORD ?? env.VITE_DEMO_PASSWORD;
const authUrl = env.NEON_AUTH_BASE_URL;
if (!env.DATABASE_URL_UNPOOLED || !authUrl || !email || !password) {
  console.error("Set DATABASE_URL_UNPOOLED, NEON_AUTH_BASE_URL and the demo email/password (see .env.example).");
  process.exit(1);
}

const db = new pg.Client({ connectionString: env.DATABASE_URL_UNPOOLED });
await db.connect();

try {
  // 1. Create the user through the normal sign-up endpoint so the password is hashed by Better Auth.
  let { rows } = await db.query('select id from neon_auth."user" where email = $1', [email]);
  if (rows.length === 0) {
    const res = await fetch(`${authUrl}/sign-up/email`, {
      method: "POST",
      headers: { "content-type": "application/json", origin: "http://localhost:5173" },
      body: JSON.stringify({ email, password, name: "demo_gardener" }),
    });
    if (!res.ok) throw new Error(`Sign-up failed (${res.status}): ${await res.text()}`);
    ({ rows } = await db.query('select id from neon_auth."user" where email = $1', [email]));
  }
  const userId = rows[0].id;

  // 2. Reset the demo content so the script can run again.
  await db.query("delete from public.posts where author_id = $1", [userId]);
  await db.query("delete from public.questions where author_id = $1", [userId]);
  const species = Object.fromEntries((await db.query("select id, slug from public.species")).rows.map((s) => [s.slug, s.id]));

  const photo = async (file) => {
    const jpeg = await sharp(await readFile(new URL(`../public/assets/plants/${file}`, import.meta.url)))
      .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 70 })
      .toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  };

  const insertPost = async (slug, body, image) =>
    (await db.query(
      "insert into public.posts (author_id, species_id, body, image_url) values ($1, $2, $3, $4) returning id",
      [userId, species[slug], body, image]
    )).rows[0].id;

  const lily = await insertPost("peace-lily", "My peace lily finally bloomed after a winter by the window. Watering once a week, whenever it droops a little.", await photo("peace-lily.jpg"));
  await insertPost("spider-plant", "Spider plant babies are everywhere. Anyone want cuttings?", await photo("spider-plant.jpg"));
  await insertPost("monstera", "New leaf unfurling on the monstera, first split one this year!", null);
  await db.query("insert into public.comments (post_id, author_id, body) values ($1, $2, $3)", [lily, userId, "Tip: bottom-watering keeps the leaves dry and happy."]);
  await db.query("insert into public.likes (post_id, user_id) values ($1, $2)", [lily, userId]);

  const q = (await db.query(
    "insert into public.questions (author_id, species_id, title, body) values ($1, $2, $3, $4) returning id",
    [userId, species["fiddle-leaf-fig"], "Why is my fiddle leaf fig dropping leaves?", "Moved it last week to a brighter room. Lower leaves are browning."]
  )).rows[0].id;
  await db.query("insert into public.answers (question_id, author_id, body) values ($1, $2, $3)", [q, userId, "Moves stress them out. Keep it in one spot, steady light, and water only when the top 5 cm are dry."]);

  console.log(`Demo account ready: ${email}`);
} finally {
  await db.end();
}
