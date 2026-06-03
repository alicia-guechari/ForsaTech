'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { Eye, EyeOff, Zap, ArrowRight, Check } from 'lucide-react'

const WILAYAS = ['Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Meniaa']

export default function OdejSignUpPage() {
    const [showPass, setShowPass] = useState(false)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', password: '', wilaya: '' })
    const router = useRouter()
    const setAuth = useAuthStore(state => state.setAuth)

    const createAvatar = (name: string) => {
        return name
            .split(' ')
            .filter(Boolean)
            .map(part => part[0]?.toUpperCase())
            .join('')
            .slice(0, 2)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const user = {
            id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: form.name.trim() || 'ODEJ Partner',
            email: form.email.trim(),
            role: 'odej',
            avatar: createAvatar(form.name || form.email),
            wilaya: form.wilaya || 'Unknown',
        }

        setAuth(user, btoa(`${form.email}:${Date.now()}`))
        setSuccess(true)
        setTimeout(() => router.push('/odej'), 900)
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
                <div style={{
                    position: 'absolute',
                    top: '30%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500, height: 500,
                    background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div className="glass" style={{ width: '100%', maxWidth: 520, padding: 40, zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <div style={{
                            width: 52, height: 52,
                            background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <Zap size={24} color="white" strokeWidth={2.5} />
                        </div>
                        <h1 style={{ fontSize: 24, marginBottom: 4, color: '#f8f8ff' }}>ODEJ Sign Up</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Create your ODEJ account to manage opportunities locally.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        {success && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 24 }}>
                                <div style={{ width: 72, height: 72, borderRadius: 999, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Check size={36} color="#059669" />
                                </div>
                                <h2 style={{ color: '#10b981', margin: 0 }}>Account created</h2>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Redirecting you to the ODEJ dashboard…</p>
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                                ODEJ center name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="ODEJ Béjaïa"
                                value={form.name}
                                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                className="input-dark"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="odej@domain.dz"
                                value={form.email}
                                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                                className="input-dark"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    required
                                    placeholder="Min 8 characters"
                                    value={form.password}
                                    onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                                    className="input-dark"
                                    style={{ paddingRight: 44 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(prev => !prev)}
                                    style={{
                                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                                        display: 'flex', alignItems: 'center',
                                    }}>
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                                Wilaya
                            </label>
                            <select
                                required
                                value={form.wilaya}
                                onChange={e => setForm(prev => ({ ...prev, wilaya: e.target.value }))}
                                className="input-dark"
                                style={{ appearance: 'none' }}
                            >
                                <option value="">Select your wilaya…</option>
                                {WILAYAS.map(wilaya => (
                                    <option key={wilaya} value={wilaya}>{wilaya}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                            Create ODEJ Account <ArrowRight size={16} />
                        </button>
                    </form>

                    <div className="divider" style={{ margin: '24px 0' }} />

                    <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
                        Already registered?{' '}
                        <Link href="/odej/signin" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
                    </p>

                    <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 12 }}>
                        Looking for general youth access?{' '}
                        <Link href="/auth/signin" style={{ color: '#a78bfa', textDecoration: 'none' }}>User Sign In →</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
