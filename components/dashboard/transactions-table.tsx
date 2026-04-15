'use client'

import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

interface Transaction {
  id: string
  title: string
  amount: number
  type: 'income' | 'expense'
  category: string
  created_at: string
}

interface TransactionsTableProps {
  transactions: Transaction[]
  onDelete: (id: string) => Promise<void>
}

export function TransactionsTable({
  transactions,
  onDelete,
}: TransactionsTableProps) {
  const handleDelete = async (id: string) => {
    if (confirm('Hapus transaksi ini?')) {
      await onDelete(id)
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No transactions yet. Start by adding one!</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-sm">Title</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
            <th className="text-right py-3 px-4 font-semibold text-sm">Amount</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
            <th className="text-center py-3 px-4 font-semibold text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <motion.tr
              key={transaction.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-border hover:bg-muted/50 transition"
            >
              <td className="py-3 px-4">
                <p className="font-medium">{transaction.title}</p>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-muted-foreground">
                  {transaction.category}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span
                  className={`font-semibold ${
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}Rp{' '}
                  {transaction.amount.toLocaleString('id-ID')}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-muted-foreground">
                  {new Date(transaction.created_at).toLocaleDateString('id-ID')}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-950 rounded-lg transition text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
