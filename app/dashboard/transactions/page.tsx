'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Trash2, Edit2 } from 'lucide-react'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

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

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setTransactions(data || [])
    } catch (error: any) {
      toast.error('Failed to fetch transactions')
    } finally {
      setLoading(false)
    }
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      if (isEdit && editId) {
        if (!confirm('Yakin mau update transaksi ini?')) return

        const { error } = await supabase
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
      toast.error(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin mau hapus transaksi ini?')) return

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      toast.success('Deleted!')
      fetchTransactions()
    } catch (error: any) {
      toast.error('Failed to delete')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-background text-foreground">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-xl font-bold text-primary">
            Loading...
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-8 min-h-screen bg-background text-foreground">

      <h1 className="text-3xl font-bold mb-6 text-primary">
        Transactions
      </h1>

      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="mb-6 gap-2 bg-primary hover:opacity-90"
        >
          <Plus size={16} /> Add Transaction
        </Button>
      )}

      {/* FORM */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="grid gap-4 mb-8 p-6 rounded-2xl border bg-card border-border"
        >
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <select
            className="border border-border rounded-md px-3 py-2 bg-background text-foreground"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            className="border border-border rounded-md px-3 py-2 bg-background text-foreground"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <Input
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div className="flex gap-2">
            <Button type="submit" className="bg-primary hover:opacity-90">
              {isEdit ? 'Update' : 'Add'}
            </Button>

            <Button
              type="button"
              onClick={() => setShowForm(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      )}

      {/* TABLE */}
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, idx) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-t hover:bg-muted/50"
              >
                <td className="p-3">{tx.title}</td>
                <td className="p-3">{tx.category}</td>
                <td className="p-3">{tx.type}</td>
                <td className="p-3 text-right">
                  Rp {tx.amount}
                </td>
                <td className="p-3">
                  {new Date(tx.created_at).toLocaleDateString('id-ID')}
                </td>

                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(tx)}
                    className="text-primary hover:bg-muted p-2 rounded"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="text-destructive hover:bg-muted p-2 rounded"
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
  )
}