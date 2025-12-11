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

