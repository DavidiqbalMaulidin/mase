# 🚀 MASE Deployment Guide

**MASE by @Daveeed_Iqbaaal**

---

## 📋 Pre-Deployment Checklist

Before deploying to Vercel, ensure:

- ✅ Database tables created in Supabase
- ✅ `.env.local` has Supabase credentials
- ✅ `npm run build` completes without errors
- ✅ Test login/register flow locally
- ✅ Test dashboard transactions locally
- ✅ All landing page sections load smoothly
- ✅ Dark/light mode toggle works
- ✅ Mobile responsive verified

---

## 🔧 Step 1: Database Setup

**If not already done:**

### Using Supabase Dashboard (RECOMMENDED):
1. Go to https://app.supabase.com/projects
2. Select your project: `xyqiauvpvlnkcushglge`
3. Click **SQL Editor** → **New Query**
4. Copy entire content from `/scripts/setup-database.sql`
5. Paste and click **Run**
6. Verify tables created: `transactions` and `categories`

### Using CLI (Alternative):
```bash
npm run db:setup
```

---

## 🛠️ Step 2: Local Testing

Before pushing to production:

```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

**Test Checklist:**
- [ ] Landing page loads with all 10 sections
- [ ] Navigation works
- [ ] Register page accessible
- [ ] Create new account
- [ ] Login with credentials
- [ ] Dashboard appears
- [ ] Add transaction works
- [ ] Analytics page shows charts
- [ ] Dark mode toggle works
- [ ] Mobile view responsive

---

## 📦 Step 3: Build & Test Production Build

```bash
# Build for production
npm run build

# Start production server locally
npm start

# Open http://localhost:3000 and test
```

If build fails, check:
- Missing imports or typos
- Environment variables set in `.env.local`
- Database migration completed

---

## 🌐 Step 4: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **Add New...** → **Project**
3. Import GitHub repository with your MASE code
4. Configure project:
   - Framework: Next.js
   - Root Directory: ./
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xyqiauvpvlnkcushglge.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
6. Click **Deploy**
7. Wait for deployment to complete (~5 minutes)

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally (if needed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts and add environment variables when asked
```

---

## ✅ Step 5: Post-Deployment Verification

After deployment completes:

1. **Visit your live URL** (provided by Vercel)
2. **Test all features:**
   - [ ] Landing page loads
   - [ ] Register/Login works
   - [ ] Dashboard displays
   - [ ] Create transaction
   - [ ] View analytics
   - [ ] Logout works
3. **Check performance:**
   - [ ] Page load time < 3s
   - [ ] No console errors
   - [ ] Mobile responsive
4. **Test edge cases:**
   - [ ] Refresh page while logged in (session persists)
   - [ ] Try accessing /dashboard without login (redirects to /login)
   - [ ] Delete transaction and verify update

---

## 🔐 Environment Variables Reference

These need to be added to Vercel project settings:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xyqiauvpvlnkcushglge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cWlhdXZwdmxua2N1c2hnbGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjkxMjUsImV4cCI6MjA5MTc0NTEyNX0.ASw2jznbIsLfGH-9xnpDcEhc-rhg-wD3wkIrOMKIVXw
```

**Note**: These are marked as `NEXT_PUBLIC_*` so they're safe to expose in browser requests (they're read-only keys anyway).

---

## 🐛 Troubleshooting Deployment

### Issue: Build fails with "Cannot find module"
**Solution**: Ensure all imports are correct and dependencies installed
```bash
npm install
npm run build
```

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not set"
**Solution**: Add environment variables in Vercel project settings:
1. Go to Settings → Environment Variables
2. Add both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Redeploy

### Issue: Login not working on production
**Solution**: Check Supabase project is accessible:
1. Go to Supabase dashboard
2. Verify Auth is enabled
3. Check RLS policies on transactions table

### Issue: Database queries fail
**Solution**: Run database migration in Supabase:
1. Go to SQL Editor
2. Paste `/scripts/setup-database.sql`
3. Execute the query

### Issue: "CORS error" in browser console
**Solution**: Add Vercel URL to Supabase CORS settings:
1. Go to Supabase Settings → API
2. Add your Vercel deployment URL to allowed URLs
3. Wait 5 minutes and refresh

---

## 🔄 Continuous Deployment (CD)

Vercel automatically deploys when you push to GitHub:

1. Make changes locally
2. `git add .`
3. `git commit -m "feat: description"`
4. `git push origin main`
5. Vercel automatically deploys (~2 minutes)

Check deployment status at https://vercel.com/dashboard

---

## 📊 Monitoring Production

### Performance
- Check Core Web Vitals in Vercel Analytics
- Monitor database query performance in Supabase

### Errors
- Check Vercel Function logs for API errors
- Check Supabase logs for database issues
- Use browser DevTools console for client errors

### Usage
- Monitor concurrent users in Supabase
- Track database storage usage
- Monitor Vercel serverless function usage

---

## 🔒 Production Security Checklist

- ✅ Environment variables not exposed
- ✅ Row Level Security (RLS) enabled
- ✅ Middleware protecting dashboard
- ✅ HTTPS enforced (automatic with Vercel)
- ✅ Session tokens secure (HTTP-only cookies)
- ✅ SQL injection prevention via parameterized queries
- ✅ Rate limiting on auth endpoints (optional enhancement)

---

## 📞 Support & Issues

### Common Errors

**500 Internal Server Error**
- Check Vercel Function logs
- Check Supabase error logs
- Verify database migrations ran

**Blank Dashboard**
- Check API call in Network tab
- Verify Supabase auth working
- Check RLS policies

**Transactions not showing**
- Verify transactions created in Supabase
- Check RLS policy: `users can only see their own`
- Verify user_id matches auth user

---

## 🎉 You're Live!

Once deployment is successful:

1. Share your URL with friends
2. Create social media posts
3. Add to portfolio
4. Deploy analytics/tracking (optional)

**Example URLs:**
- Production: `https://mase-expense-tracker.vercel.app`
- Production (custom domain): `https://mase.yourname.com`

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Deployment Guide](https://supabase.com/docs/guides/hosting/overview)
- [Next.js Deployment](https://nextjs.org/docs/deployment/vercel)
- [Custom Domain Setup](https://vercel.com/docs/concepts/projects/domains/add-a-domain)

---

## 🎯 What's Next?

After successful deployment:

1. **Monitor Analytics**: Track user behavior
2. **Gather Feedback**: Collect user testimonials
3. **Plan Enhancements**:
   - Recurring transactions
   - Budget tracking
   - Mobile app
   - PDF exports
4. **Scale**: Add more features based on usage

---

**Deployment Status**: ✅ READY FOR PRODUCTION

**Last Updated**: 4/14/2026  
**Created by**: @Daveeed_Iqbaaal

---

Need help? Check README.md, SETUP.md, or BUILD_CHECKLIST.md!
