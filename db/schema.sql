-- Planties schema for Neon (Postgres + Managed Better Auth + Data API).
-- Run it with `npm run db:schema`, or paste it in the Neon SQL editor.

create table public.profiles (
  id uuid primary key references neon_auth."user" on delete cascade,
  username text unique not null check (char_length(username) between 3 and 30),
  bio text default '',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.species (
  id bigint generated always as identity primary key,
  slug text unique not null,
  common_name text not null,
  scientific_name text not null,
  description text not null default '',
  light text,
  water text,
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  image_url text
);

create table public.posts (
  id bigint generated always as identity primary key,
  author_id uuid not null references public.profiles on delete cascade,
  species_id bigint references public.species on delete set null,
  body text not null check (char_length(body) between 1 and 2000),
  image_url text, -- small data: URL (resized in the browser), no file storage needed
  created_at timestamptz not null default now()
);
create index on public.posts (created_at desc);
create index on public.posts (author_id);

create table public.likes (
  post_id bigint references public.posts on delete cascade,
  user_id uuid references public.profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table public.comments (
  id bigint generated always as identity primary key,
  post_id bigint not null references public.posts on delete cascade,
  author_id uuid not null references public.profiles on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now()
);
create index on public.comments (post_id);

create table public.questions (
  id bigint generated always as identity primary key,
  author_id uuid not null references public.profiles on delete cascade,
  species_id bigint references public.species on delete set null,
  title text not null check (char_length(title) between 5 and 150),
  body text not null default '',
  accepted_answer_id bigint,
  created_at timestamptz not null default now()
);

create table public.answers (
  id bigint generated always as identity primary key,
  question_id bigint not null references public.questions on delete cascade,
  author_id uuid not null references public.profiles on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index on public.answers (question_id);

alter table public.questions
  add constraint questions_accepted_answer_fk
  foreign key (accepted_answer_id) references public.answers on delete set null;

-- Create a profile whenever a user signs up (the sign-up form sends the username as the Better Auth name).
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(nullif(new.name, ''), 'user_' || substr(new.id::text, 1, 8)));
  return new;
end $$;

create trigger on_auth_user_created
  after insert on neon_auth."user"
  for each row execute function public.handle_new_user();

-- Row level security: everyone reads, owners write.
alter table public.profiles  enable row level security;
alter table public.species   enable row level security;
alter table public.posts     enable row level security;
alter table public.likes     enable row level security;
alter table public.comments  enable row level security;
alter table public.questions enable row level security;
alter table public.answers   enable row level security;

create policy "read all" on public.profiles for select to authenticated using (true);
create policy "read all" on public.species for select to authenticated using (true);
create policy "read all" on public.posts for select to authenticated using (true);
create policy "read all" on public.likes for select to authenticated using (true);
create policy "read all" on public.comments for select to authenticated using (true);
create policy "read all" on public.questions for select to authenticated using (true);
create policy "read all" on public.answers for select to authenticated using (true);

create policy "update own" on public.profiles for update to authenticated using (auth.uid() = id);

create policy "insert own" on public.posts for insert to authenticated with check (auth.uid() = author_id);
create policy "update own" on public.posts for update to authenticated using (auth.uid() = author_id);
create policy "delete own" on public.posts for delete to authenticated using (auth.uid() = author_id);

create policy "insert own" on public.likes for insert to authenticated with check (auth.uid() = user_id);
create policy "delete own" on public.likes for delete to authenticated using (auth.uid() = user_id);

create policy "insert own" on public.comments for insert to authenticated with check (auth.uid() = author_id);
create policy "delete own" on public.comments for delete to authenticated using (auth.uid() = author_id);

create policy "insert own" on public.questions for insert to authenticated with check (auth.uid() = author_id);
create policy "update own" on public.questions for update to authenticated using (auth.uid() = author_id);
create policy "delete own" on public.questions for delete to authenticated using (auth.uid() = author_id);

create policy "insert own" on public.answers for insert to authenticated with check (auth.uid() = author_id);
create policy "delete own" on public.answers for delete to authenticated using (auth.uid() = author_id);

-- The Data API has no permission layer of its own: grants + RLS decide everything.
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;
