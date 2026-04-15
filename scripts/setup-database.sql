-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create categories table (optional, for predefined categories)
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  icon text default '📝',
  color text default '#3b82f6',
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create transactions table
create table if not exists transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  amount numeric(12, 2) not null,
  type text not null check (type in ('income', 'expense')),
  category text not null default 'Other',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create index for faster queries
create index if not exists transactions_user_id_idx on transactions(user_id);
create index if not exists transactions_created_at_idx on transactions(created_at);
create index if not exists transactions_type_idx on transactions(type);

-- Enable Row Level Security
alter table transactions enable row level security;
alter table categories enable row level security;

-- Create RLS policies for transactions
create policy "Users can view their own transactions" on transactions
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions" on transactions
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions" on transactions
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own transactions" on transactions
  for delete
  using (auth.uid() = user_id);

-- Create RLS policies for categories
create policy "Users can view all default categories and their own" on categories
  for select
  using (user_id is null or auth.uid() = user_id);

create policy "Users can insert their own categories" on categories
  for insert
  with check (auth.uid() = user_id);

-- Insert default categories
insert into categories (name, icon, color, user_id) values
  ('Food', '🍔', '#f59e0b', null),
  ('Transportation', '🚗', '#ef4444', null),
  ('Entertainment', '🎬', '#8b5cf6', null),
  ('Shopping', '🛍️', '#ec4899', null),
  ('Bills & Utilities', '💡', '#06b6d4', null),
  ('Health', '🏥', '#10b981', null),
  ('Salary', '💰', '#059669', null),
  ('Freelance', '💻', '#3b82f6', null),
  ('Investment', '📈', '#f97316', null)
on conflict do nothing;
