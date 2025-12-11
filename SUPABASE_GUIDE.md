# How to Post Articles to WHYRUS

## Method 1: Using Supabase Dashboard (Easiest)

### Step 1: Access Supabase Dashboard
1. Go to https://supabase.com/dashboard/project/jvzpqmebgkuhzpdlvzf
2. Log in to your account
3. Navigate to **Table Editor** in the left sidebar

### Step 2: Add an Article
1. Click on the **`articles`** table
2. Click the **"Insert"** button (or the ➕ icon)
3. Click **"Insert row"**

### Step 3: Fill in Article Details

#### Required Fields:
- **`title`** (text): Your article title
  - Example: `"The Weight of Maybe"`
  
- **`content`** (text): Full HTML content of your article
  - Example: 
    ```html
    <p>This is the first paragraph of your article.</p>
    <p>This is the second paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
    <h2>Section Heading</h2>
    <p>More content here...</p>
    ```

- **`section`** (text): Must be one of:
  - `duvidha` - for DUVIDHA section
  - `dvand` - for DVAND section
  - `birha` - for BIRHA section
  - `vyangya` - for VYANGYA section

- **`published`** (boolean): Set to `true` to make it visible on the website
  - ⚠️ **Important**: If set to `false`, the article won't appear on the site

#### Optional Fields:
- **`excerpt`** (text): Short description/summary
  - Example: `"On decisions unmade and the burden of choice"`
  
- **`category`** (text): Category slug (must match a category slug from categories table)
  - Example: `"new"` or `"hot"` (if you created these categories)
  
- **`cover_image`** (text): URL to cover image
  - Example: `"https://raw.githubusercontent.com/imabhinavxs/images/main/article-image.jpg"`
  
- **`tags`** (array): Array of tag strings
  - Example: `["philosophy", "doubt", "uncertainty"]`
  - Format: Click the array field and add items

- **`published_at`** (timestamp): Publication date
  - Leave empty for current time, or set a specific date/time

- **`featured`** (boolean): Set to `true` to feature the article

- **`author_id`** (uuid): Leave null for now (can add user auth later)

### Step 4: Save the Article
- Click **"Save"** or press Enter
- The article should now appear on your website!

## Method 2: Using SQL (For Bulk Insert)

You can also insert articles directly using SQL in the SQL Editor:

```sql
INSERT INTO articles (
  title,
  content,
  excerpt,
  section,
  category,
  published,
  tags,
  cover_image,
  published_at
) VALUES (
  'Article Title',
  '<p>Your HTML content here</p>',
  'Short description',
  'duvidha',
  'new',
  true,
  ARRAY['tag1', 'tag2'],
  'https://example.com/image.jpg',
  NOW()
);
```

## Adding Categories

To create new categories (like "New", "Hot", "Trending", etc.):

1. Go to **Table Editor** → **`categories`** table
2. Click **"Insert row"**
3. Fill in:
   - **`name`**: Display name (e.g., "New", "Hot", "Trending")
   - **`slug`**: URL-friendly version (e.g., "new", "hot", "trending")
   - **`section`**: Leave `null` for global categories, or set to specific section
   - **`active`**: Set to `true`
   - **`order`**: Number for sorting (lower = appears first)
4. Click **"Save"**

## Tips

1. **HTML Content**: Use proper HTML tags for formatting:
   - `<p>` for paragraphs
   - `<h1>`, `<h2>`, `<h3>` for headings
   - `<strong>` or `<b>` for bold
   - `<em>` or `<i>` for italic
   - `<ul>`, `<ol>`, `<li>` for lists
   - `<a href="...">` for links

2. **Preview**: After saving, visit your section page to see the article
   - Example: `http://localhost:3002/duvidha`

3. **Editing**: Click on any row in the Table Editor to edit existing articles

4. **Deleting**: Click the trash icon to delete articles (be careful!)

5. **Unpublishing**: Set `published = false` to hide an article without deleting it

## Example Article

Here's a complete example:

```json
{
  "title": "The Weight of Maybe",
  "content": "<p>In the space between yes and no, there exists a weight. It is not the weight of certainty, but of possibility.</p><p>Every decision unmade carries with it the burden of all potential outcomes. We stand at crossroads, not knowing which path leads where.</p><h2>The Paradox of Choice</h2><p>More options, more weight. More uncertainty, more freedom.</p>",
  "excerpt": "On decisions unmade and the burden of choice",
  "section": "duvidha",
  "category": "new",
  "published": true,
  "tags": ["philosophy", "doubt", "decision"],
  "published_at": "2025-01-09T10:00:00Z"
}
```

## Next Steps (Future Enhancements)

- **Admin Panel**: We can create a custom admin interface for easier article management
- **Rich Text Editor**: Add a WYSIWYG editor for content creation
- **Image Upload**: Integrate image upload functionality
- **User Authentication**: Add author authentication and user roles
- **Draft System**: Enhanced draft/publish workflow

