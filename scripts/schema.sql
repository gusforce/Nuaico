-- Nuaico Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

CREATE TABLE IF NOT EXISTS articles (
  id            SERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  excerpt       TEXT NOT NULL,
  content       TEXT DEFAULT '',
  image_url     TEXT,
  category      TEXT,
  author        TEXT DEFAULT 'Nuaico AI',
  date          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sector        TEXT NOT NULL CHECK (sector IN ('Finance', 'Healthcare', 'Technology', 'Energy', 'Industry')),
  source_domain TEXT,
  source_url    TEXT UNIQUE,
  read_time     TEXT,
  impact_score  INTEGER CHECK (impact_score >= 0 AND impact_score <= 100),
  tags          TEXT[],
  featured      BOOLEAN DEFAULT FALSE,
  ai_summary    TEXT[],
  ai_opinion    JSONB,
  why_picked    TEXT,
  confidence    TEXT CHECK (confidence IN ('Low', 'Medium', 'High')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_sector ON articles(sector);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_impact ON articles(impact_score DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  active        BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security (optional, recommended for production)
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to articles (if using RLS)
-- CREATE POLICY "Allow public read" ON articles FOR SELECT USING (true);
