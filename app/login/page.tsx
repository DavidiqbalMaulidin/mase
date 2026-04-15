'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("🔥 LOGIN PAGE RENDERED")
  }, [])

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (loading) return
    setLoading(true)

    console.log("🔥 LOGIN FUNCTION TRIGGERED")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("📦 SUPABASE RESPONSE:", data)
      console.log("❌ ERROR:", error)

      if (error) {
        toast.error(error.message)
        return
      }

      if (!data?.session) {
        toast.error('Session tidak terbentuk')
        console.log("❌ NO SESSION")
        return
      }

      toast.success('Welcome back!')

      console.log("🚀 REDIRECT START")

      // 🔥 FORCE SYNC SESSION KE COOKIE
      await supabase.auth.getSession()

      // 🔥 WAIT LEBIH AMAN (bukan 150ms doang)
      await new Promise((r) => setTimeout(r, 600))

      // 🔥 HARD NAVIGATION (ANTI MIDDLEWARE BUG)
      window.location.replace('/dashboard')

      console.log("✅ REDIRECT DONE")

    } catch (err: any) {
      console.log("💥 CATCH ERROR:", err)
      toast.error(err.message || 'Login error')
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

          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-primary mb-2">MASE</div>
            <p className="text-muted-foreground text-sm">Welcome back</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <div>
              <label>Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label>Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </motion.div>

    </div>
  )
}