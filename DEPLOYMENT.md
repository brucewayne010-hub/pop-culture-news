# GitHub + Vercel Deployment Guide

## Quick Start

### 1. Initialize Git Repository

```bash
cd e:\movie-news-website
git init
git add .
git commit -m "Initial commit: Pop culture news website with automated RSS feeds"
```

### 2. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `pop-culture-news` (or your choice)
3. Visibility: **Private** (recommended)
4. **Do NOT** initialize with README (we already have one)
5. Click "Create repository"

### 3. Push to GitHub

Copy the commands from GitHub (replace with your actual URL):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pop-culture-news.git
git push -u origin main
```

### 4. Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Run `database/schema.sql` (full schema)
   - OR if you have existing database: run `database/migration-rss-support.sql`
5. Save your credentials from Settings → API:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### 5. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variables**:

   | Variable | Value | Where to Find |
   |----------|-------|---------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Supabase → Settings → API |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | Supabase → Settings → API |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Supabase → Settings → API |
   | `JWT_SECRET` | Random string | Generate: `openssl rand -base64 32` |

6. Click **Deploy**

### 6. Verify Cron Job

After deployment:
1. Go to Vercel Dashboard → Your Project → Settings → Cron Jobs
2. You should see: `/api/cron/fetch-news` scheduled for `*/30 * * * *`
3. Click "Trigger" to test manually
4. Check logs to verify it's working

### 7. Create Admin User

1. Generate password hash at [bcrypt-generator.com](https://bcrypt-generator.com) (10 rounds)
2. Run in Supabase SQL Editor:

```sql
INSERT INTO admins (email, password_hash)
VALUES ('your-email@example.com', '$2a$10$YOUR_BCRYPT_HASH_HERE');
```

### 8. Test Your Site

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Check all categories work (Hollywood, Bollywood, Music, Web Series, Reviews)
3. Wait 30 minutes or trigger cron manually
4. Verify news articles appear with source attribution
5. Login to admin: `https://your-project.vercel.app/admin/login`

## Troubleshooting

### No Articles Appearing

1. Check Vercel → Functions → Logs
2. Look for `/api/cron/fetch-news` execution
3. Verify Supabase credentials are correct
4. Check Supabase → Table Editor → articles

### Cron Job Not Running

1. Verify `vercel.json` has crons configuration
2. Check Vercel → Settings → Cron Jobs
3. Manually trigger to test
4. Free tier: crons may have delays

### Build Errors

1. Check Node.js version (18+)
2. Verify all dependencies in `package.json`
3. Check Vercel build logs
4. Try local build: `npm run build`

## Updating Your Site

After making code changes:

```bash
git add .
git commit -m "Your change description"
git push
```

Vercel will automatically redeploy!

## Custom Domain (Optional)

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL is automatic

## Monitoring

- **Vercel Analytics**: See traffic and performance
- **Supabase Dashboard**: Monitor database usage
- **Cron Logs**: Check RSS fetch success/failures

## Free Tier Limits

- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **Supabase**: 500MB database, 1GB storage, 2GB bandwidth
- **GitHub**: Unlimited repos

Perfect for a news website!
