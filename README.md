# 🔥 MASE - Smart Expense Tracker

**MASE by @Daveeed_Iqbaaal**

## 🎯 Overview

MASE is a modern, full-stack expense tracking application built with Next.js 16, Supabase, and Framer Motion. It features a stunning long-form landing page with smooth scroll animations and a powerful dashboard for managing your finances in real-time.

**Target Aesthetic**: Stripe × Revolut × Notion (Modern Fintech SaaS)

---

## ✨ Key Features

### 🌐 Landing Page (10 Sections)
1. **Hero** - Full-screen impact with gradient background
2. **Problem Statement** - Real challenges with animations
3. **Solution Intro** - MASE introduction with mockups
4. **Features** - 6-card grid showcase
5. **How It Works** - Step-by-step vertical timeline
6. **Demo Preview** - Interactive dashboard preview
7. **Analytics Showcase** - Sample charts and graphs
8. **Why MASE?** - Key benefits bulleted
9. **Testimonials** - Social proof from users
10. **Closing CTA** - Strong call-to-action

### 🔐 Authentication
- Email/password registration
- Secure login with session persistence
- Protected dashboard routes via middleware
- Logout functionality

### 📊 Dashboard
- **Real-time Summary Cards**: Balance, Income, Expense, Savings Rate
- **Transaction Management**: Add, edit, delete transactions with categories
- **Smart Filtering**: By type, category, and date range
- **Responsive Tables**: Clean transaction history view
- **Modal Interface**: Smooth transaction entry

### 📈 Analytics Page
- **Category Breakdown** - Pie chart of spending by category
- **Monthly Comparison** - Bar chart of income vs expenses
- **Cashflow Trends** - Line chart showing balance over time
- **Interactive Charts** - Recharts with hover tooltips

### 🎨 Design System
- **Modern Fintech Aesthetic** - Inspired by Stripe, Revolut, Notion
- **Glassmorphism Cards** - Frosted glass effect with borders
- **Smooth Animations** - Framer Motion on scroll and interactions
- **Dark/Light Mode** - Full theme support
- **Mobile-First Responsive** - Works perfectly on all devices
- **Semantic Typography** - Geist font family

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase account (already configured!)

### 2. Environment Setup
Your `.env.local` already contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyqiauvpvlnkcushglge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Database Setup
**Important**: You must set up the database before running the app!

**Option A: Using Supabase Dashboard (RECOMMENDED)**
1. Go to https://app.supabase.com
2. Select your project
3. Go to SQL Editor
4. Create a new query
5. Copy contents of `/scripts/setup-database.sql`
6. Execute the query

This creates:
- ✅ `transactions` table with RLS
- ✅ `categories` table
- ✅ Indexes for performance
- ✅ Default categories

**Option B: Using CLI Script**
```bash
npm run db:setup
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser 🎉

---

## 📁 Project Structure

```
mase/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Design tokens
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── register/
│   │   └── page.tsx             # Registration page
│   ├── dashboard/
│   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   ├── page.tsx             # Main dashboard
│   │   └── analytics/
│   │       └── page.tsx         # Analytics page with charts
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── register/route.ts
│       │   └── logout/route.ts
│       └── transactions/
│           ├── route.ts         # GET all, POST new
│           └── [id]/route.ts    # PUT update, DELETE remove
│
├── components/
│   ├── landing/
│   │   ├── navigation.tsx
│   │   ├── hero.tsx
│   │   ├── problem-statement.tsx
│   │   ├── solution-intro.tsx
│   │   ├── features.tsx
│   │   ├── how-it-works.tsx
│   │   ├── demo-preview.tsx
│   │   ├── analytics-showcase.tsx
│   │   ├── why-mase.tsx
│   │   ├── testimonials.tsx
│   │   └── closing-cta.tsx
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── summary-cards.tsx
│   │   ├── add-transaction-modal.tsx
│   │   └── transactions-table.tsx
│   └── ui/
│       └── [shadcn components]
│
├── lib/
│   ├── supabase.ts              # Supabase client
│   └── utils.ts                 # Helpers: formatCurrency, etc
│
├── scripts/
│   ├── setup-database.sql       # Database migration
│   └── setup-db.ts              # Setup automation
│
├── middleware.ts                # Auth protection
├── .env.local                   # Environment variables
└── SETUP.md                     # Setup guide
```

---

## 🗄️ Database Schema

### `transactions` Table
```sql
- id: UUID (primary key)
- user_id: UUID (foreign key → auth.users)
- title: TEXT (transaction description)
- amount: NUMERIC(12,2) (transaction amount)
- type: TEXT (enum: 'income', 'expense')
- category: TEXT (category name)
- description: TEXT (optional notes)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

