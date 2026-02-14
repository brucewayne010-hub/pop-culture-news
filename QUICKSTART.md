# Quick Start Guide - Deploy Your Pop Culture News Website

## 🚀 3-Step Deployment

### Step 1: GitHub (5 minutes)

```bash
cd e:\movie-news-website
git init
git add .
git commit -m "Pop culture news website with automated RSS feeds"
git branch -M main
```

Then create repo at [github.com/new](https://github.com/new) and:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Supabase (5 minutes)

1. Create project at [supabase.com](https://supabase.com)
2. SQL Editor → Run `database/schema.sql`
3. Settings → API → Copy credentials

### Step 3: Vercel (5 minutes)

1. [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = Your service role key
   - `JWT_SECRET` = Run: `openssl rand -base64 32`
3. Deploy!

## ✅ Done!

Your website is now live with:
- ✅ 5 categories (Hollywood, Bollywood, Music, Web Series, Reviews)
- ✅ Auto-updating news every 30 minutes
- ✅ 15+ legal news sources
- ✅ Source attribution on all articles

## 🎯 Next Actions

1. **Create Admin User**:
   - Generate hash: [bcrypt-generator.com](https://bcrypt-generator.com)
   - Supabase SQL Editor:
   ```sql
   INSERT INTO admins (email, password_hash)
   VALUES ('your-email@example.com', '$2a$10$YOUR_HASH');
   ```

2. **Trigger First RSS Fetch**:
   - Vercel Dashboard → Cron Jobs → Trigger `/api/cron/fetch-news`
   - Wait 2-3 minutes
   - Check your website for news articles!

3. **Test Everything**:
   - Visit all 5 categories
   - Click on source attribution links
   - Login to admin panel: `/admin/login`
   - Create a manual article to test

## 📚 Full Documentation

- **Detailed Guide**: [`DEPLOYMENT.md`](file:///e:/movie-news-website/DEPLOYMENT.md)
- **Walkthrough**: See artifacts folder
- **README**: [`README.md`](file:///e:/movie-news-website/README.md)

## 🆘 Need Help?

Check [`DEPLOYMENT.md`](file:///e:/movie-news-website/DEPLOYMENT.md) → Troubleshooting section
