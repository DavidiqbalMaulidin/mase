'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Trash2, Edit2, Search } from 'lucide-react'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')
  const [filterCategory, setFilterCategory] = useState('all')

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
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setTransactions(data || [])
    } catch {
      toast.error('Failed to fetch transactions')
    } finally {
      setLoading(false)
    }
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.title.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase())

      const matchType =
        filterType === 'all' ? true : tx.type === filterType

      const matchCategory =
        filterCategory === 'all' ? true : tx.category === filterCategory

      return matchSearch && matchType && matchCategory
    })
  }, [transactions, search, filterType, filterCategory])

  // 🔥 EDIT + WARNING
  const handleEdit = (tx: any) => {
    const confirmEdit = confirm('⚠️ Mau edit transaksi ini?')
    if (!confirmEdit) return

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
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      if (isEdit && editId) {
        const confirmUpdate = confirm('⚠️ Yakin ingin UPDATE transaksi ini?')
        if (!confirmUpdate) return

        await supabase
          .from('transactions')
          .update({
            title: formData.title,
            amount: Number(formData.amount),
            type: formData.type,
            category: formData.category,
            description: formData.description,
          })
          .eq('id', editId)
          .eq('user_id', user.id)

        toast.success('Updated!')
      } else {
        await supabase.from('transactions').insert({
          user_id: user.id,
          title: formData.title,
          amount: Number(formData.amount),
          type: formData.type,
          category: formData.category,
          description: formData.description,
        })

        toast.success('Added!')
      }

      setShowForm(false)
      setIsEdit(false)
      setEditId(null)

      fetchTransactions()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  // 🔥 DELETE + WARNING
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('⚠️ Yakin mau HAPUS transaksi ini?')
    if (!confirmDelete) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    toast.success('Deleted!')
    fetchTransactions()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-primary animate-pulse text-xl font-bold">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-bold text-primary">
        Transactions
      </h1>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-3">

        <div className="flex items-center border rounded-lg px-3 bg-card">
          <Search size={16} />
          <Input
            placeholder="Search transaksi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none focus-visible:ring-0"
          />
        </div>

        <select
          className="border rounded-lg px-3 py-2 bg-background text-foreground dark:bg-card dark:text-foreground"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
        >
          <option value="all">All Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2 bg-background text-foreground dark:bg-card dark:text-foreground"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

      </div>

      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={16} /> Add Transaction
        </Button>
      )}

      {/* FORM */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="grid gap-3 p-6 border rounded-xl bg-card"
        >
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />

          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="border p-2 rounded bg-background text-foreground dark:bg-card"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="border p-2 rounded bg-background text-foreground dark:bg-card"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <Input
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex gap-2">
            <Button type="submit">
              {isEdit ? 'Update' : 'Add'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      )}

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden bg-card">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-t">

                <td className="p-3">{tx.title}</td>
                <td className="p-3">{tx.category}</td>
                <td className="p-3">{tx.type}</td>
                <td className="p-3 text-right">Rp {tx.amount}</td>

                {/* 🔥 ACTION COLOR + HOVER */}
                <td className="p-3 flex gap-2 justify-center">

                  <button
                    onClick={() => handleEdit(tx)}
                    className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 p-2 rounded transition"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 p-2 rounded transition"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}