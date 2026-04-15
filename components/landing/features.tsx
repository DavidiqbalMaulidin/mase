'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Real-time Financial Dashboard',
      description: 'Pantau total balance, income, dan expense dalam dashboard yang live dan responsive',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '💰',
      title: 'Income & Expense Tracking',
      description: 'Catat setiap transaksi dengan kategori, deskripsi, dan tanggal yang lengkap',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: '🧠',
      title: 'Smart Category System',
      description: 'Kategori otomatis dengan 9+ pilihan, dari Food sampai Investment',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: '📈',
      title: 'Analytics & Charts',
      description: 'Visualisasi data dengan pie chart, bar chart, dan line chart yang interaktif',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: '🔐',
      title: 'Secure Authentication System',
      description: 'Login aman dengan sistem autentikasi modern dan Row Level Security untuk menjaga privasi data pengguna',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: '📤',
      title: 'Export PDF & CSV',
      description: 'Export laporan keuanganmu dalam format PDF dan CSV untuk analisis lebih lanjut',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Features</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
            Fitur-fitur <span className="text-primary">Powerful</span> untuk MASE
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Semua tools yang kamu butuhkan untuk mengelola keuangan dengan sempurna
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${feature.color}`}
              />

              <div className="relative z-10">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
