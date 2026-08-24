create table if not exists public.leads (
  id text primary key,
  kind text not null check (kind in ('contact', 'project_brief')),
  name text not null,
  business text not null,
  whatsapp text not null,
  email text not null,
  need text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  source text not null default 'website',
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
