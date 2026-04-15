'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Daftar dengan email dan password kamu. Proses cepat dan aman dengan Supabase.',
      icon: '📝',
    },
    {
      number: '02',
      title: 'Add Transactions',
      description: 'Mulai catat setiap pemasukan dan pengeluaran dengan kategori yang sesuai.',
      icon: '💳',
    },
    {
      number: '03',
      title: 'View Analytics',
      description: 'Lihat insights real-time dengan chart yang interaktif dan mudah dipahami.',
      icon: '📊',
    },
    {
      number: '04',
      title: 'Control Your Money',
      description: 'Ambil keputusan finansial yang lebih baik berdasarkan data yang akurat.',
      icon: '🎯',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6"
          >
            <span className="text-sm font-medium">Cara Kerja</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
            Mulai <span className="text-primary">Tracking</span> Dalam 4 Langkah
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="space-y-8"
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex gap-8 items-start">
              {/* Left - Number & Icon */}
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg"
                >
                  {step.number}
                </motion.div>
                {idx < steps.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 80 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="w-1 bg-gradient-to-b from-primary to-accent rounded-full"
                  />
                )}
              </div>

              {/* Right - Content */}
              <motion.div
                whileHover={{ x: 8 }}
                className="bg-card border border-border rounded-2xl p-8 flex-1 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">Siap untuk memulai perjalanan finansial yang lebih baik?</p>
          <div className="inline-flex items-center gap-2 text-primary font-bold cursor-pointer hover:gap-4 transition-all">
            Mari mulai sekarang
            <ArrowRight className="h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
