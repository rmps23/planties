# Planties

A social network for plant lovers: share photos of your plants, discover species, and ask the community for help.

**Live demo:** https://planties.vercel.app

**Demo account** (no sign-up needed, use the "Try the demo account" button on the login form):

- Email: `demo@planties.app`
- Password: `Demo-QGX2kxRJ43`

## Features

- Email/password accounts: sign up, log in, log out, password reset by email
- Posts with image upload, optionally tagged with a plant species
- Likes and comments
- User profiles with their posts and an editable bio
- Plant species directory with search and per-species posts
- Q&A: ask questions, answer, and accept the best answer
- Trending plants, responsive layout, keyboard and screen-reader friendly forms

## Stack

React 18 · Vite · Tailwind CSS · React Router · [Neon](https://neon.com) (Postgres, Managed Better Auth, Data API with row level security) · react-toastify

There is no custom server: the browser talks to Neon's Auth and Data API, and row level security in `db/schema.sql` decides who can read or change what. Photos are resized in the browser and stored in the database as small `data:` URLs, so no file storage is needed.

## Running locally

1. Create a free project at [neon.com](https://neon.com) with Postgres and Better Auth, then link it: `neon init` and `neon deploy` (set `dataApi: true` in `neon.ts`). This writes the connection variables to `.env`.
2. Add the public URLs the browser needs to `.env`, copying the values of `NEON_AUTH_BASE_URL` and `NEON_DATA_API_URL` (see `.env.example`):

   `VITE_NEON_AUTH_URL` · `VITE_NEON_DATA_API_URL`

3. Create the tables and the species list, then start the app:

```bash
npm install
npm run db:setup
npm run dev
```

Optional, to create the demo account and sample content (set `VITE_DEMO_EMAIL` and `VITE_DEMO_PASSWORD` in `.env` first; this also shows the demo login button):

```bash
npm run seed:demo
```

## Deploying

- Front-end: import the repo on Vercel and set `VITE_NEON_AUTH_URL`, `VITE_NEON_DATA_API_URL` (and the demo variables) as environment variables.
- Back-end: Neon free tier, nothing else to host. Add the site's URL to the allowed origins of Neon Auth so sign-up and password reset links work on the live site.

## Screenshots

| Landing | Feed |
|---|---|
| ![Landing page](docs/screenshots/landing.png) | ![Feed](docs/screenshots/feed.png) |

| Species directory | Species page |
|---|---|
| ![Species directory](docs/screenshots/plants.png) | ![Peace Lily page](docs/screenshots/plant-detail.png) |
