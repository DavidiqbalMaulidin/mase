'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
      setEmail(user?.email || '')
      setLoading(false)
    }

    fetchUser()
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // ❌ prevent spam click
    if (sending) return

    if (!email) {
      toast.error('Email tidak ditemukan')
      return
    }

    try {
      setSending(true)

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      // ✅ success state
      toast.success('📩 Cek email kamu untuk reset password')

    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan')
    } finally {
      // 🔥 selalu reset state di akhir
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-8">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account security
        </p>
      </div>

      {/* PROFILE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border rounded-2xl bg-card space-y-3"
      >
        <h2 className="font-semibold text-lg">Profile</h2>

        <div>
          <label className="text-sm text-muted-foreground">
            Email (read only)
          </label>

          <Input
            value={email}
            disabled
            className="bg-muted cursor-not-allowed"
          />
        </div>
      </motion.div>

      {/* SECURITY */}
      <motion.form
        onSubmit={handleResetPassword}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border rounded-2xl bg-card space-y-4"
      >
        <h2 className="font-semibold text-lg">Security</h2>

        <p className="text-sm text-muted-foreground">
          Kami akan mengirim link reset password ke email kamu
        </p>

        <Button type="submit" disabled={sending}>
          {sending ? 'Mengirim...' : 'Kirim Link Reset Password'}
        </Button>
      </motion.form>
    </div>
  )
}