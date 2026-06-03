'use client'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AuthGuard } from '@/components/AuthGuard'
import { useAuthStore } from '@/lib/store/useAuthStore'
import {
    User, Mail, MapPin, Edit3, Award, Calendar,
    Settings, LogOut, ChevronRight, Star, Heart, Bookmark
} from 'lucide-react'
import { useAppStore } from '@/lib/store/useAppStore'

const mockBadges = [
    { id: 1, name: 'Eco-Warrior', icon: Heart, color: '#34d399', date: '2026-04-12' },
    { id: 2, name: 'Code Master', icon: Star, color: '#60a5fa', date: '2026-05-05' },
    { id: 3, name: 'Leader of Tomorrow', icon: Award, color: '#fbbf24', date: '2026-05-20' },
]

const getInitials = (name: string) =>
    name
        .split(' ')
        .filter(Boolean)
        .map(part => part[0]?.toUpperCase())
        .join('')
        .slice(0, 2)

export default function ProfilePage() {
    const router = useRouter()
    const { user, logout } = useAuthStore()
    const offers = useAppStore(state => state.offers)

    const savedOffersList = useMemo(() => {
        if (!user?.savedOffers?.length) return []
        return user.savedOffers.map(id => offers.find(o => o.id === id)).filter(Boolean) as typeof offers
    }, [user?.savedOffers, offers])

    const profile = useMemo(() => ({
        name: user?.name || 'ForsaTech User',
        email: user?.email || 'you@example.com',
        wilaya: user?.wilaya || 'Unknown',
        bio: user ? 'Welcome back! Your profile is now synced across the website.' : 'Sign in to see your profile details.',
        avatar: user?.avatar || getInitials(user?.name || 'ForsaTech User'),
        interests: user?.interests?.length ? user.interests : ['Community', 'Impact', 'Learning'],
        memberSince: user ? 'Recently joined' : 'Not signed in',
    }), [user])

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    return (
        <AuthGuard>
            <main>
                <Navbar />
                <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                    <div className="container-page" style={{ maxWidth: 1000 }}>

                        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32 }}>

                            {/* Sidebar / Info */}
                            <div>
                                <div className="glass" style={{ padding: 32, textAlign: 'center', position: 'sticky', top: 100 }}>
                                    <div style={{
                                        width: 120, height: 120,
                                        background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                                        borderRadius: '50%', margin: '0 auto 20px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 40, fontWeight: 800, color: 'white',
                                        boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
                                        border: '4px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                        {profile.avatar}
                                    </div>
                                    <h1 style={{ fontSize: 24, marginBottom: 4 }}>{profile.name}</h1>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>{profile.email}</p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', textAlign: 'left', marginBottom: 24 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                                            <MapPin size={14} /> {profile.wilaya}, Algeria
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                                            <Calendar size={14} /> {profile.memberSince}
                                        </div>
                                    </div>

                                    <button onClick={() => router.push('/profile/edit')} className="btn-primary" style={{ width: '100%', marginBottom: 12 }}>
                                        <Edit3 size={16} /> Edit Profile
                                    </button>
                                    <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.2)' }}>
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                                {user?.role !== 'odej' && (
                                    <>
                                        {/* Interests */}
                                        <div className="glass" style={{ padding: 28 }}>
                                            <h2 style={{ fontSize: 20, marginBottom: 16 }}>Interests</h2>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                {profile.interests.map(interest => (
                                                    <span key={interest} className="badge-pill badge-purple">{interest}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="glass" style={{ padding: 28 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                                <h2 style={{ fontSize: 20 }}>Achievements</h2>
                                                <span style={{ fontSize: 13, color: '#fbbf24', fontWeight: 600 }}>{mockBadges.length} Badges</span>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
                                                {mockBadges.map(badge => (
                                                    <div key={badge.id} style={{
                                                        textAlign: 'center', padding: 20,
                                                        background: 'rgba(255,255,255,0.03)', borderRadius: 16,
                                                        border: '1px solid rgba(255,255,255,0.05)'
                                                    }}>
                                                        <div style={{
                                                            width: 48, height: 48, background: badge.color + '15',
                                                            borderRadius: '50%', margin: '0 auto 12px',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            color: badge.color, border: `1px solid ${badge.color}30`
                                                        }}>
                                                            <badge.icon size={20} />
                                                        </div>
                                                        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{badge.name}</p>
                                                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{badge.date}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Settings / Security Quick Links */}
                                <div className="glass" style={{ padding: 28 }}>
                                    <h2 style={{ fontSize: 20, marginBottom: 20 }}>Account Settings</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {[
                                            { label: 'Privacy & Security', icon: Settings, desc: 'Manage password and data sharing' },
                                            { label: 'Notification Preferences', icon: Mail, desc: 'Choose what alerts you receive' },
                                            { label: 'Linked Accounts', icon: ChevronRight, desc: 'Connect social or university profiles' },
                                        ].map(item => (
                                            <div key={item.label} style={{
                                                display: 'flex', alignItems: 'center', gap: 16,
                                                padding: '16px', borderRadius: 12, cursor: 'pointer',
                                                transition: 'background 0.2s'
                                            }} className="hover:bg-white/5">
                                                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                                                    <item.icon size={18} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontSize: 15, fontWeight: 500 }}>{item.label}</p>
                                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.desc}</p>
                                                </div>
                                                <ChevronRight size={16} color="var(--text-muted)" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </AuthGuard>
    )
}
