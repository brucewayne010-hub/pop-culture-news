-- Migration script to add RSS feed support to existing database
-- Run this in Supabase SQL Editor if you already have the articles table

-- Add new columns for RSS feed integration
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS source_name TEXT,
ADD COLUMN IF NOT EXISTS source_url TEXT,
ADD COLUMN IF NOT EXISTS is_auto_imported BOOLEAN DEFAULT false;

-- Create index for duplicate checking
CREATE INDEX IF NOT EXISTS idx_articles_source_url ON articles(source_url);

-- Verify the changes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'articles'
ORDER BY ordinal_position;
