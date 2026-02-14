# 100% Cloud Deployment Guide - No Local Storage

This guide will help you deploy the movie news website entirely in the cloud with **ZERO data on your PC**.

## 🌐 Architecture

- **Code Hosting**: GitHub (free)
- **Website Hosting**: Vercel (free tier)
- **Database**: Supabase (free tier)
- **Image Storage**: Supabase Storage (free tier)
- **Admin Panel**: Web-based (accessible from anywhere)

## 📋 Step-by-Step Cloud Deployment

### Step 1: Set Up Supabase (Database + Storage)

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** → Sign up with GitHub
3. Click **"New Project"**
   - Organization: Create new or select existing
   - Name: `movie-news-db`
   - Database Password: Generate strong password (save it)
   - Region: Choose closest to you
   - Click **"Create new project"**

4. **Run Database Schema**:
   - Go to **SQL Editor** (left sidebar)
   - Click **"New query"**
   - Copy and paste this SQL:

```sql
-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Public can read articles
CREATE POLICY "Articles are viewable by everyone" 
  ON articles FOR SELECT 
  USING (true);

-- Only authenticated users can modify
CREATE POLICY "Articles are insertable by authenticated users only" 
  ON articles FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Articles are updatable by authenticated users only" 
  ON articles FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Articles are deletable by authenticated users only" 
  ON articles FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Admins policies
CREATE POLICY "Admins are viewable by authenticated users only" 
  ON admins FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for auto-update
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

   - Click **"Run"**

5. **Create Admin User**:
   - In SQL Editor, run this (replace with your email and password):

```sql
-- First, generate a bcrypt hash for your password
-- You can use: https://bcrypt-generator.com/ (use 10 rounds)
-- Or use the admin panel after deployment to create your first admin

INSERT INTO admins (email, password_hash)
VALUES (
  'your-email@example.com',
  '$2a$10$YourBcryptHashHere'
);
```

6. **Get API Credentials**:
   - Go to **Settings** → **API**
   - Copy these values:
     - Project URL
     - `anon` `public` key
     - `service_role` `secret` key

7. **Set Up Image Storage** (Optional but recommended):
   - Go to **Storage** (left sidebar)
   - Click **"Create a new bucket"**
   - Name: `article-images`
   - Public bucket: **Yes**
   - Click **"Create bucket"**

### Step 2: Deploy to Vercel

1. **Push Code to GitHub**:
   - Go to [github.com](https://github.com)
   - Click **"New repository"**
   - Name: `movie-news-website`
   - Visibility: Private (recommended)
   - Click **"Create repository"**

2. **Upload Code** (via GitHub web interface):
   - Click **"uploading an existing file"**
   - Drag and drop all files from `E:\repit\movie-news-website`
   - Commit changes

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click **"Sign Up"** → Continue with GitHub
   - Click **"Add New"** → **"Project"**
   - Import your `movie-news-website` repository
   - Click **"Import"**

4. **Configure Environment Variables**:
   - Before deploying, add these environment variables:

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
   | `JWT_SECRET` | Generate random string (e.g., `openssl rand -base64 32`) |
   | `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (add after first deploy) |

5. **Deploy**:
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Your site will be live at `https://your-project.vercel.app`

6. **Update Site URL**:
   - Copy your Vercel URL
   - Go to **Settings** → **Environment Variables**
   - Update `NEXT_PUBLIC_SITE_URL` with your Vercel URL
   - Redeploy

### Step 3: Access Your Website

1. **Public Website**: `https://your-project.vercel.app`
2. **Admin Panel**: `https://your-project.vercel.app/admin/login`
3. **Create Articles**: Login → Dashboard → New Article

### Step 4: Custom Domain (Optional)

1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `movienews.com`)
3. Update DNS records as instructed
4. SSL certificate is automatic

## 🔐 Password Hash Generator

Since you need to create your first admin user, use this online tool:
- Go to: https://bcrypt-generator.com/
- Enter your password
- Rounds: 10
- Copy the hash
- Use it in the SQL INSERT statement above

## 🎯 Managing Content (100% Cloud)

### Adding Articles
1. Go to `https://your-site.vercel.app/admin/login`
2. Login with your admin credentials
3. Click **"New Article"**
4. Fill in details
5. For images: Use free image hosting like:
   - Supabase Storage (upload via dashboard)
   - Cloudinary (free tier)
   - ImgBB (free)
   - Or any image URL from the web

### Editing Articles
1. Go to Admin Dashboard
2. Click **"Edit"** on any article
3. Make changes
4. Save

### Deleting Articles
1. Go to Admin Dashboard
2. Click **"Delete"** on any article
3. Confirm deletion

## 📱 Access From Anywhere

- **Desktop**: Any browser → your Vercel URL
- **Mobile**: Any browser → your Vercel URL
- **Tablet**: Any browser → your Vercel URL

**No installation needed!** Everything is in the cloud.

## 🔄 Automatic Updates

When you want to update the code:
1. Edit files on GitHub (web interface)
2. Commit changes
3. Vercel automatically redeploys
4. Changes live in ~2 minutes

## 💾 Data Storage

- **Database**: Supabase (500MB free)
- **Images**: Supabase Storage (1GB free) or external URLs
- **Backups**: Automatic in Supabase
- **Your PC**: ZERO data stored locally

## 🆓 Free Tier Limits

| Service | Free Tier |
|---------|-----------|
| Vercel | Unlimited bandwidth, 100GB/month |
| Supabase | 500MB database, 1GB storage, 2GB bandwidth |
| GitHub | Unlimited public/private repos |

**Perfect for a movie news website!**

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Admin user created
- [ ] API credentials copied
- [ ] GitHub repository created
- [ ] Code uploaded to GitHub
- [ ] Vercel account created
- [ ] Environment variables configured
- [ ] Website deployed
- [ ] Admin login working
- [ ] First article created

## 🎉 You're Done!

Your movie news website is now **100% cloud-based** with:
- ✅ No local data storage
- ✅ Accessible from anywhere
- ✅ Automatic backups
- ✅ Free hosting
- ✅ Professional domain (optional)
- ✅ Secure authentication
- ✅ Fast performance

**Your website URL**: `https://your-project.vercel.app`
**Admin panel**: `https://your-project.vercel.app/admin/login`
