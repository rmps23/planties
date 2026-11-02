// Creates the demo account and a few sample posts, comments and a question.
// Usage (service role key is secret: never commit it, never put it in a VITE_ variable):
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... DEMO_EMAIL=... DEMO_PASSWORD=... node scripts/seed-demo.mjs
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DEMO_EMAIL, DEMO_PASSWORD } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !DEMO_EMAIL || !DEMO_PASSWORD) {
  console.error("Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DEMO_EMAIL and DEMO_PASSWORD.");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const check = ({ data, error }) => {
  if (error) throw error;
  return data;
};

const { data: created, error: createErr } = await sb.auth.admin.createUser({
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
  email_confirm: true,
  user_metadata: { username: "demo_gardener" },
});
let userId = created?.user?.id;
if (createErr) {
  if (!/already/i.test(createErr.message)) throw createErr;
  const { data: list } = await sb.auth.admin.listUsers({ perPage: 1000 });
  userId = list.users.find((u) => u.email === DEMO_EMAIL).id;
}

const species = Object.fromEntries(check(await sb.from("species").select("id, slug")).map((s) => [s.slug, s.id]));

const upload = async (file) => {
  const path = `${userId}/${file}`;
  const body = await readFile(new URL(`../public/assets/plants/${file}`, import.meta.url));
  check(await sb.storage.from("post-images").upload(path, body, { contentType: "image/jpeg", upsert: true }));
  return sb.storage.from("post-images").getPublicUrl(path).data.publicUrl;
};

check(await sb.from("posts").delete().eq("author_id", userId));
const posts = check(
  await sb
    .from("posts")
    .insert([
      { author_id: userId, species_id: species["peace-lily"], body: "My peace lily finally bloomed after a winter by the window. Watering once a week, whenever it droops a little.", image_url: await upload("peace-lily.jpg") },
      { author_id: userId, species_id: species["spider-plant"], body: "Spider plant babies are everywhere. Anyone want cuttings?", image_url: await upload("spider-plant.jpg") },
      { author_id: userId, species_id: species["monstera"], body: "New leaf unfurling on the monstera, first split one this year!" },
    ])
    .select("id")
);
check(await sb.from("comments").insert([{ post_id: posts[0].id, author_id: userId, body: "Tip: bottom-watering keeps the leaves dry and happy." }]));
check(await sb.from("likes").insert([{ post_id: posts[0].id, user_id: userId }]));

const q = check(
  await sb
    .from("questions")
    .insert({ author_id: userId, species_id: species["fiddle-leaf-fig"], title: "Why is my fiddle leaf fig dropping leaves?", body: "Moved it last week to a brighter room. Lower leaves are browning." })
    .select("id")
    .single()
);
check(await sb.from("answers").insert({ question_id: q.id, author_id: userId, body: "Moves stress them out. Keep it in one spot, steady light, and water only when the top 5 cm are dry." }));

console.log(`Demo account ready: ${DEMO_EMAIL}`);
