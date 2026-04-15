🔥 **MASE - Smart Expense Tracker**  
By @Daveeed_Iqbaaal

---

## ✨ Setup Instructions

### 1️⃣ **Environment Variables**
Your `.env.local` is already configured with Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://xyqiauvpvlnkcushglge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2️⃣ **Database Setup**
Before running the app, you need to create the database tables:

**Option A - Using Supabase SQL Editor (RECOMMENDED):**
1. Go to your Supabase project: https://app.supabase.com
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste the content from `/scripts/setup-database.sql`
5. Click "Run"

**Option B - Using Node Script:**
```bash
npm run db:setup
```

### 3️⃣ **Run the App**
```bash
npm run dev
```
Open http://localhost:3000 in your browser

---

## 🎯 Features

### Landing Page
- **10 Stunning Sections** with smooth scroll animations
- Hero section with gradient background
- Problem/Solution storytelling
- 6-feature grid showcase
- How-it-works vertical timeline
- Live demo preview
- Analytics showcase with sample charts
- Testimonials & powerful CTAs
- Mobile-responsive design

### Authentication
- ✅ Register with email/password
- ✅ Login to existing account
- ✅ Session persistence
- ✅ Protected dashboard routes
- ✅ Logout functionality

### Dashboard
- 📊 Real-time summary cards (Balance, Income, Expense, Savings Rate)
- 💰 Add/Edit/Delete transactions
- 📝 Transaction list with filtering
- 🎯 Category management
- 🌙 Dark/Light mode support

### Analytics
- 📈 Monthly income/expense comparison (Bar Chart)
- 🥧 Category spending breakdown (Pie Chart)
- 📊 Cashflow trends (Line Chart)
- 📅 Interactive date filtering

### Design
- 🎨 Modern fintech aesthetic (Stripe/Revolut style)
- ✨ Smooth Framer Motion animations
- 🎭 Glassmorphism cards
- 🌗 Dark/Light mode
- 📱 Fully responsive mobile-first

---

## 📁 Project Structure

```
/app
  /page.tsx (landing page)
  /login
  /register
  /dashboard
    /page.tsx (main dashboard)
    /analytics
      /page.tsx (analytics page)
  /api
    /auth (login, register, logout)
    /transactions (CRUD operations)
  /layout.tsx

/components
  /landing (10 sections)
  /dashboard (UI components)
  /ui (shadcn components)

/lib
  /supabase.ts (Supabase client)
  /utils.ts (helpers: formatCurrency, calculateSavingsRate, etc)

/scripts
  /setup-database.sql (database migration)
  /setup-db.ts (setup automation)
```

---

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy! 🎉

---

## 🔐 Database Schema

### `transactions` table
- `id` - UUID primary key
- `user_id` - Foreign key to auth.users
- `title` - Transaction description
- `amount` - Transaction amount (numeric)
- `type` - 'income' or 'expense'
- `category` - Category name
- `description` - Optional notes
- `created_at` - Timestamp
- `updated_at` - Updated timestamp

### `categories` table
- `id` - UUID primary key
- `name` - Category name
- `icon` - Emoji/icon
- `color` - Hex color code
- `user_id` - Optional, for custom categories
- `created_at` - Timestamp

---

## 🎨 Design System

**Colors:**
- Primary: Blue (#3b82f6)
- Accent: Cyan (#06b6d4)
- Success: Green (#10b981)
- Danger: Red (#ef4444)
- Warning: Amber (#f59e0b)

**Typography:**
- Font: Geist (sans-serif)
- Mono: Geist Mono

---

## 🔥 Branding

✨ **MASE by @Daveeed_Iqbaaal**

Always display this branding in:
- Hero section
- Navigation
- CTA buttons
- Footer

---

## 📞 Support

For issues or questions:
1. Check Supabase dashboard for database issues
2. Verify environment variables in .env.local
3. Clear browser cache and rebuild: `npm run build`
4. Check browser console for errors

---

Happy tracking! 🚀💰

Created with ❤️ by @Daveeed_Iqbaaal
