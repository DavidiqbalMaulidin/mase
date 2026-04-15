'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function ExportPage() {
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])

  // FILTER STATE
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')
  const [filterMonth, setFilterMonth] = useState<string>('all')

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Gagal ambil data')
      setLoading(false)
      return
    }

    setTransactions(data || [])
    setLoading(false)
  }

  // FILTER DATA
  const filteredData = useMemo(() => {
    return transactions.filter((item) => {
      const matchType =
        filterType === 'all' ? true : item.type === filterType

      const itemMonth = new Date(item.created_at).getMonth() + 1

      const matchMonth =
        filterMonth === 'all'
          ? true
          : itemMonth === Number(filterMonth)

      return matchType && matchMonth
    })
  }, [transactions, filterType, filterMonth])

  // SUMMARY
  const summary = useMemo(() => {
    const income = filteredData
      .filter((t) => t.type === 'income')
      .reduce((a, b) => a + b.amount, 0)

    const expense = filteredData
      .filter((t) => t.type === 'expense')
      .reduce((a, b) => a + b.amount, 0)

    return {
      income,
      expense,
      balance: income - expense,
    }
  }, [filteredData])

  const formatData = (data: any[]) => {
    return data.map((item) => ({
      Date: new Date(item.created_at).toLocaleString('id-ID'),
      Title: item.title,
      Type: item.type,
      Category: item.category,
      Amount: item.amount,
      Description: item.description || '-',
    }))
  }

  const exportToExcel = async () => {
    if (filteredData.length === 0) {
      toast.error('Tidak ada data untuk diexport')
      return
    }

    try {
      setExporting(true)

      toast.loading('Menyusun laporan keuangan...', {
        id: 'export',
      })

      await new Promise((r) => setTimeout(r, 1000))

      const worksheet = XLSX.utils.json_to_sheet(
        formatData(filteredData)
      )

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report')

      const file = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      })

      saveAs(
        new Blob([file]),
        `MASE-report-${Date.now()}.xlsx`
      )

      toast.success('Export berhasil 🎉', {
        id: 'export',
      })
    } catch (err) {
      toast.error('Export gagal')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6">

      {/* TITLE */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold">Export Report</h1>
        <p className="text-muted-foreground text-sm">
          Filter & download laporan keuangan kamu
        </p>
      </motion.div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="p-4 border rounded-xl bg-card">
          <p className="text-sm text-muted-foreground">Income</p>
          <p className="text-xl font-bold text-green-500">
            Rp {summary.income.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="p-4 border rounded-xl bg-card">
          <p className="text-sm text-muted-foreground">Expense</p>
          <p className="text-xl font-bold text-red-500">
            Rp {summary.expense.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="p-4 border rounded-xl bg-card">
          <p className="text-sm text-muted-foreground">Balance</p>
          <p className="text-xl font-bold text-primary">
            Rp {summary.balance.toLocaleString('id-ID')}
          </p>
        </div>

      </div>

      {/* FILTER */}
      <div className="flex gap-3 flex-wrap">

        <select
          className="border rounded-lg px-3 py-2 bg-background"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
        >
          <option value="all">All Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2 bg-background"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="all">All Month</option>

          {months.map((m, i) => (
            <option key={i} value={i + 1}>
              {m}
            </option>
          ))}
        </select>

      </div>

      {/* EXPORT CARD */}
      <div className="p-6 border rounded-2xl bg-card space-y-4">

        <p className="text-sm text-muted-foreground">
          Total data: {filteredData.length} transaksi
        </p>

        <Button
          onClick={exportToExcel}
          disabled={exporting}
          className="w-full"
        >
          {exporting ? 'Generating Report...' : 'Download Excel'}
        </Button>

      </div>

    </div>
  )
}