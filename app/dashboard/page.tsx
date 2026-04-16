'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Trash2, Edit2 } from 'lucide-react'

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // 🔥 USER STATE (FIX UTAMA)
  const [user, setUser] = useState<any>(null)
  const hasFetched = useRef(false)

  // 🔥 EDIT STATE
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Other',
    description: '',
  })

  const categories = [
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills & Utilities',
    'Health',
    'Salary',
    'Freelance',
    'Investment',
    'Other',
  ]

  // 🔥 GET USER SEKALI
  useEffect(() => {
    const initUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }

    initUser()
  }, [])

  // 🔥 FETCH SETELAH USER ADA (ANTI DOUBLE FETCH)
  useEffect(() => {
    if (!user || hasFetched.current) return
    hasFetched.current = true

    fetchTransactions()
  }, [user])

  const fetchTransactions = async () => {
    try {
      setLoading(true)

      if (!user) return

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setTransactions(data || [])
      calculateSummary(data || [])
    } catch (error: any) {
      toast.error('Failed to fetch transactions')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const calculateSummary = (txns: any[]) => {
    let totalIncome = 0
    let totalExpense = 0

    txns.forEach((tx) => {
      if (tx.type === 'income') {
        totalIncome += parseFloat(tx.amount)
      } else {
        totalExpense += parseFloat(tx.amount)
      }
    })

    setIncome(totalIncome)
    setExpense(totalExpense)
    setBalance(totalIncome - totalExpense)
  }

  // 🔥 HANDLE EDIT
  const handleEdit = (tx: any) => {
    setFormData({
      title: tx.title,
      amount: tx.amount.toString(),
      type: tx.type,
      category: tx.category,
      description: tx.description || '',
    })

    setEditId(tx.id)
    setIsEdit(true)
    setShowForm(true)
  }

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!user) return

      if (isEdit && editId) {
        const confirmUpdate = window.confirm('Yakin ingin mengupdate transaksi ini?')
        if (!confirmUpdate) return

        const { data, error } = await supabase
          .from('transactions')
          .update({
            title: formData.title,
            amount: parseFloat(formData.amount),
            type: formData.type,
            category: formData.category,
            description: formData.description,
          })
          .eq('id', editId)
          .eq('user_id', user.id)

        console.log('UPDATE RESULT:', data, error)

        if (error) throw error

        toast.success('Transaction updated!')
      } else {
        const { error } = await supabase.from('transactions').insert({
          user_id: user.id,
          title: formData.title,
          amount: parseFloat(formData.amount),
          type: formData.type,
          category: formData.category,
          description: formData.description,
        })

        if (error) throw error

        toast.success('Transaction added!')
      }

      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: 'Other',
        description: '',
      })

      setShowForm(false)
      setIsEdit(false)
      setEditId(null)

      fetchTransactions()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Failed to save transaction')
    }
  }

  const handleDeleteTransaction = async (id: string) => {
    try {
      const confirmDelete = window.confirm('Yakin ingin menghapus transaksi ini?')
      if (!confirmDelete) return

      if (!user) return

      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      toast.success('Transaction deleted')
      fetchTransactions()
    } catch (error: any) {
      console.error(error)
      toast.error('Failed to delete transaction')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <div className="text-xl font-bold text-primary">Loading...</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-900"
        >
          <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
          <p className="text-4xl font-bold text-primary">
            Rp {balance.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {balance >= 0 ? '✓ Positive' : '✗ Negative'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-200 dark:border-green-900"
        >
          <p className="text-sm text-muted-foreground mb-2">Total Income</p>
          <p className="text-4xl font-bold text-green-600">
            Rp {income.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-green-600 mt-2">This month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl p-6 border border-red-200 dark:border-red-900"
        >
          <p className="text-sm text-muted-foreground mb-2">Total Expense</p>
          <p className="text-4xl font-bold text-red-600">
            Rp {expense.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-red-600 mt-2">This month</p>
        </motion.div>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-4">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h3>

          <form onSubmit={handleAddTransaction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <select
              className="border border-input rounded-md px-3 py-2 bg-background"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select
              className="border border-input rounded-md px-3 py-2 bg-background"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Input
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="md:col-span-2"
            />
            <div className="flex gap-2 md:col-span-2">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {isEdit ? 'Update' : 'Add Transaction'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {!showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </motion.div>
      )}

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-bold">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Type</th>
                <th className="px-6 py-3 text-right text-sm font-bold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
                <th className="px-6 py-3 text-center text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4">{tx.title}</td>
                  <td className="px-6 py-4">{tx.category}</td>
                  <td className="px-6 py-4">{tx.type}</td>
                  <td className="px-6 py-4 text-right">Rp {tx.amount}</td>
                  <td className="px-6 py-4">
                    {new Date(tx.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 p-2 rounded transition"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTransaction(tx.id)}
                      className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 p-2 rounded transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}