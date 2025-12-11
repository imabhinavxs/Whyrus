# Vercel Deployment Guide - Environment Variables

## Problem
Your site is deployed on Vercel but Supabase environment variables are not configured, causing server errors.

## Solution: Add Environment Variables to Vercel

### Step 1: Get Your Environment Variables

From your `.env.local` file, you need these two variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Your values should be:
```
NEXT_PUBLIC_SUPABASE_URL=https://jvzpqmebgkuhzpdllvzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2enBxbWViZ2t1aHpwZGxsdnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTE4MjYsImV4cCI6MjA4MDg2NzgyNn0.Yqi9BNqpgte-sQz2DeiTu4S3nsjHqYb4ZpHhoDi6nOg
```

### Step 2: Add to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project (whyrus.in)
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

   **Variable 1:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://jvzpqmebgkuhzpdllvzf.supabase.co`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

   **Variable 2:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2enBxbWViZ2t1aHpwZGxsdnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTE4MjYsImV4cCI6MjA4MDg2NzgyNn0.Yqi9BNqpgte-sQz2DeiTu4S3nsjHqYb4ZpHhoDi6nOg`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

**Option B: Via Vercel CLI**

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
# Paste: https://jvzpqmebgkuhzpdllvzf.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2enBxbWViZ2t1aHpwZGxsdnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTE4MjYsImV4cCI6MjA4MDg2NzgyNn0.Yqi9BNqpgte-sQz2DeiTu4S3nsjHqYb4ZpHhoDi6nOg
```

### Step 3: Redeploy

After adding the environment variables, you need to trigger a new deployment:

1. **Option A:** Go to **Deployments** tab → Click **"..."** on the latest deployment → **Redeploy**
2. **Option B:** Push a new commit to trigger automatic deployment
3. **Option C:** Use Vercel CLI: `vercel --prod`

### Step 4: Verify

After redeployment, your site should work correctly:
- ✅ Homepage loads
- ✅ Articles display from Supabase
- ✅ Admin login works at `/login`
- ✅ All dynamic features work

## Important Notes

1. **Environment Variables are Case-Sensitive:** Make sure the names match exactly:
   - `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_KEY`)

2. **Apply to All Environments:** Make sure to select Production, Preview, and Development when adding variables

3. **Redeploy Required:** Environment variable changes require a new deployment to take effect

4. **These are Public Keys:** The `NEXT_PUBLIC_*` prefix means these values are exposed to the browser. This is safe for Supabase anon keys as they're designed for client-side use with RLS policies.

## Troubleshooting

### Still seeing errors after adding variables?
- Wait a few minutes for deployment to complete
- Clear browser cache
- Check Vercel deployment logs for specific errors
- Verify variables are set correctly in Vercel dashboard

### Check if variables are loaded:
Add this temporarily to check (remove after debugging):
```typescript
// In any component
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

