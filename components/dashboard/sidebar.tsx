'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  LogOut,
  Settings,
  FileDown,
  PiggyBank,
  Brain,
  X,
  Upload,
  Sparkles, // 🆕 ICON AI ASSISTANT
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function DashboardSidebar({
  onNavigate,
}: {
  onNavigate?: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    {
      href: '/dashboard/transactions',
      icon: CreditCard,
      label: 'Transactions',
    },
    {
      href: '/dashboard/analytics',
      icon: BarChart3,
      label: 'Analytics',
    },

    // 💰 BUDGET
    {
      href: '/dashboard/budget',
      icon: PiggyBank,
      label: 'Budgeting',
    },

    // 🧠 INSIGHT
    {
      href: '/dashboard/insight',
      icon: Brain,
      label: 'Insight',
    },

    // 📸 UPLOAD STRUK
    {
      href: '/dashboard/upload-struk',
      icon: Upload,
      label: 'Upload Struk',
    },

    // 🤖 AI ASSISTANT (BARU)
    {
      href: '/dashboard/ai-assistant',
      icon: Sparkles,
      label: 'AI Assistant',
    },

    {
      href: '/dashboard/export',
      icon: FileDown,
      label: 'Export Excel',
    },
    {
      href: '/dashboard/settings',
      icon: Settings,
      label: 'Settings',
    },
  ]

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Logged out')
      router.push('/')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const handleNavigate = () => {
    onNavigate?.()
  }

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-card border-r border-border flex flex-col h-full relative"
    >

      {/* MOBILE HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
        <h2 className="font-bold text-primary">Menu</h2>

        <button
          onClick={() => onNavigate?.()}
          className="p-2 rounded hover:bg-muted"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* LOGO */}
      <div className="p-6 border-b border-border hidden md:block">
        <h1 className="text-2xl font-bold text-primary">MASE</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Smart Expense Tracker
        </p>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavigate}
            >
              <motion.div
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* FOOTER */}
      <div className="p-4 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">
          MASE by @Daveeed_Iqbaaal
        </p>
      </div>

    </motion.aside>
  )
}