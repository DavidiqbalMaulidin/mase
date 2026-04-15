'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        {/* Author Label */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">
              MASE by @Daveeed_Iqbaaal
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent"
        >
          Kelola Keuanganmu Lebih Cerdas dengan MASE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed"
        >
          Tracking pemasukan & pengeluaran jadi lebih mudah, real-time, dan visual.
          <br />
          Saksikan keuanganmu berkembang dengan insights yang powerful dan actionable.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="#demo">
            <Button size="lg" variant="outline" className="gap-2">
              View Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Floating Cards Animation */}
        <motion.div
          variants={itemVariants}
          className="relative h-80 md:h-96 mt-16"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute left-5 md:left-20 top-10 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-border w-48"
          >
            <div className="text-sm text-muted-foreground mb-2">
              Total Balance
            </div>
            <div className="text-3xl font-bold text-primary">Rp 12.5M</div>
            <div className="text-xs text-green-600 mt-2">
              ↑ 12% dari bulan lalu
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute right-5 md:right-20 top-32 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-border w-48"
          >
            <div className="text-sm text-muted-foreground mb-2">
              Pengeluaran Bulan Ini
            </div>
            <div className="text-3xl font-bold text-destructive">Rp 3.2M</div>
            <div className="text-xs text-muted-foreground mt-2">
              Kategori: Food, Transport
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-border w-56"
          >
            <div className="text-sm text-muted-foreground mb-2">
              Kategori Terbesar
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                Food 40%
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                Transport 30%
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}