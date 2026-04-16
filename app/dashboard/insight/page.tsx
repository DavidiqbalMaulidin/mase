'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function InsightPage() {
  const [loading, setLoading] = useState(true)
  const [insights, setInsights] = useState<string[]>([])

  const [expenseData, setExpenseData] = useState<any[]>([])
  const [incomeData, setIncomeData] = useState<any[]>([])

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    totalTransactions: 0,
  })

  useEffect(() => {
    fetchInsight()
  }, [])

  const fetchInsight = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error

      generateInsight(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const generateInsight = (transactions: any[]) => {
    let income = 0
    let expense = 0

    const expenseMap: Record<string, number> = {}
    const incomeMap: Record<string, number> = {}

    transactions.forEach((tx) => {
      const amount = Number(tx.amount)

      if (tx.type === 'income') {
        income += amount
        incomeMap[tx.category] =
          (incomeMap[tx.category] || 0) + amount
      } else {
        expense += amount
        expenseMap[tx.category] =
          (expenseMap[tx.category] || 0) + amount
      }
    })

    const balance = income - expense

    const expenseChart = Object.entries(expenseMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    )

    const incomeChart = Object.entries(incomeMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    )

    setExpenseData(expenseChart)
    setIncomeData(incomeChart)

    setSummary({
      income,
      expense,
      balance,
      totalTransactions: transactions.length,
    })

    // 🔥 INSIGHT LOGIC (ditambah)
    const result: string[] = []

    const savingRate =
      income > 0 ? (balance / income) * 100 : 0

    if (expense > income) {
      result.push('⚠️ Pengeluaran lebih besar dari pemasukan.')
    } else {
      result.push('✅ Kondisi keuangan kamu masih sehat.')
    }

    if (savingRate < 10) {
      result.push('💡 Saving rate kamu sangat rendah (<10%).')
    } else if (savingRate < 30) {
      result.push('📊 Saving cukup, tapi masih bisa ditingkatkan.')
    } else {
      result.push('🔥 Saving kamu sudah sangat baik.')
    }

    // top expense category
    let topExpense = ''
    let maxExpense = 0

    expenseChart.forEach((c) => {
      if (c.value > maxExpense) {
        maxExpense = c.value
        topExpense = c.name
      }
    })

    if (topExpense) {
      result.push(`📌 Pengeluaran terbesar di ${topExpense}`)
    }

    setInsights(result)
  }

  const COLORS = [
    '#6366F1',
    '#22C55E',
    '#F97316',
    '#EF4444',
    '#14B8A6',
    '#A855F7',
    '#EAB308',
  ]

  const formatRupiah = (value: number) =>
    `Rp ${value.toLocaleString('id-ID')}`

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Memuat insight keuangan...
      </div>
    )
  }

  return (
    <div className="p-8 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-primary">
          🧠 Insight Keuangan
        </h1>
        <p className="text-muted-foreground">
          Analisis otomatis dari seluruh aktivitas finansial
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-xl bg-card">
          <p>Pemasukan</p>
          <p className="font-bold text-green-500">
            {formatRupiah(summary.income)}
          </p>
        </div>

        <div className="p-4 border rounded-xl bg-card">
          <p>Pengeluaran</p>
          <p className="font-bold text-red-500">
            {formatRupiah(summary.expense)}
          </p>
        </div>

        <div className="p-4 border rounded-xl bg-card">
          <p>Saldo</p>
          <p className="font-bold">
            {formatRupiah(summary.balance)}
          </p>
        </div>

        <div className="p-4 border rounded-xl bg-card">
          <p>Total Transaksi</p>
          <p className="font-bold">
            {summary.totalTransactions}
          </p>
        </div>
      </div>

      {/* INSIGHT */}
      <div className="grid gap-4">
        {insights.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border rounded-xl bg-card"
          >
            {text}
          </motion.div>
        ))}
      </div>

      {/* EXPENSE CHART */}
      <div className="p-5 border rounded-xl bg-card">
        <h2 className="font-semibold mb-4">
          📉 Pengeluaran per Kategori
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-center">

          <div className="w-full md:w-1/2 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={95}
                  label
                >
                  {expenseData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatRupiah(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2 space-y-2">
            {expenseData.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>{item.name}</span>
                <span>{formatRupiah(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INCOME CHART (NEW) */}
      <div className="p-5 border rounded-xl bg-card">
        <h2 className="font-semibold mb-4">
          💰 Pemasukan per Kategori
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-center">

          <div className="w-full md:w-1/2 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={95}
                  label
                >
                  {incomeData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatRupiah(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2 space-y-2">
            {incomeData.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>{item.name}</span>
                <span className="text-green-500">
                  {formatRupiah(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}