**Indexes**: user_id, created_at, type

**RLS Policies**: Users can only see/edit their own transactions

### `categories` Table
```sql
- id: UUID (primary key)
- name: TEXT (category name)
- icon: TEXT (emoji)
- color: TEXT (hex code)
- user_id: UUID (optional, for custom categories)
- created_at: TIMESTAMP
```

**Default Categories**:
- 🍔 Food
- 🚗 Transportation
- 🎬 Entertainment
- 🛍️ Shopping
- 💡 Bills & Utilities
- 🏥 Health
- 💰 Salary
- 💻 Freelance
- 📈 Investment

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Transactions
- `GET /api/transactions` - Fetch all user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/[id]` - Update transaction
- `DELETE /api/transactions/[id]` - Delete transaction

All endpoints are protected with Supabase authentication.

---

## 🎨 Design Tokens

### Colors (Light Mode)
- **Primary**: #3b82f6 (Blue)
- **Accent**: #06b6d4 (Cyan)
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)
- **Muted**: #e2e8f0 (Slate)

### Colors (Dark Mode)
- **Primary**: #60a5fa (Light Blue)
- **Accent**: #22d3ee (Light Cyan)
- **Success**: #10b981 (Green)
- **Danger**: #f87171 (Light Red)

### Typography
- **Sans**: Geist (headings & body)
- **Mono**: Geist Mono (code)
- **Line Height**: 1.6 (relaxed, accessible)

### Components
- **Border Radius**: 0.625rem (10px)
- **Shadows**: Subtle, glassmorphism style
- **Animations**: Framer Motion (spring transitions)

---

## 🚀 Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: MASE expense tracker"
git push origin main
```

### 2. Import to Vercel
1. Go to https://vercel.com/import
2. Select your GitHub repository
3. Click Import

### 3. Add Environment Variables
In Vercel project settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://xyqiauvpvlnkcushglge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Deploy
Click "Deploy" and you're live! 🎉

---

## 🔐 Security Features

- ✅ **Row Level Security (RLS)** - Users can only access their own data
- ✅ **Session Persistence** - Secure HTTP-only cookies
- ✅ **Protected Routes** - Middleware protects dashboard
- ✅ **Parameterized Queries** - SQL injection protection
- ✅ **Input Validation** - Form validation before submission
- ✅ **HTTPS Only** - All traffic encrypted

---

## 📱 Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile Safari: ✅
- Samsung Internet: ✅

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Ensure `.env.local` has the correct credentials

### Issue: Database tables don't exist
**Solution**: Run the SQL migration from `/scripts/setup-database.sql`

### Issue: Transactions not showing up
**Solution**: Check RLS policies in Supabase dashboard

### Issue: Login not working
**Solution**: Verify Supabase Auth is enabled in project settings

---

## 🔥 Branding

**Always display**: MASE by @Daveeed_Iqbaaal

Appears in:
- Hero section of landing page
- Navigation bar
- Dashboard header
- CTA buttons
- Footer

---

## 📄 License

This project is created by @Daveeed_Iqbaaal

---

## 💬 Support

For help:
1. Check SETUP.md for detailed setup instructions
2. Review Supabase dashboard for database issues
3. Clear browser cache: `Ctrl+Shift+Delete` (Chrome) or `Cmd+Shift+Delete` (Mac)
4. Rebuild project: `npm run build`

---

**Made with ❤️ by @Daveeed_Iqbaaal**

🚀 Happy tracking! Keep your finances in check with MASE!
