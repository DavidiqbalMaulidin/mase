'use client'

import { useEffect } from 'react'

export function MaseWelcomeMessage() {
  useEffect(() => {
    const styles = {
      main: 'font-size: 20px; font-weight: bold; color: #3b82f6; margin: 10px 0;',
      subtitle: 'font-size: 14px; color: #06b6d4; margin: 5px 0;',
      info: 'font-size: 12px; color: #64748b; margin: 3px 0; font-family: monospace;',
    }

    console.log(
      '%c🔥 MASE - Smart Expense Tracker',
      styles.main
    )
    console.log(
      '%cby @Daveeed_Iqbaaal',
      styles.subtitle
    )
    console.log(
      '%c\n✨ Welcome to MASE! Here\'s what you need to know:\n',
      styles.info
    )
    console.log(
      '%c📍 Pages:\n' +
      '%c  • / (landing page)\n' +
      '%c  • /login (authentication)\n' +
      '%c  • /register (sign up)\n' +
      '%c  • /dashboard (main app)\n' +
      '%c  • /dashboard/analytics (charts & insights)\n',
      styles.subtitle,
      styles.info,
      styles.info,
      styles.info,
      styles.info,
      styles.info
    )
    console.log(
      '%c🔑 Database:\n' +
      '%c  • Remember to run setup-database.sql in Supabase\n' +
      '%c  • Or use: npm run db:setup\n',
      styles.subtitle,
      styles.info,
      styles.info
    )
    console.log(
      '%c💡 Features:\n' +
      '%c  • Real-time transaction tracking\n' +
      '%c  • Beautiful analytics dashboard\n' +
      '%c  • Secure Supabase authentication\n' +
      '%c  • Dark/light mode support\n',
      styles.subtitle,
      styles.info,
      styles.info,
      styles.info,
      styles.info
    )
    console.log(
      '%c📚 Docs: Check README.md and SETUP.md for more info\n',
      styles.info
    )
  }, [])

  return null
}
