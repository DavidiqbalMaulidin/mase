'use client'

import { motion } from 'framer-motion'

interface SummaryCardsProps {
  totalBalance: number
  totalIncome: number
  totalExpense: number
  savingsRate: number
}

export function SummaryCards({
  totalBalance,
  totalIncome,
  totalExpense,
  savingsRate,
}: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Balance',
      value: `Rp ${totalBalance.toLocaleString('id-ID')}`,
      icon: '💰',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Total Income',
      value: `Rp ${totalIncome.toLocaleString('id-ID')}`,
      icon: '📈',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Total Expense',
      value: `Rp ${totalExpense.toLocaleString('id-ID')}`,
      icon: '📉',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: '🎯',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${card.bgColor} rounded-xl p-6 border border-border`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {card.title}
            </h3>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <p className={`text-2xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
            {card.value}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
