'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Password tidak sama')
      return
    }

    try {
      setLoading(true)

      toast.loading('Membuat akun...', { id: 'register' })

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      /**
       * IMPORTANT:
       * Supabase biasanya TIDAK langsung login
       * kalau email confirmation aktif
       */
      if (!data.session) {
        toast.success('Akun dibuat! Cek email untuk verifikasi 🔐', {
          id: 'register',
        })

        setTimeout(() => {
          router.push('/login')
        }, 1200)

        return
      }

      toast.success('Register berhasil 🎉', {
        id: 'register',
      })

      setTimeout(() => {
        router.push('/dashboard')
      }, 800)

    } catch (error: any) {
      toast.error(error.message || 'Gagal membuat akun', {
        id: 'register',
      })
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
              Create your account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">

            <div>
              <label className="text-sm mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>

          {/* FOOTER */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            MASE by @Daveeed_Iqbaaal
          </div>

        </div>
      </motion.div>
    </div>
  )
}