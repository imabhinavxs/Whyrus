-- Add homepage_featured field to articles table
-- This allows selecting up to 6 articles per section to display on homepage

ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS homepage_featured BOOLEAN DEFAULT false;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_homepage_featured ON articles(homepage_featured);

-- Add comment
COMMENT ON COLUMN articles.homepage_featured IS 'Set to true to display this article on the homepage section. Max 6 per section.';

