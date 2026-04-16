'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rizky Pratama',
      role: 'Freelancer Designer',
      text: 'Dulu aku sering bingung uang habis ke mana. Setelah pakai MASE, semuanya jadi jelas banget. Sekarang aku bisa kontrol pengeluaran tanpa ribet.',
      rating: 5,
      avatar: '🎨',
    },
    {
      name: 'Nadia Putri',
      role: 'Mahasiswa',
      text: 'Awalnya cuma coba-coba, tapi ternyata kepake banget. Aku jadi lebih sadar pengeluaran harian dan bisa nabung lebih konsisten.',
      rating: 5,
      avatar: '📚',
    },
    {
      name: 'Budi Santoso',
      role: 'Pemilik Usaha Kecil',
      text: 'Yang paling membantu itu insight-nya. Aku bisa lihat pola pengeluaran bisnis tanpa harus rekap manual lagi.',
      rating: 5,
      avatar: '🏪',
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
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="container mx-auto max-w-5xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Apa kata mereka tentang{' '}
            <span className="text-primary">MASE?</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Cerita nyata dari pengguna yang sudah mencoba mengatur keuangan dengan lebih baik
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all"
            >

              {/* RATING */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* TEXT */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                &quot;{testimonial.text}&quot;
              </p>

              {/* AUTHOR */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>

                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}