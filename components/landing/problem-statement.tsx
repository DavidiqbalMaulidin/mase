'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export default function ProblemStatement() {
  const problems = [
    {
      icon: '💸',
      title: 'Uang Cepat Habis Tanpa Sadar',
      description: 'Setiap bulannya uangmu hilang tapi kamu nggak tahu kemana. Ga ada tracking yang jelas tentang pengeluaran.',
    },
    {
      icon: '❓',
      title: 'Tidak Tahu Pengeluaran Terbesar',
      description: 'Kategori mana yang paling boros? Susah banget untuk di-identify tanpa data yang terstruktur.',
    },
    {
      icon: '📊',
      title: 'Tidak Ada Tracking Keuangan',
      description: 'Excel? Manual notes? Ribet banget dan sering lupa. Butuh solusi yang modern dan praktis.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >

          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-red-500/10 border border-red-500/30 mb-6"
          >
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              Masalahnya
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white"
          >
            Kenapa Keuangan Kamu <span className="text-red-500">Sulit Dikelola?</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-muted-foreground"
          >
            Mayoritas orang Indonesia kesulitan mengelola keuangan karena tools yang ada terlalu complicated atau tidak user-friendly.
          </motion.p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >

          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="
                bg-white dark:bg-card
                border border-slate-200 dark:border-border
                rounded-2xl p-8
                shadow-sm hover:shadow-xl
                transition-all duration-300
              "
            >
              <div className="text-5xl mb-4">{problem.icon}</div>

              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {problem.title}
              </h3>

              <p className="text-slate-600 dark:text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  )
}