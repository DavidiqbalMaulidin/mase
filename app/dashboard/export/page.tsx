'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function ExportPage() {
  const [loadingData, setLoadingData] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoadingData(true)

    const { data, error } = await supabase
      .from('transactions')
      .select('*')

    if (error) {
      toast.error('Gagal ambil data')
      setLoadingData(false)
      return
    }

    setTransactions(data || [])
    setLoadingData(false)
  }

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
    if (transactions.length === 0) {
      toast.error('Tidak ada data untuk diexport')
      return
    }

    try {
      setExporting(true)

      toast.loading('Menyiapkan file Excel...', {
        id: 'export-toast',
      })

      // simulasi delay biar terasa "processing"
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const formattedData = formatData(transactions)

      const worksheet = XLSX.utils.json_to_sheet(formattedData)

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions')

      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      })

      const file = new Blob([excelBuffer], {
        type: 'application/octet-stream',
      })

      saveAs(file, `MASE-transactions-${Date.now()}.xlsx`)

      toast.success('Download berhasil 🎉', {
        id: 'export-toast',
      })
    } catch (err) {
      toast.error('Gagal export file')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6">

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Export Data</h1>
        <p className="text-sm text-muted-foreground">
          Download transaksi dalam format Excel rapi
        </p>
      </motion.div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border rounded-2xl bg-card space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Total Data</p>
            <p className="text-sm text-muted-foreground">
              {loadingData ? 'Loading...' : `${transactions.length} transaksi`}
            </p>
          </div>

          <Button onClick={fetchData} variant="outline">
            Refresh
          </Button>
        </div>

        {/* EXPORT BUTTON */}
        <Button
          onClick={exportToExcel}
          disabled={exporting || loadingData}
          className="w-full relative overflow-hidden"
        >
          {exporting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Preparing Excel...
            </div>
          ) : (
            'Download Excel'
          )}
        </Button>

        {/* LOADING BAR ANIMATION */}
        {exporting && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2 }}
            className="h-1 bg-primary rounded-full"
          />
        )}
      </motion.div>
    </div>
  )
}