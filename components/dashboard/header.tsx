'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DashboardHeader({
  user,
  onMenuClick,
}: {
  user: any
  onMenuClick?: () => void
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const username = user?.email?.split('@')[0] || 'User'

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        w-full
        bg-card border-b border-border
        px-4 md:px-8 
        py-4 md:py-5
        flex items-center justify-between
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        {/* HAMBURGER */}
        <button
          onClick={() => onMenuClick?.()}
          aria-label="Toggle menu"
          className="
            md:hidden
            p-2 rounded-lg
            hover:bg-muted
            active:scale-95
            transition
          "
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg md:text-2xl font-bold">
            Dashboard
          </h2>

          <p className="text-xs md:text-sm text-muted-foreground">
            Welcome, {username}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">

        {/* THEME TOGGLE */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }
          className="
            rounded-full
            hover:bg-muted
            active:scale-95
            transition
          "
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </motion.header>
  )
}