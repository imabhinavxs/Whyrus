# Troubleshooting: Article Not Showing on Page

## Common Issues

### ✅ Issue 1: `published` field is NOT set to `true`
**This is the MOST COMMON issue!**

**Solution:**
1. In Supabase Table Editor, click on your article row
2. Find the `published` column
3. Make sure it's set to `true` (not `false` or `null`)
4. Click "Save"

**⚠️ IMPORTANT:** If `published = false`, the article will NOT appear on the website, even if all other fields are filled!

---

### ✅ Issue 2: Missing Required Fields

Your article MUST have these fields filled:
- ✅ `title` - Article title (text)
- ✅ `content` - Article content (text/HTML)
- ✅ `section` - Must be: `duvidha`, `dvand`, `birha`, or `vyangya`
- ✅ `published` - Must be `true`

**Solution:**
1. Click on your article in the table
2. Make sure all required fields have values
3. Save the row

---

### ✅ Issue 3: Wrong Section Name

Make sure the `section` field exactly matches one of:
- `duvidha` (lowercase)
- `dvand` (lowercase)
- `birha` (lowercase)
- `vyangya` (lowercase)

**Solution:**
- Check the section spelling and case
- Make sure you're visiting the correct URL:
  - For `duvidha` section → visit `/duvidha`
  - For `dvand` section → visit `/dvand`
  - etc.

---

### ✅ Issue 4: Database Connection Issue

Check if Supabase connection is working:

1. Check `.env.local` file exists and has correct values
2. Restart your dev server after changing `.env.local`
3. Check browser console for errors (F12 → Console tab)

---

## Quick Checklist

Before asking why an article doesn't show, verify:

- [ ] `published` field = `true` (NOT false or null)
- [ ] `title` field has text
- [ ] `content` field has text/HTML
- [ ] `section` field is exactly: `duvidha`, `dvand`, `birha`, or `vyangya`
- [ ] You're visiting the correct URL (e.g., `/duvidha` for duvidha section)
- [ ] Dev server is running and restarted after env changes
- [ ] No errors in browser console

---

## How to Debug

1. **Check the article in Supabase:**
   - Go to Table Editor → `articles` table
   - Click on your article row
   - Verify all fields

2. **Check browser console:**
   - Press F12
   - Go to Console tab
   - Look for any errors

3. **Check network requests:**
   - Press F12 → Network tab
   - Refresh the page
   - Look for API requests to Supabase
   - Check if they're successful (status 200)

4. **Test the query:**
   - You can test the Supabase query directly in SQL Editor:
   ```sql
   SELECT * FROM articles 
   WHERE section = 'duvidha' 
   AND published = true;
   ```
   - This should return your article if it's set up correctly

---

## Still Not Working?

If you've checked everything above and it's still not working:

1. Share a screenshot of your article row in Supabase
2. Check browser console for errors
3. Verify the URL you're visiting matches the section name

