'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { toast } from 'sonner'

export default function AnalyticsPage() {
  const [expenseByCategory, setExpenseByCategory] = useState<any[]>([])
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [cashflowData, setCashflowData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#f97316', '#6366f1']

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
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
        .order('created_at', { ascending: true })

      if (error) throw error

      processAnalytics(data || [])
    } catch (error: any) {
      toast.error('Failed to fetch analytics')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const processAnalytics = (transactions: any[]) => {
    // Expense by category
    const categoryMap: Record<string, number> = {}
    transactions
      .filter((tx) => tx.type === 'expense')
      .forEach((tx) => {
        categoryMap[tx.category] = (categoryMap[tx.category] || 0) + parseFloat(tx.amount)
      })

    const expenseData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value: parseFloat(value as unknown as string),
    }))
    setExpenseByCategory(expenseData)

    // Monthly data
    const monthMap: Record<string, { income: number; expense: number }> = {}
    transactions.forEach((tx) => {
      const date = new Date(tx.created_at)
      const monthKey = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })

      if (!monthMap[monthKey]) {
        monthMap[monthKey] = { income: 0, expense: 0 }
      }

      if (tx.type === 'income') {
        monthMap[monthKey].income += parseFloat(tx.amount)
      } else {
        monthMap[monthKey].expense += parseFloat(tx.amount)
      }
    })

    const monthlyDataArray = Object.entries(monthMap).map(([month, data]) => ({
      month,
      Income: data.income,
      Expense: data.expense,
    }))
    setMonthlyData(monthlyDataArray)

    // Cashflow trend (balance over time)
    let runningBalance = 0
    const cashflow: any[] = []
    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        runningBalance += parseFloat(tx.amount)
      } else {
        runningBalance -= parseFloat(tx.amount)
      }
      cashflow.push({
        date: new Date(tx.created_at).toLocaleDateString('id-ID'),
        balance: runningBalance,
      })
    })
    setCashflowData(cashflow.slice(-30)) // Last 30 transactions
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <div className="text-xl font-bold text-primary">Loading analytics...</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart - Expense by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-6">Expense by Category</h2>
          {expenseByCategory.length === 0 ? (
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              No expense data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Bar Chart - Monthly Income vs Expense */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-6">Monthly Income vs Expense</h2>
          {monthlyData.length === 0 ? (
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              No monthly data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                <Legend />
                <Bar dataKey="Income" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Line Chart - Cashflow Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6 lg:col-span-2"
        >
          <h2 className="text-xl font-bold mb-6">Cashflow Trend</h2>
          {cashflowData.length === 0 ? (
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              No cashflow data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>
    </div>
  )
}
