'use client'

import { motion } from 'framer-motion'

export default function DemoPreview() {
  return (
    <section id="demo" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Live Dashboard <span className="text-primary">Preview</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lihat seperti apa dashboard MASE dalam aksi. Hover untuk interaksi, klik untuk detail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Dashboard mockup */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border px-8 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Financial Dashboard</h3>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-900"
                >
                  <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
                  <p className="text-3xl font-bold text-primary">Rp 12.5M</p>
                  <p className="text-xs text-green-600 mt-2">↑ 12% dari bulan lalu</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-200 dark:border-green-900"
                >
                  <p className="text-sm text-muted-foreground mb-2">Total Income</p>
                  <p className="text-3xl font-bold text-green-600">Rp 8.0M</p>
                  <p className="text-xs text-green-600 mt-2">Bulan ini</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl p-6 border border-red-200 dark:border-red-900"
                >
                  <p className="text-sm text-muted-foreground mb-2">Total Expense</p>
                  <p className="text-3xl font-bold text-red-600">Rp 3.2M</p>
                  <p className="text-xs text-red-600 mt-2">↓ 8% dari bulan lalu</p>
                </motion.div>
              </div>

              {/* Chart Preview */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-border mb-8">
                <h4 className="font-bold mb-4">Expense Breakdown</h4>
                <div className="flex items-end gap-4 h-40">
                  <motion.div animate={{ height: ['60%', '70%', '60%'] }} transition={{ duration: 2, repeat: Infinity }} className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg" />
                  <motion.div animate={{ height: ['75%', '85%', '75%'] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="flex-1 bg-gradient-to-t from-accent to-accent/50 rounded-t-lg" />
                  <motion.div animate={{ height: ['45%', '55%', '45%'] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="flex-1 bg-gradient-to-t from-purple-500 to-purple-500/50 rounded-t-lg" />
                  <motion.div animate={{ height: ['65%', '75%', '65%'] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="flex-1 bg-gradient-to-t from-pink-500 to-pink-500/50 rounded-t-lg" />
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h4 className="font-bold mb-4">Recent Transactions</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Makan siang', amount: '-Rp 85K', category: 'Food', color: 'bg-orange-100' },
                    { title: 'Gaji bulanan', amount: '+Rp 5M', category: 'Salary', color: 'bg-green-100' },
                    { title: 'Transport', amount: '-Rp 45K', category: 'Transport', color: 'bg-red-100' },
                  ].map((tx, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full ${tx.color}`} />
                      <div className="flex-1 ml-3">
                        <p className="text-sm font-medium">{tx.title}</p>
                        <p className="text-xs text-muted-foreground">{tx.category}</p>
                      </div>
                      <p className={`font-semibold ${tx.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                        {tx.amount}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
