'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AuthGuard } from '@/components/AuthGuard'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { ArrowLeft, Check, MapPin, Mail, User, Zap } from 'lucide-react'

const WILAYAS = ['Alger', 'Béjaïa', 'Constantine', 'Oran', 'Sétif', 'Annaba', 'Tizi Ouzou']
const INTERESTS = ['Technology', 'Environment', 'Sports', 'Volunteering', 'Arts', 'Culture', 'Leadership', 'Entrepreneurship', 'Training']

export default function ProfileEditPage() {
    const router = useRouter()
    const { user, token, setAuth } = useAuthStore()
    const [form, setForm] = useState({
        name: '',
        email: '',
        wilaya: '',
        interests: [] as string[],
    })
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!user) return
        setForm({
            name: user.name,
            email: user.email,
            wilaya: user.wilaya || '',
            interests: user.interests || [],
        })
    }, [user])

    const toggleInterest = (interest: string) => {
        setForm(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest],
        }))
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!user) return

        const updatedUser = {
            ...user,
            name: form.name.trim() || user.name,
            email: form.email.trim() || user.email,
            wilaya: form.wilaya || user.wilaya,
            interests: form.interests,
        }

        setAuth(updatedUser, token ?? '')
        setSuccess(true)
        setTimeout(() => router.push('/profile'), 900)
    }

    return (
        <AuthGuard>
            <main>
                <Navbar />
                <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                    <div className="container-page" style={{ maxWidth: 720 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                            <button onClick={() => router.push('/profile')} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                <ArrowLeft size={16} /> Back to Profile
                            </button>
                        </div>

                        <div className="glass" style={{ padding: 36 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                <div style={{ width: 52, height: 52, borderRadius: 18, background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Zap size={24} color="white" />
                                </div>
                                <div>
                                    <h1 style={{ fontSize: 28, margin: 0 }}>Edit Profile</h1>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Update your personal details and interests.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                {success && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 16, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
                                        <Check size={20} color="#10b981" />
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 600 }}>Profile updated</p>
                                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13 }}>You will be redirected back to your profile page.</p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Full Name</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <User size={16} color="#7c3aed" />
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                            className="input-dark"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Email Address</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Mail size={16} color="#7c3aed" />
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                                            className="input-dark"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Wilaya</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <MapPin size={16} color="#7c3aed" />
                                        <select
                                            value={form.wilaya}
                                            onChange={e => setForm(prev => ({ ...prev, wilaya: e.target.value }))}
                                            className="input-dark"
                                            style={{ flex: 1 }}
                                        >
                                            <option value="">Select wilaya</option>
                                            {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Interests</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                        {INTERESTS.map(interest => {
                                            const selected = form.interests.includes(interest)
                                            return (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    onClick={() => toggleInterest(interest)}
                                                    style={{
                                                        padding: '8px 14px',
                                                        borderRadius: 999,
                                                        border: `1px solid ${selected ? '#7c3aed' : 'rgba(255,255,255,0.12)'}`,
                                                        background: selected ? 'rgba(124,58,237,0.16)' : 'rgba(255,255,255,0.03)',
                                                        color: selected ? '#c4b5fd' : 'var(--text-secondary)',
                                                        cursor: 'pointer',
                                                        fontSize: 13,
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {interest}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    <button type="button" onClick={() => router.push('/profile')} className="btn-secondary" style={{ flex: '1 1 0', justifyContent: 'center' }}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary" style={{ flex: '1 1 0', justifyContent: 'center' }}>
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </AuthGuard>
    )
}
