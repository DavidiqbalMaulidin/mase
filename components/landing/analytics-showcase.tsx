'use client'

import { motion } from 'framer-motion'
import { PieChart, BarChart3, TrendingUp } from 'lucide-react'

export default function AnalyticsShowcase() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-purple-100/5 dark:from-primary/5 dark:via-accent/5 dark:to-purple-950/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Analytics <span className="text-primary">Showcase</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Visualisasi data keuanganmu dengan 3 tipe chart yang powerful
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg">Expense Breakdown</h3>
            </div>
            <div className="flex justify-center mb-6">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="40" strokeDasharray="201 400" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#06b6d4" strokeWidth="40" strokeDasharray="100 400" strokeDashoffset="-201" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#8b5cf6" strokeWidth="40" strokeDasharray="99 400" strokeDashoffset="-301" />
              </svg>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Food</span>
                </div>
                <span className="font-bold">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span>Transport</span>
                </div>
                <span className="font-bold">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Other</span>
                </div>
                <span className="font-bold">35%</span>
              </div>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-5 w-5 text-accent" />
              <h3 className="font-bold text-lg">Monthly Income vs Expense</h3>
            </div>
            <div className="space-y-4">
              {[
                { month: 'Jan', income: 80, expense: 40, incomeColor: '#10b981', expenseColor: '#ef4444' },
                { month: 'Feb', income: 90, expense: 50, incomeColor: '#10b981', expenseColor: '#ef4444' },
                { month: 'Mar', income: 85, expense: 45, incomeColor: '#10b981', expenseColor: '#ef4444' },
              ].map((item, idx) => (
                <div key={idx}>
                  <p className="text-xs font-medium mb-2">{item.month}</p>
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ width: [item.income + '%', item.income + 5 + '%', item.income + '%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-4 rounded-full"
                      style={{ background: item.incomeColor }}
                    />
                    <motion.div
                      animate={{ width: [item.expense + '%', item.expense + 3 + '%', item.expense + '%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="h-4 rounded-full"
                      style={{ background: item.expenseColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 text-xs mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600" />
                <span>Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Expense</span>
              </div>
            </div>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="font-bold text-lg">Cashflow Trend</h3>
            </div>
            <div className="h-32 flex items-end justify-between gap-2">
              {[35, 50, 42, 65, 55, 78, 62, 85, 72].map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: [val + '%', val + 10 + '%', val + '%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-md"
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">Tren cashflow positif selama 9 bulan</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
