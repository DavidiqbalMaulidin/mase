'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

export default function AIAssistantPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)

      if (!user) return

      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)

      setTransactions(data || [])
    }

    init()
  }, [])

  const askAI = async () => {
    if (!input.trim()) return

    const userText = input
    setInput('')

    const updatedMessages = [
      ...messages,
      { role: 'user', content: userText },
    ]

    setMessages(updatedMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/grok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `
Anda adalah MASE (Money Assistant Smart Engine), asisten keuangan digital yang dibuat oleh @Daveeed_Iqbaaal.

KONTEKS PERCAKAPAN:
${updatedMessages.map((m) => `${m.role}: ${m.content}`).join('\n')}

ATURAN CERDAS:

1. PAHAMI KONTEKS:
- Jika user berkata "mau", "iya", "lanjut", itu berarti melanjutkan jawaban sebelumnya
- Jangan ulang dari awal
- Jangan kembali ke sapaan

2. GAYA KOMUNIKASI:
- Santai, natural, tapi tetap profesional
- Tidak alay, tidak kaku
- Jangan gunakan kata seperti "lah", "kayaknya", dll
- Gunakan bahasa yang rapi

3. JIKA DIMINTA DETAIL:
- Tampilkan data dengan rapi
- Gunakan format list atau ringkasan
- Jangan acak atau campur pemasukan & pengeluaran tanpa struktur

4. ANALISIS KEUANGAN:
- Jika ditanya pengeluaran terbesar → jawab kategori + jumlah
- Jika diminta detail → tampilkan breakdown
- Jika kondisi buruk → beri saran
- Jika bagus → beri apresiasi (natural)

5. JANGAN:
- Mengulang sapaan terus
- Memberi jawaban yang tidak nyambung
- Mengarang data

DATA TRANSAKSI:
${JSON.stringify(transactions)}

PERTANYAAN TERAKHIR USER:
${userText}
          `,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Gagal mengambil respon AI')
      }

      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: data.reply },
      ])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Terjadi kesalahan: ' + err.message },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">MASE AI Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Analisis keuangan berbasis data transaksi Anda
        </p>
      </div>

      {/* CHAT BOX */}
      <div className="bg-card border border-border rounded-2xl p-6 h-[500px] overflow-y-auto space-y-3 mb-4">

        {messages.length === 0 && (
          <div className="text-sm text-muted-foreground">
            MASE siap membantu analisis keuangan Anda.
            <div className="mt-2 text-foreground font-medium">
              Contoh: "Pengeluaran terbesar saya di mana?"
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[70%] px-4 py-3 rounded-xl text-sm ${
              m.role === 'user'
                ? 'bg-primary text-primary-foreground ml-auto'
                : 'bg-muted'
            }`}
          >
            {m.content}
          </motion.div>
        ))}

        {loading && (
          <p className="text-sm text-muted-foreground">
            Memproses analisis...
          </p>
        )}
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          className="flex-1 border border-border bg-background rounded-md px-3 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan kondisi keuangan Anda..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') askAI()
          }}
        />

        <button
          onClick={askAI}
          className="bg-primary text-primary-foreground px-4 rounded-md text-sm font-medium hover:opacity-90 transition"
        >
          Kirim
        </button>
      </div>
    </div>
  )
}