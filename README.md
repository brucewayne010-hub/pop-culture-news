# Pop Culture News Website

A modern, automated pop culture news aggregation website with RSS feed integration. Built with Next.js 14, Tailwind CSS, and Supabase.

## 🎯 Features

- 🎬 **Multi-Category News**: Hollywood, Bollywood, Web Series, Music, and Reviews
- 🤖 **Automated RSS Feeds**: Fetches news every 30 minutes from 15+ legal sources
- 📝 **Manual Content Management**: Full-featured admin panel
- 🔍 **Advanced Search**: Find articles across all categories
- 🌓 **Dark/Light Mode**: Beautiful theme switching
- 📱 **Fully Responsive**: Works on all devices
- ⚡ **Optimized Performance**: Fast loading and smooth animations
- 🔒 **Secure**: JWT authentication and Row Level Security

## 🎵 News Sources

All sources are legal, free, publicly available RSS feeds with proper attribution:

### Hollywood
- Variety, The Hollywood Reporter, Deadline, IndieWire

### Bollywood
- Bollywood Hungama, FilmiBeat, Times of India Entertainment

### Music
- Billboard, NME, Pitchfork, Rolling Stone

### Web Series
- Variety Streaming, What's on Netflix

### Reviews
- Rotten Tomatoes, IGN Movies

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- Supabase account (free)

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In SQL Editor, run the schema from `database/schema.sql`
3. Get your API credentials from Settings → API

### Step 2: Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   cd e:\movie-news-website
   git init
   git add .
   git commit -m "Initial commit - Pop culture news website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `JWT_SECRET` (generate with: `openssl rand -base64 32`)
   - Click "Deploy"

3. **Verify Cron Job**:
   - After deployment, go to Vercel Dashboard → Cron Jobs
   - Verify `/api/cron/fetch-news` is scheduled for every 30 minutes
   - Manually trigger it once to test

### Step 3: Create Admin User

Run this in Supabase SQL Editor (generate hash at [bcrypt-generator.com](https://bcrypt-generator.com)):

```sql
INSERT INTO admins (email, password_hash)
VALUES ('your-email@example.com', '$2a$10$YOUR_BCRYPT_HASH');
```

## 📖 Usage

- **Public Site**: `https://your-project.vercel.app`
- **Admin Panel**: `https://your-project.vercel.app/admin/login`
- **News Auto-Updates**: Every 30 minutes via Vercel Cron

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT
- **Hosting**: Vercel
- **Automation**: Vercel Cron Jobs

## 📝 Manual Content Management

You can still manually create articles via the admin panel. Auto-imported articles are marked with source attribution.

## 🔐 Legal & Attribution

All news content is fetched from publicly available RSS feeds. Each article includes:
- Source name
- Link to original article
- Proper attribution

This follows RSS best practices and fair use principles.

## 📄 License

MIT
