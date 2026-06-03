'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { useRouter, usePathname } from 'next/navigation'

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simple client-side check. In production, this would also verify the token.
        if (!isAuthenticated) {
            router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
        } else {
            setLoading(false)
        }
    }, [isAuthenticated, router, pathname])

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
                color: 'var(--text-secondary)',
                fontFamily: 'Inter, sans-serif'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ marginBottom: 16 }} />
                    <p>Securing your session...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
