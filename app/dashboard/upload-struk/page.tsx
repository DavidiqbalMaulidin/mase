'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Tesseract from 'tesseract.js'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function UploadStrukPage() {
  const [image, setImage] = useState<File | null>(null)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [ocrProgress, setOcrProgress] = useState(0)
  const [successPopup, setSuccessPopup] = useState(false)

  const defaultCategories = [
    'Food & Drinks',
    'Transportation',
    'Shopping',
    'Bills & Utilities',
    'Entertainment',
    'Health',
    'Salary',
    'Investment',
    'Other'
  ]

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user

    if (!user) {
      setCategories(defaultCategories)
      return
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('category')
      .eq('user_id', user.id)

    if (error || !data) {
      setCategories(defaultCategories)
      return
    }

    const dbCats: string[] = []
    for (const item of data as any[]) {
      if (item?.category) dbCats.push(String(item.category))
    }

    setCategories([...new Set([...defaultCategories, ...dbCats])])
  }

  // =============================
  // 🔥 FIX TITLE (REAL STORE NAME)
  // =============================
  const extractTitle = (text: string) => {
    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)

    if (!lines.length) return 'Receipt Upload'

    const blacklist = [
      'total', 'cash', 'change', 'grand',
      'ppn', 'tax', 'date', 'struk',
      'receipt', 'subtotal'
    ]

    for (const line of lines.slice(0, 6)) {
      const lower = line.toLowerCase()

      if (
        line.length >= 3 &&
        line.length <= 30 &&
        !blacklist.some(b => lower.includes(b)) &&
        !/\d{3,}/.test(line)
      ) {
        return line
      }
    }

    return 'Receipt Upload'
  }

  // =============================
  // 🔥 FIX AMOUNT (INDO STRUK READY)
  // =============================
  const extractTotal = (text: string) => {
    const clean = text
      .toLowerCase()
      .replace(/,/g, '')
      .replace(/\r/g, '\n')

    const lines = clean.split('\n')

    const keywords = [
      'grand total',
      'total bayar',
      'total belanja',
      'total',
      'amount due'
    ]

    let found: number | null = null

    // STEP 1: cari berdasarkan keyword
    for (let i = lines.length - 1; i >= 0; i--) {
      for (const k of keywords) {
        if (lines[i].includes(k)) {
          const match = lines[i].match(/\d+/g)
          if (match) {
            found = Number(match[match.length - 1])
            break
          }
        }
      }
      if (found) break
    }

    // STEP 2: fallback ambil angka TERBESAR
    if (!found) {
      const nums = clean.match(/\d+/g)
      if (!nums) return ''
      found = Math.max(...nums.map(n => Number(n)))
    }

    return found.toString()
  }

  // =============================
  // OCR ENGINE
  // =============================
  const runOCR = async (file: File) => {
    setLoading(true)
    setOcrProgress(0)

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100))
          }
        }
      })

      const text = result.data.text

      console.log('OCR TEXT:', text)

      const detectedTitle = extractTitle(text)
      const detectedAmount = extractTotal(text)

      console.log('TITLE:', detectedTitle)
      console.log('AMOUNT:', detectedAmount)

      setTitle(detectedTitle)
      setAmount(detectedAmount)

      toast.success('OCR berhasil dibaca!')

    } catch (err) {
      console.error(err)
      toast.error('OCR gagal')
    } finally {
      setLoading(false)
    }
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(file)
    await runOCR(file)
  }

  const handleSubmit = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user

      if (!user) return

      const cleanAmount = Number(amount.replace(/[^0-9]/g, ''))

      if (!cleanAmount || !category) {
        toast.error('Amount & Category wajib diisi')
        return
      }

      setSaving(true)

      const { error } = await supabase.from('transactions').insert({
        user_id: user.id,
        title: title || 'Receipt Upload',
        amount: cleanAmount,
        type: 'expense',
        category,
        description: 'OCR Upload Receipt',
      })

      if (error) throw error

      setAmount('')
      setCategory('')
      setTitle('')
      setImage(null)
      setOcrProgress(0)

      setSuccessPopup(true)
      setTimeout(() => setSuccessPopup(false), 2500)

      toast.success('Berhasil ditambahkan!')

    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-background text-foreground">

      <motion.h1 className="text-2xl font-bold">
        Upload Struk OCR
      </motion.h1>

      <AnimatePresence>
        {successPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            ✅ Berhasil ditambahkan!
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPLOAD */}
      <div className="border-2 border-dashed p-6 rounded-xl bg-card dark:bg-gray-900">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFile}
        />

        {loading && (
          <p className="mt-2 text-sm text-muted-foreground">
            OCR {ocrProgress}%
          </p>
        )}
      </div>

      {/* TITLE */}
      <input
        className="w-full p-3 border rounded bg-background dark:bg-gray-900"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nama toko"
      />

      {/* AMOUNT */}
      <input
        className="w-full p-3 border rounded bg-background dark:bg-gray-900"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      {/* CATEGORY */}
      <select
        className="w-full p-3 border rounded bg-background dark:bg-gray-900"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Pilih kategori</option>
        {categories.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading || saving}
        className={`w-full py-3 rounded text-white font-medium ${
          loading || saving ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
        }`}
      >
        {saving ? 'Saving...' : 'Add Pengeluaran'}
      </button>

    </div>
  )
}