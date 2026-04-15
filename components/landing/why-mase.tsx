'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function WhyMase() {
  const reasons = [
    {
      title: 'Lebih Cepat dari Excel',
      description: 'Input transaksi dalam hitungan detik, tidak perlu configure rumus kompleks',
    },
    {
      title: 'Lebih Mudah dari Manual Notes',
      description: 'Semua otomatis tercatat dan tersimpan aman di cloud',
    },
    {
      title: 'Visual Finance Tracking',
      description: 'Chart dan grafik yang cantik membuat data mudah dipahami',
    },
    {
      title: 'Mobile Responsive',
      description: 'Akses dari phone, tablet, atau desktop kapan saja dimana saja',
    },
    {
      title: 'Real-time Updates',
      description: 'Dashboard update otomatis setiap kali ada transaksi baru',
    },
    {
      title: 'Secure & Private',
      description: 'Data kamu aman dengan enkripsi dan Row Level Security',
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="why-mase" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Kenapa Pilih <span className="text-primary">MASE?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            6 alasan mengapa MASE adalah pilihan terbaik untuk tracking keuangan
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex gap-4 items-start bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
