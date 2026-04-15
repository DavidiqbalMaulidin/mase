'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        toast.error('Session error')
      }

      setLoading(false)
    }

    handleSession()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!password) {
        toast.error('Password tidak boleh kosong')
        return
      }

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      toast.success('Password berhasil diubah')

      await supabase.auth.signOut()

      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">

      <form
        onSubmit={handleUpdatePassword}
        className="w-full max-w-md space-y-4 p-6 border rounded-2xl bg-card"
      >
        <h1 className="text-2xl font-bold">Reset Password</h1>

        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className="w-full">
          Update Password
        </Button>
      </form>

    </div>
  )
}