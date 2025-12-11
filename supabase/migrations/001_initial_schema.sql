-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL CHECK (slug IN ('duvidha', 'dvand', 'birha', 'vyangya')),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  section TEXT CHECK (section IN ('duvidha', 'dvand', 'birha', 'vyangya')),
  description TEXT,
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slug, section)
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  section TEXT NOT NULL CHECK (section IN ('duvidha', 'dvand', 'birha', 'vyangya')),
  category TEXT,
  author_id UUID,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  tags TEXT[],
  cover_image TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_section ON articles(section);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_section ON categories(section);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(active);

-- Insert default sections
INSERT INTO sections (slug, name, description, "order") VALUES
  ('duvidha', 'DUVIDHA', 'Essays of existential doubt, UPSC angst, ambiguity, and philosophical wandering', 1),
  ('dvand', 'DVAND', 'The arena of debates, contradictions, arguments, and dialectical clashes', 2),
  ('birha', 'BIRHA', 'The river of poetry, longing, nostalgia, drifting, and incomplete emotions', 3),
  ('vyangya', 'VYANGYA', 'The hall of satire, cultural criticism, village absurdism, and political irreverence', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert default categories (example: New, Hot)
INSERT INTO categories (name, slug, section, "order") VALUES
  ('New', 'new', NULL, 1),
  ('Hot', 'hot', NULL, 2)
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for articles
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Sections are viewable by everyone" ON sections
  FOR SELECT USING (active = true);

CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (active = true);

CREATE POLICY "Published articles are viewable by everyone" ON articles
  FOR SELECT USING (published = true);

