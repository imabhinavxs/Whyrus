# Fix RLS Policy Error

## Problem
When trying to create a new article, you're getting:
```
new row violates row-level security policy for table "articles"
```

This is because the Row-Level Security (RLS) policies don't allow authenticated users to INSERT/UPDATE/DELETE articles.

## Solution

Run the migration SQL in your Supabase dashboard:

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/jvzpqmebgkuhzpdllvzf
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New query"**

### Step 2: Run the Migration SQL

Copy and paste this SQL:

```sql
-- Update RLS policies to allow authenticated users to manage articles

-- Drop existing policies
DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON articles;
DROP POLICY IF EXISTS "Sections are viewable by everyone" ON sections;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;

-- Public read access for published articles
CREATE POLICY "Published articles are viewable by everyone" ON articles
  FOR SELECT
  USING (published = true);

-- Authenticated users can insert articles (for admin)
CREATE POLICY "Authenticated users can create articles" ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update articles (for admin)
CREATE POLICY "Authenticated users can update articles" ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete articles (for admin)
CREATE POLICY "Authenticated users can delete articles" ON articles
  FOR DELETE
  TO authenticated
  USING (true);

-- Public read access for sections
CREATE POLICY "Sections are viewable by everyone" ON sections
  FOR SELECT
  USING (active = true);

-- Public read access for categories
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT
  USING (active = true);
```

### Step 3: Execute
Click **"Run"** (or press Ctrl/Cmd + Enter)

### Step 4: Verify
After running the SQL, try creating an article again. It should work now!

## What This Does

- **Allows authenticated users** (admin) to:
  - ✅ Create articles (INSERT)
  - ✅ Update articles (UPDATE)
  - ✅ Delete articles (DELETE)

- **Keeps public read access** for:
  - ✅ Published articles (anyone can view)
  - ✅ Active sections (anyone can view)
  - ✅ Active categories (anyone can view)

## Alternative: Quick Fix via Supabase Dashboard

If you prefer using the dashboard UI:

1. Go to **Table Editor** → **articles** table
2. Click on **"Policies"** tab
3. Click **"New Policy"**
4. Create policies for:
   - **INSERT**: Allow authenticated users
   - **UPDATE**: Allow authenticated users  
   - **DELETE**: Allow authenticated users

But using the SQL above is faster and ensures all policies are set correctly.

