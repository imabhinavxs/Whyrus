# How to Login to Admin Panel

## Step 1: Create Admin User in Supabase

Before you can login, you need to create an admin user in Supabase:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/jvzpqmebgkuhzpdllvzf
   - Log in to your Supabase account

2. **Navigate to Authentication**
   - Click on **"Authentication"** in the left sidebar
   - Click on **"Users"** tab

3. **Add New User**
   - Click the **"Add user"** button (or "Create new user")
   - Choose **"Create new user"** option
   - Fill in:
     - **Email**: Your admin email (e.g., `admin@whyrus.com`)
     - **Password**: Choose a secure password
     - (Optional) Click **"Auto-generate password"** if you want Supabase to generate one
   - Click **"Create user"**

4. **Save Your Credentials**
   - Copy and save your email and password securely
   - You'll need these to login to the admin panel

## Step 2: Login to Admin Panel

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to the login page**:
   - Open your browser
   - Go to: `http://localhost:3002/login`

3. **Enter your credentials**:
   - **Email**: The email you created in Supabase
   - **Password**: The password you set in Supabase

4. **Click "Sign In"**

5. **Success!**
   - After successful login, you'll be redirected to `/admin` (the dashboard)
   - You can now manage articles, categories, and content

## Troubleshooting

### "Invalid login credentials"
- Double-check your email and password
- Make sure the user exists in Supabase Authentication → Users
- Try resetting the password in Supabase Dashboard

### "This page isn't working" or redirect loop
- Make sure you're accessing `/login` (not `/admin/login`)
- Clear your browser cache and cookies
- Restart your development server

### Can't see the login page
- Make sure the server is running: `npm run dev`
- Check the URL: Should be `http://localhost:3002/login`
- Check browser console for any errors

## What You Can Do After Login

Once logged in, you'll have access to:
- **Dashboard**: View statistics and recent articles
- **Articles**: Create, edit, delete articles
- **Categories**: View and manage categories
- All admin features for content management

## Notes

- Only users created in Supabase Authentication can login
- The admin panel is protected - you must be authenticated
- If you log out, you'll need to login again to access `/admin` routes

