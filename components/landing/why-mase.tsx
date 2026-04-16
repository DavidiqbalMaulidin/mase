'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function WhyMase() {
  const reasons = [
    {
      title: 'Hemat Waktu, Tanpa Ribet',
      description:
        'Catat keuangan dalam hitungan detik. Nggak perlu lagi buka Excel atau hitung manual.',
    },
    {
      title: 'Semua Keuangan Dalam Satu Tempat',
      description:
        'Tidak ada lagi catatan tercecer. Semua pemasukan dan pengeluaran tersusun rapi otomatis.',
    },
    {
      title: 'Bikin Keuangan Lebih Mudah Dipahami',
      description:
        'Data yang rumit berubah jadi visual yang simpel, jelas, dan enak dilihat.',
    },
    {
      title: 'Bisa Dipakai Kapan Saja',
      description:
        'Mau di HP, laptop, atau tablet — semuanya tetap nyaman dan responsif.',
    },
    {
      title: 'Selalu Update Secara Instan',
      description:
        'Setiap transaksi langsung tercatat dan langsung terlihat di dashboard kamu.',
    },
    {
      title: 'Aman & Tenang Dipakai',
      description:
        'Data keuangan kamu dijaga dengan sistem yang aman dan hanya bisa diakses oleh kamu sendiri.',
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

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Kenapa banyak orang memilih{' '}
            <span className="text-primary">MASE?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cara paling simpel untuk mengatur keuangan tanpa stres, tanpa ribet, dan tanpa bingung lagi.
          </p>
        </motion.div>

        {/* REASONS GRID */}
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
              whileHover={{ y: -4 }}
              className="flex gap-4 items-start bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />

              <div>
                <h3 className="font-bold text-lg mb-2">
                  {reason.title}
                </h3>

                <p className="text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}