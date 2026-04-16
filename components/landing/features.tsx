'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI Financial Assistant',
      description:
        'Tanya apa saja tentang keuanganmu — dari total pengeluaran, kategori terbesar, hingga insight bulanan secara instan.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: '📊',
      title: 'Real-Time Financial Overview',
      description:
        'Pantau seluruh kondisi keuangan dalam satu dashboard yang cepat, ringan, dan selalu terupdate.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '💰',
      title: 'Smart Income & Expense Tracker',
      description:
        'Catat setiap pemasukan dan pengeluaran dengan cepat, lengkap dengan kategori dan detail waktu.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: '🧠',
      title: 'Smart Category System',
      description:
        'Transaksi otomatis dikelompokkan agar keuanganmu lebih rapi dan mudah dianalisis.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: '📈',
      title: 'Insightful Financial Analytics',
      description:
        'Visualisasi data keuangan dalam grafik interaktif untuk melihat pola pengeluaran dengan jelas.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: '📤',
      title: 'Export Financial Reports',
      description:
        'Unduh laporan keuangan dalam format PDF atau CSV untuk kebutuhan pribadi atau analisis lebih lanjut.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast Performance',
      description:
        'Dirancang agar ringan, cepat, dan nyaman digunakan di semua perangkat.',
      color: 'from-yellow-500 to-yellow-600',
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Features</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Semua yang kamu butuhkan untuk{' '}
            <span className="text-primary">mengontrol keuangan</span> dalam satu tempat
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Dari tracking transaksi sampai insight cerdas berbasis AI — semuanya dirancang untuk memudahkan hidupmu.
          </motion.p>
        </motion.div>

        {/* GRID */}
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
              {/* hover gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${feature.color}`}
              />

              <div className="relative z-10">
                <div className="text-5xl mb-4">{feature.icon}</div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}