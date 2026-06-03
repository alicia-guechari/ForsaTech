'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { Eye, EyeOff, Zap, ArrowRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
    const [showPass, setShowPass] = useState(false)
    const [form, setForm] = useState({ email: '', password: '' })
    const router = useRouter()
    const setAuth = useAuthStore(state => state.setAuth)
    const [success, setSuccess] = useState(false)

    const formatName = (email: string) => {
        const userPart = email.split('@')[0] || 'User'
        return userPart
            .split(/[._-]+/)
            .filter(Boolean)
            .map(word => word[0]?.toUpperCase() + word.slice(1))
            .join(' ') || 'ForsaTech User'
    }

    const createAvatar = (name: string) => {
        return name
            .split(' ')
            .filter(Boolean)
            .map(part => part[0]?.toUpperCase())
            .join('')
            .slice(0, 2)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const name = formatName(form.email)
        const user = {
            id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name,
            email: form.email.trim(),
            role: 'youth',
            avatar: createAvatar(name),
            wilaya: 'Unknown',
        }

        setAuth(user, btoa(`${form.email}:${Date.now()}`))
        setSuccess(true)
        setTimeout(() => router.push('/profile'), 700)
    }

    return (
        <main>
            <Navbar />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '100px 24px 60px',
            }}>
                {/* Glow backdrop */}
                <div style={{
                    position: 'absolute',
                    top: '30%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500, height: 500,
                    background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div className="glass" style={{ width: '100%', maxWidth: 440, padding: 40, zIndex: 1 }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <div style={{
                            width: 52, height: 52,
                            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <Zap size={24} color="white" strokeWidth={2.5} />
                        </div>
                        <h1 style={{ fontSize: 24, marginBottom: 6, color: '#f8f8ff' }}>Welcome back</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Sign in to your ForsaTech account</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {success && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 24 }}>
                                <div style={{ width: 64, height: 64, borderRadius: 999, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Check size={34} color="#059669" />
                                </div>
                                <h2 style={{ color: '#10b981', margin: 0 }}>Signed in</h2>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Taking you to your profile…</p>
                            </div>
                        )}
                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className="input-dark"
                            />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
                                <Link href="/auth/forgot" style={{ fontSize: 13, color: '#a78bfa', textDecoration: 'none' }}>Forgot?</Link>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="input-dark"
                                    style={{ paddingRight: 44 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(p => !p)}
                                    style={{
                                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                                        display: 'flex', alignItems: 'center',
                                    }}
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
                            Sign In <ArrowRight size={16} />
                        </button>
                    </form>

                    <div className="divider" style={{ margin: '24px 0' }} />

                    <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
                        Don't have an account?{' '}
                        <Link href="/auth/signup" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Create one</Link>
                    </p>

                    <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 12 }}>
                        Are you an ODEJ?{' '}
                        <Link href="/odej/signin" style={{ color: '#60a5fa', textDecoration: 'none' }}>ODEJ Login →</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
