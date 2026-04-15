'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type BudgetItem = {
  id?: string
  category: string
  limit: number
}

const FIXED_CATEGORIES = [
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

export default function BudgetPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [budgets, setBudgets] = useState<BudgetItem[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState('')
  const [newLimit, setNewLimit] = useState('')
  const [editIndex, setEditIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchTransactions()
    fetchBudgets()

    const onFocus = () => {
      fetchTransactions()
      fetchBudgets()
    }

    window.addEventListener('focus', onFocus)

    const channel = supabase
      .channel('budget-realtime-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => fetchTransactions()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'budgets' },
        () => fetchBudgets()
      )
      .subscribe()

    return () => {
      window.removeEventListener('focus', onFocus)
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)

      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user
      if (!user) return

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error

      setTransactions(data || [])
    } catch {
      toast.error('Gagal ambil transaksi')
    } finally {
      setLoading(false)
    }
  }

  const fetchBudgets = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) return

    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', user.id)

    if (error) {
      toast.error(error.message)
      return
    }

    setBudgets(data || [])
  }

  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s/g, '')

  const spending = useMemo(() => {
    const result: Record<string, number> = {}

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const key = normalize(t.category)
        result[key] = (result[key] || 0) + Number(t.amount)
      })

    return result
  }, [transactions])

  // ========================
  // STATUS LOGIC
  // ========================
  const getStatus = (percent: number) => {
    if (percent > 100) return 'OVER'
    if (percent >= 80) return 'WARNING'
    return 'SAFE'
  }

  const getBadge = (status: string) => {
    switch (status) {
      case 'OVER':
        return 'bg-red-500 text-white'
      case 'WARNING':
        return 'bg-yellow-400 text-black'
      default:
        return 'bg-green-500 text-white'
    }
  }

  const getText = (status: string) => {
    if (status === 'OVER') return '❌ LEWAT LIMIT'
    if (status === 'WARNING') return '⚠️ HATI-HATI MENDEKATI LIMIT'
    return '✅ AMAN'
  }

  // ========================
  // SAVE / UPDATE
  // ========================
  const handleSaveBudget = async () => {
    if (!selectedCategory || !newLimit) {
      toast.error('Isi lengkap dulu')
      return
    }

    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) return

    const payload = {
      user_id: user.id,
      category: selectedCategory,
      limit: Number(newLimit),
    }

    try {
      if (editIndex !== null) {
        const id = budgets[editIndex]?.id
        if (!id) return

        const { error } = await supabase
          .from('budgets')
          .update(payload)
          .eq('id', id)

        if (error) throw error

        toast.success('Budget diupdate')
      } else {
        const { error } = await supabase
          .from('budgets')
          .insert([payload])

        if (error) throw error

        toast.success('Budget ditambahkan')
      }

      setSelectedCategory('')
      setNewLimit('')
      setEditIndex(null)

      fetchBudgets()
    } catch (err: any) {
      toast.error(err.message || 'Error')
    }
  }

  // ========================
  // CONFIRM EDIT
  // ========================
  const handleEdit = (b: BudgetItem, index: number) => {
    const ok = confirm(`Edit budget kategori "${b.category}"?`)
    if (!ok) return

    setSelectedCategory(b.category)
    setNewLimit(String(b.limit))
    setEditIndex(index)
  }

  // ========================
  // CONFIRM DELETE
  // ========================
  const handleDelete = async (id?: string) => {
    if (!id) return

    const ok = confirm('Yakin mau hapus budget ini?')
    if (!ok) return

    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Budget dihapus')
    fetchBudgets()
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground animate-pulse">
          Loading budget...
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6">

      <h1 className="text-2xl font-bold">Budget Tracker</h1>

      {/* FORM */}
      <div className="p-4 border rounded-xl space-y-3">

        {/* FIX DARK MODE SELECT */}
        <select
          className="border p-2 rounded bg-background text-foreground"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Pilih Category</option>

          {FIXED_CATEGORIES.map((c) => (
            <option
              key={c}
              value={c}
              className="bg-background text-foreground"
            >
              {c}
            </option>
          ))}
        </select>

        <Input
          type="number"
          placeholder="Budget limit"
          value={newLimit}
          onChange={(e) => setNewLimit(e.target.value)}
        />

        <Button onClick={handleSaveBudget}>
          {editIndex !== null ? 'Update' : 'Add'}
        </Button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {budgets.map((b, i) => {
          const spent = spending[normalize(b.category)] || 0
          const percent = b.limit > 0 ? (spent / b.limit) * 100 : 0

          const status = getStatus(percent)

          return (
            <motion.div
              key={b.id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-xl space-y-3"
            >

              <div className="flex justify-between items-center">

                <b>{b.category}</b>

                <span className={`text-xs px-2 py-1 rounded ${getBadge(status)}`}>
                  {status}
                </span>
              </div>

              <div className="text-xs font-semibold">
                {getText(status)}
              </div>

              {/* ACTION */}
              <div className="flex gap-3 text-xs">
                <button
                  onClick={() => handleEdit(b, i)}
                  className="text-blue-500 hover:underline"
                >
                  edit
                </button>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="text-red-500 hover:underline"
                >
                  delete
                </button>
              </div>

              <p className="text-sm">
                Rp {spent.toLocaleString('id-ID')} / Rp{' '}
                {Number(b.limit).toLocaleString('id-ID')}
              </p>

              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 ${
                    status === 'OVER'
                      ? 'bg-red-500'
                      : status === 'WARNING'
                      ? 'bg-yellow-400'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                />
              </div>

              <p className="text-xs">{percent.toFixed(0)}%</p>

            </motion.div>
          )
        })}
      </div>
    </div>
  )
}