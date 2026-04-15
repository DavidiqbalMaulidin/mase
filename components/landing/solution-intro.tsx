'use client'

import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

export default function SolutionIntro() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-purple-100/10 dark:from-primary/5 dark:via-accent/5 dark:to-purple-950/5">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/50 mb-6">
              <Lightbulb className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Solusinya</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Kenalkan <span className="text-primary">MASE</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Platform manajemen keuangan yang dirancang khusus untuk memudahkan tracking pemasukan dan pengeluaran dengan tampilan yang modern dan intuitif.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex gap-4 items-start">
                <div className="text-2xl">🔍</div>
                <div>
                  <h3 className="font-bold mb-1">Smart Tracking System</h3>
                  <p className="text-sm text-muted-foreground">Catat setiap transaksi dengan kategori otomatis dan notes yang jelas</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-bold mb-1">Real-time Analytics</h3>
                  <p className="text-sm text-muted-foreground">Lihat insights keuanganmu dengan visualisasi yang cantik dan mudah dipahami</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-2xl">🎨</div>
                <div>
                  <h3 className="font-bold mb-1">Simple & Beautiful UI</h3>
                  <p className="text-sm text-muted-foreground">Interface yang dirancang untuk kemudahan penggunaan maksimal</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Floating Dashboard Preview */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative h-96 md:h-full"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-purple-500/20 rounded-3xl blur-3xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-border p-8 h-full flex flex-col justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-2">Dashboard Real-time</h3>
                <p className="text-muted-foreground mb-8">Kontrol keuanganmu dalam satu dashboard yang powerful</p>
                <div className="space-y-3">
                  <div className="h-2 bg-gradient-to-r from-primary to-accent rounded-full w-3/4 mx-auto" />
                  <div className="h-2 bg-gradient-to-r from-accent to-purple-500 rounded-full w-2/3 mx-auto" />
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-4/5 mx-auto" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
