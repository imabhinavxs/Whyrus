-- Create a storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article_images', 'article_images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS) for storage
-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated uploads" ON storage.objects 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'article_images');

-- Allow public read access to images
CREATE POLICY "Allow public read access" ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'article_images');

-- Allow authenticated users to update their own images (optional, if users can replace images)
CREATE POLICY "Allow authenticated updates" ON storage.objects 
  FOR UPDATE 
  TO authenticated 
  USING (bucket_id = 'article_images');

-- Allow authenticated users to delete their own images (optional, if users can delete images)
CREATE POLICY "Allow authenticated deletes" ON storage.objects 
  FOR DELETE 
  TO authenticated 
  USING (bucket_id = 'article_images');

