-- Planties schema. Run in the Supabase SQL editor (or `supabase db push`).

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
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
  image_url text,
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

-- Create a profile whenever a user signs up (username comes from signup metadata).
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'username', ''), 'user_' || substr(new.id::text, 1, 8))
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row level security: everyone reads, owners write.
alter table public.profiles  enable row level security;
alter table public.species   enable row level security;
alter table public.posts     enable row level security;
alter table public.likes     enable row level security;
alter table public.comments  enable row level security;
alter table public.questions enable row level security;
alter table public.answers   enable row level security;

create policy "read all" on public.profiles  for select using (true);
create policy "read all" on public.species   for select using (true);
create policy "read all" on public.posts     for select using (true);
create policy "read all" on public.likes     for select using (true);
create policy "read all" on public.comments  for select using (true);
create policy "read all" on public.questions for select using (true);
create policy "read all" on public.answers   for select using (true);

create policy "update own" on public.profiles for update using (auth.uid() = id);

create policy "insert own" on public.posts for insert with check (auth.uid() = author_id);
create policy "update own" on public.posts for update using (auth.uid() = author_id);
create policy "delete own" on public.posts for delete using (auth.uid() = author_id);

create policy "insert own" on public.likes for insert with check (auth.uid() = user_id);
create policy "delete own" on public.likes for delete using (auth.uid() = user_id);

create policy "insert own" on public.comments for insert with check (auth.uid() = author_id);
create policy "delete own" on public.comments for delete using (auth.uid() = author_id);

create policy "insert own" on public.questions for insert with check (auth.uid() = author_id);
create policy "update own" on public.questions for update using (auth.uid() = author_id);
create policy "delete own" on public.questions for delete using (auth.uid() = author_id);

create policy "insert own" on public.answers for insert with check (auth.uid() = author_id);
create policy "delete own" on public.answers for delete using (auth.uid() = author_id);

-- Image storage: public bucket, users upload only into their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-images', 'post-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "images public read" on storage.objects for select
  using (bucket_id = 'post-images');
create policy "images upload own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'post-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "images delete own" on storage.objects for delete to authenticated
  using (bucket_id = 'post-images' and (storage.foldername(name))[1] = auth.uid()::text);
