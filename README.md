# WHYRUS — Containing The Recursive WHY

A dynamic platform for philosophical essays, debates, poetry, and satire. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎨 **Dynamic Content Management**: Articles managed through Supabase
- 📚 **Four Main Sections**: DUVIDHA, DVAND, BIRHA, VYANGYA
- 🏷️ **Category Filtering**: Organize articles by categories (New, Hot, etc.)
- 📄 **Pagination**: Handle unlimited articles with efficient pagination
- 🌓 **Dark/Light Theme**: Seamless theme switching
- 📱 **Responsive Design**: Mobile-first, works on all devices
- ⚡ **Fast & Modern**: Built with Next.js 16 App Router

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- A Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imabhinavxs/Whyrus.git
   cd Whyrus
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   You can find these values in your Supabase project settings under API.

4. **Set up the database**
   
   Run the migration file in your Supabase SQL Editor:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
   - Execute the SQL

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) (or the port shown in the terminal) in your browser.

## Database Schema

The application uses three main tables:

### `sections`
Stores the four main sections (DUVIDHA, DVAND, BIRHA, VYANGYA)

### `categories`
Categories for organizing articles (e.g., "New", "Hot"). Can be section-specific or global.

### `articles`
The main content table with:
- Title, content, excerpt
- Section assignment
- Category assignment
- Publishing status
- View counts
- Tags and cover images

## Project Structure

```
/
├── app/
│   ├── [section]/          # Dynamic section pages
│   │   ├── page.tsx        # Article listing page
│   │   └── [id]/           # Individual article pages
│   ├── page.tsx            # Home page
│   └── layout.tsx          # Root layout
├── components/
│   ├── articles/           # Article-related components
│   ├── sections/           # Section components
│   └── ...
├── lib/
│   ├── supabase/           # Supabase client setup
│   └── types/              # TypeScript types
└── supabase/
    └── migrations/         # Database migrations
```

## Adding Articles

### Quick Guide

**See `SUPABASE_GUIDE.md` for detailed instructions!**

### Quick Steps:
1. Go to Supabase Dashboard → Table Editor → `articles` table
2. Click "Insert row"
3. Fill required fields:
   - `title`: Article title
   - `content`: HTML content (use `<p>`, `<h2>`, etc.)
   - `section`: One of 'duvidha', 'dvand', 'birha', 'vyangya'
   - `published`: Set to `true` ⚠️ (must be true to appear on site)
4. Optional: `excerpt`, `category`, `cover_image`, `tags`
5. Click "Save"

**Example Content:**
```html
<p>This is a paragraph.</p>
<h2>Heading</h2>
<p>More content with <strong>bold</strong> text.</p>
```

**See `SUPABASE_GUIDE.md` for complete guide with examples!**

## Adding Categories

Categories can be added in the `categories` table:

1. Go to Supabase Table Editor
2. Select `categories` table
3. Insert new category with:
   - `name`: Display name (e.g., "New", "Hot")
   - `slug`: URL-friendly slug (e.g., "new", "hot")
   - `section`: Optional - leave null for global categories
   - `active`: Set to `true`
   - `order`: Display order (lower numbers appear first)

## Development

### Build for production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Backend/Database**: Supabase
- **Deployment**: Vercel (recommended)

## License

Private project - All rights reserved.

## Contributing

This is a private project. For issues or suggestions, please contact the maintainers.

