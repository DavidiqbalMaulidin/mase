'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react' // 🔥 ICON

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // 🔥 STATE SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    console.log('🔥 LOGIN PAGE RENDERED')
  }, [])

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (loading) return

    // 🔥 VALIDASI
    if (!email || !password) {
      toast.error('Email dan password wajib diisi')
      return
    }

    setLoading(true)
    console.log('🔥 LOGIN FUNCTION TRIGGERED')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('📦 SUPABASE RESPONSE:', data)
      console.log('❌ ERROR:', error)

      if (error) {
        // 🔥 HANDLE ERROR LEBIH AMAN (IMPROVED)
        const msg = error?.message?.toLowerCase?.() || ''

        if (msg.includes('invalid login credentials')) {
          toast.error('Email atau password salah')
        } else if (msg.includes('email not confirmed')) {
          toast.error('Email belum dikonfirmasi, cek inbox Anda')
        } else if (msg.includes('too many requests')) {
          toast.error('Terlalu banyak percobaan, coba lagi nanti')
        } else {
          toast.error(error.message || 'Login gagal, silakan coba lagi')
        }

        return
      }

      if (!data?.session) {
        toast.error('Session tidak terbentuk')
        return
      }

      toast.success('Login berhasil')

      console.log('🚀 SYNC SESSION')

      await supabase.auth.getUser()

      window.location.href = '/dashboard'

    } catch (err: any) {
      console.log('💥 CATCH ERROR:', err)
      toast.error(err?.message || 'Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-primary mb-2">
              MASE
            </div>
            <p className="text-muted-foreground text-sm">
              Welcome back
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="text-sm block mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* 🔥 PASSWORD + ICON */}
            <div>
              <label className="text-sm block mb-1">Password</label>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>
      </motion.div>

    </div>
  )
}