'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { Eye, EyeOff, Zap, ArrowRight, Check } from 'lucide-react'

const INTERESTS = ['Technology', 'Environment', 'Sports', 'Volunteering', 'Arts', 'Culture', 'Leadership', 'Entrepreneurship', 'Training']
const WILAYAS = ['Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Meniaa']

export default function SignUpPage() {
    const [step, setStep] = useState(1)
    const [showPass, setShowPass] = useState(false)
    const router = useRouter()
    const setAuth = useAuthStore(state => state.setAuth)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({
        name: '', email: '', password: '', wilaya: '', interests: [] as string[], role: 'youth' as 'youth' | 'odej', odejCenter: '',
    })

    const createAvatar = (name: string) => {
        return name
            .split(' ')
            .filter(Boolean)
            .map(part => part[0]?.toUpperCase())
            .join('')
            .slice(0, 2)
    }

    function toggleInterest(interest: string) {
        setForm(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest],
        }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const userName = form.role === 'odej'
            ? (form.odejCenter.trim() || form.name.trim() || 'ODEJ Partner')
            : (form.name.trim() || 'ForsaTech User')

        const user = {
            id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: userName,
            email: form.email.trim(),
            role: form.role,
            avatar: createAvatar(userName),
            wilaya: form.wilaya || 'Unknown',
        }

        setAuth(user, btoa(`${form.email}:${Date.now()}`))
        setSuccess(true)
        setTimeout(() => router.push(form.role === 'odej' ? '/odej' : '/profile'), 900)
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
                    background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div className="glass" style={{ width: '100%', maxWidth: 480, padding: 40, zIndex: 1 }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <div style={{
                            width: 52, height: 52,
                            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <Zap size={24} color="white" strokeWidth={2.5} />
                        </div>
                        <h1 style={{ fontSize: 24, marginBottom: 4, color: '#f8f8ff' }}>Create your account</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Step {step} of 2</p>
                    </div>

                    {/* Step indicator */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
                        {[1, 2].map(s => (
                            <div key={s} style={{
                                flex: 1, height: 4, borderRadius: 2,
                                background: s <= step ? 'linear-gradient(90deg, #7c3aed, #a78bfa)' : 'rgba(255,255,255,0.08)',
                                transition: 'background 0.3s',
                            }} />
                        ))}
                    </div>

                    <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2) } : handleSubmit}>
                        {success && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 24 }}>
                                <div style={{ width: 72, height: 72, borderRadius: 999, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Check size={36} color="#059669" />
                                </div>
                                <h2 style={{ color: '#10b981', margin: 0 }}>Registered</h2>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Redirecting to your profile…</p>
                            </div>
                        )}
                        {step === 1 && !success && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 10 }}>Signup as</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        {['youth', 'odej'].map(option => {
                                            const label = option === 'youth' ? 'Young person' : 'ODEJ partner'
                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => setForm(p => ({ ...p, role: option as 'youth' | 'odej' }))}
                                                    style={{
                                                        padding: '16px 14px',
                                                        borderRadius: 16,
                                                        border: `1px solid ${form.role === option ? '#7c3aed' : 'rgba(255,255,255,0.12)'}`,
                                                        background: form.role === option ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.03)',
                                                        color: 'var(--text-secondary)',
                                                        textAlign: 'left',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <strong style={{ display: 'block', color: 'white' }}>{label}</strong>
                                                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                                        {option === 'youth'
                                                            ? 'Find initiatives and support local projects.'
                                                            : 'Create offers and manage your ODEJ operations.'}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                                {form.role === 'youth' ? (
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Full name</label>
                                        <input type="text" name="name" required placeholder="Ahmed Benali" value={form.name}
                                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input-dark" />
                                    </div>
                                ) : (
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>ODEJ center or organization name</label>
                                        <input type="text" required placeholder="e.g. Carthage Support Center" value={form.odejCenter}
                                            onChange={e => setForm(p => ({ ...p, odejCenter: e.target.value }))} className="input-dark" />
                                    </div>
                                )}
                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Email address</label>
                                    <input type="email" name="email" required placeholder="you@example.com" value={form.email}
                                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-dark" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <input type={showPass ? 'text' : 'password'} required placeholder="Min 8 characters" value={form.password}
                                            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="input-dark" style={{ paddingRight: 44 }} />
                                        <button type="button" onClick={() => setShowPass(p => !p)} style={{
                                            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex',
                                        }}>
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary" style={{ marginTop: 4, justifyContent: 'center' }}>
                                    Continue <ArrowRight size={16} />
                                </button>
                            </div>
                        )}

                        {step === 2 && !success && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                {form.role === 'odej' ? (
                                    <>
                                        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                                            Your ODEJ profile will be managed through the administration dashboard.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 10 }}>
                                                Your interests <span style={{ color: 'var(--text-muted)' }}>(select at least one)</span>
                                            </label>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                {INTERESTS.map(interest => {
                                                    const selected = form.interests.includes(interest)
                                                    return (
                                                        <button
                                                            key={interest}
                                                            type="button"
                                                            onClick={() => toggleInterest(interest)}
                                                            style={{
                                                                display: 'flex', alignItems: 'center', gap: 6,
                                                                padding: '7px 14px',
                                                                borderRadius: 100,
                                                                border: `1px solid ${selected ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
                                                                background: selected ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
                                                                color: selected ? '#c4b5fd' : 'var(--text-secondary)',
                                                                fontSize: 13, fontWeight: 500,
                                                                cursor: 'pointer',
                                                                transition: 'all 0.15s',
                                                            }}
                                                        >
                                                            {selected && <Check size={12} />}
                                                            {interest}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Your Wilaya</label>
                                    <select
                                        required
                                        value={form.wilaya}
                                        onChange={e => setForm(p => ({ ...p, wilaya: e.target.value }))}
                                        className="input-dark"
                                        style={{ appearance: 'none' }}
                                    >
                                        <option value="">Select your wilaya…</option>
                                        {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                                    </select>
                                </div>

                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button type="button" onClick={() => setStep(1)} className="btn-secondary" style={{ flex: '0 0 auto', padding: '10px 18px' }}>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        style={{ flex: 1, justifyContent: 'center' }}
                                        disabled={form.wilaya === '' || (form.role === 'youth' ? form.interests.length === 0 : form.odejCenter.trim() === '')}
                                    >
                                        Create Account 🎉
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>

                    <div className="divider" style={{ margin: '24px 0' }} />
                    <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <Link href="/auth/signin" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
