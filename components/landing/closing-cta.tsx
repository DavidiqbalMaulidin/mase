'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ClosingCTA() {
  const instagramUsername = "daveeed_iqbaaal" // 🔥 GANTI DI SINI

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary via-accent to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <motion.div
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 opacity-50"
          >
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Siap Kontrol Keuanganmu?
              </h2>

              <p className="text-lg mb-12 text-white/90">
                Mulai tracking pemasukan dan pengeluaran hari ini, tanpa perlu kartu kredit.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2">
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                  Sudah punya akun?
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/80 text-sm"
            >
              Gratis selamanya. Tidak butuh kartu kredit.
            </motion.p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-muted-foreground text-sm"
        >
          <p>
            MASE — Smart Expense Tracker by{' '}
            <Link
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              className="text-primary font-bold hover:underline transition"
            >
              @{instagramUsername}
            </Link>
          </p>

          <p className="mt-2">
            © 2025 MASE. Semua hak dilindungi.
          </p>
        </motion.div>
      </div>
    </section>
  )
}