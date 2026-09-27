-- F2A Cars — Supabase schema draft.
-- Mirrors the TypeScript types in src/data/*.ts and src/lib/submissions.ts
-- (columns are snake_case; map camelCase keys when inserting).
-- Review before running: this is a starting point, not a migration history.

create type vehicle_status as enum ('available', 'reserved', 'sold');

-- ─── Inventory ────────────────────────────────────────────────────────────────
create table vehicles (
  id                  text primary key,            -- URL slug: /cars/:id
  status              vehicle_status not null default 'available',
  year                int not null,
  make                text not null,
  model               text not null,
  variant             text,
  price               numeric(12, 0) not null,     -- PHP
  mileage             int,                         -- km
  transmission        text,
  fuel_type           text,
  body_type           text,
  engine              text,
  drive_type          text,
  color               text,
  description         text not null default '',
  features            text[] not null default '{}',
  financing_available boolean not null default true,
  trade_in_available  boolean not null default true,
  listed_at           date not null default current_date,
  created_at          timestamptz not null default now()
);

create table vehicle_images (
  id         uuid primary key default gen_random_uuid(),
  vehicle_id text not null references vehicles (id) on delete cascade,
  src        text not null,                        -- e.g. Supabase Storage public URL
  alt        text not null,
  position   text,                                 -- CSS object-position
  sort_order int not null default 0
);
create index on vehicle_images (vehicle_id, sort_order);

-- ─── Content ──────────────────────────────────────────────────────────────────
create table vlogs (
  id          text primary key,
  episode     int,
  title       text not null,
  date        date,
  duration    text,
  description text not null default '',
  category    text not null check (category in ('Vlogs', 'Car Reviews', 'New Arrivals', 'Customer Releases', 'Special Features')),
  thumbnail   text not null,
  video_url   text,                                -- YouTube or Facebook URL
  published   boolean not null default true
);

create table testimonials (
  id        uuid primary key default gen_random_uuid(),
  quote     text not null,
  name      text not null,
  vehicle   text,
  source    text,                                  -- e.g. 'Facebook review'
  published boolean not null default false         -- publish only with the customer's permission
);

create table customer_stories (
  id        uuid primary key default gen_random_uuid(),
  customer  text not null,
  vehicle   text not null,
  photo     text not null,
  story     text not null,
  date      date,
  published boolean not null default false
);

-- ─── Leads (written by the website forms, read only by F2A staff) ─────────────
create table inquiries (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  intent            text not null default 'inquiry' check (intent in ('inquiry', 'viewing')),
  vehicle_id        text references vehicles (id) on delete set null,
  vehicle           text,
  name              text not null,
  phone             text not null,
  email             text,
  preferred_contact text,
  message           text,
  preferred_date    date,
  preferred_time    text
);

create table sell_requests (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  make              text not null,
  model             text not null,
  year              int not null,
  variant           text,
  mileage           int,
  transmission      text,
  fuel_type         text,
  condition         text,
  accident_history  text,
  flood_history     text,
  service_history   text,
  photos            text[] not null default '{}',  -- Storage paths
  name              text not null,
  phone             text not null,
  email             text,
  preferred_contact text
);

create table trade_requests (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  current_year      int not null,
  current_make      text not null,
  current_model     text not null,
  current_mileage   int,
  current_condition text,
  desired_vehicle   text,
  budget            text,
  name              text not null,
  phone             text not null,
  email             text,
  preferred_contact text
);

create table consignment_requests (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  year              int not null,
  make              text not null,
  model             text not null,
  mileage           int,
  asking_price      numeric(12, 0),
  message           text,
  name              text not null,
  phone             text not null,
  email             text,
  preferred_contact text
);

create table financing_requests (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  vehicle           text,
  down_payment      numeric(12, 0),
  preferred_term    text,
  name              text not null,
  phone             text not null,
  email             text,
  preferred_contact text
);

create table contact_messages (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  interest          text not null,
  message           text,
  name              text not null,
  phone             text not null,
  email             text,
  preferred_contact text
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Public (anon key): read published content, insert leads. Never read leads.
alter table vehicles enable row level security;
alter table vehicle_images enable row level security;
alter table vlogs enable row level security;
alter table testimonials enable row level security;
alter table customer_stories enable row level security;
alter table inquiries enable row level security;
alter table sell_requests enable row level security;
alter table trade_requests enable row level security;
alter table consignment_requests enable row level security;
alter table financing_requests enable row level security;
alter table contact_messages enable row level security;

create policy "public read" on vehicles for select using (true);
create policy "public read" on vehicle_images for select using (true);
create policy "public read" on vlogs for select using (published);
create policy "public read" on testimonials for select using (published);
create policy "public read" on customer_stories for select using (published);

create policy "public insert" on inquiries for insert to anon with check (true);
create policy "public insert" on sell_requests for insert to anon with check (true);
create policy "public insert" on trade_requests for insert to anon with check (true);
create policy "public insert" on consignment_requests for insert to anon with check (true);
create policy "public insert" on financing_requests for insert to anon with check (true);
create policy "public insert" on contact_messages for insert to anon with check (true);
-- Staff access (select/update/delete) goes through authenticated users or the service role
-- from a future /admin — add those policies when auth is set up.
