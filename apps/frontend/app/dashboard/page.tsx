'use client'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMemo } from 'react'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { useAppStore } from '@/lib/store/useAppStore'
import {
    Award, TrendingUp, CalendarCheck, Heart,
    Lightbulb, BookmarkCheck, ArrowRight, Star, Bell
} from 'lucide-react'

const mockStats = [
    { label: 'Applied Events', value: 7, icon: CalendarCheck, color: '#a78bfa' },
    { label: 'Completed', value: 4, icon: Star, color: '#34d399' },
    { label: 'Badges Earned', value: 4, icon: Award, color: '#fbbf24' },
    { label: 'Initiatives Supported', value: 12, icon: Heart, color: '#f87171' },
]

const mockBadges = [
    { name: 'Tech Pioneer', category: 'Technology', color: '#7c3aed', event: 'Robotics Championship 2025' },
    { name: 'Green Champion', category: 'Environment', color: '#059669', event: 'Reforestation Day Béjaïa' },
    { name: 'Community Builder', category: 'Volunteering', color: '#0891b2', event: 'Youth Volunteer Day 2025' },
    { name: 'Sports Achiever', category: 'Sports', color: '#d97706', event: 'Regional Basketball Cup' },
]

function BadgeCard({ badge }: { badge: typeof mockBadges[0] }) {
    return (
        <div className="glass" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* SVG Badge Icon */}
            <div style={{
                width: 52, height: 52, flexShrink: 0,
                borderRadius: '50%',
                background: badge.color + '20',
                border: `2px solid ${badge.color}60`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 14px ${badge.color}30`,
            }}>
                <Award size={22} color={badge.color} />
            </div>
            <div style={{ overflow: 'hidden' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#f8f8ff', marginBottom: 2 }}>{badge.name}</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{badge.event}</p>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const user = useAuthStore(state => state.user)
    const notifications = useAppStore(state => state.notifications)

    const relevantNotifications = useMemo(() => {
        if (!user) return []
        return notifications.filter(note => note.wilaya === user.wilaya && (
            user.role === 'odej'
                ? note.type === 'initiative' || note.type === 'offer'
                : note.type === 'offer' || note.type === 'general'
        ))
    }, [notifications, user])

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    {/* Header */}
                    <div style={{ marginBottom: 36 }}>
                        <h1 style={{ fontSize: 32, marginBottom: 6 }}>
                            My Dashboard
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                            Track your participation, badges, saved opportunities, and notifications.
                        </p>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
                        {mockStats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                                className="stat-card"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <s.icon size={18} color={s.color} />
                                </div>
                                <p className="stat-number" style={{ color: s.color }}>{s.value}</p>
                                <p className="stat-label">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        {/* Left column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {/* Badge collection */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h2 style={{ fontSize: 18, color: '#f8f8ff', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Award size={18} color="#fbbf24" /> Badge Collection
                                    </h2>
                                    <Link href="/profile" style={{ fontSize: 13, color: '#a78bfa', textDecoration: 'none' }}>View all</Link>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {mockBadges.map(b => <BadgeCard key={b.name} badge={b} />)}
                                </div>
                            </div>

                            {/* Network link */}
                            <Link href="/dashboard/network" className="glass-purple card-hover"
                                style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    <TrendingUp size={22} color="white" />
                                </div>
                                <div>
                                    <p style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff', marginBottom: 4 }}>My Opportunity Network</p>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>See your personalized opportunity graph →</p>
                                </div>
                                <ArrowRight size={18} color="#a78bfa" style={{ marginLeft: 'auto' }} />
                            </Link>
                        </div>

                        {/* Right column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {/* Notifications */}
                            <div>
                                <h2 style={{ fontSize: 18, color: '#f8f8ff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Bell size={18} color="#a78bfa" /> Notifications
                                    <span style={{
                                        background: '#7c3aed', color: 'white', borderRadius: '50%',
                                        width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 11, fontWeight: 700,
                                    }}>
                                        {relevantNotifications.filter(n => !n.read).length}
                                    </span>
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {relevantNotifications.length === 0 ? (
                                        <div className="glass" style={{ padding: 20, textAlign: 'center' }}>
                                            <p style={{ color: 'var(--text-secondary)' }}>No active notifications for your region yet.</p>
                                        </div>
                                    ) : relevantNotifications.slice(0, 3).map(n => (
                                        <div key={n.id} className="glass" style={{
                                            padding: '14px 16px',
                                            borderLeft: n.read ? '3px solid rgba(255,255,255,0.05)' : '3px solid #7c3aed',
                                        }}>
                                            <p style={{ fontSize: 14, color: n.read ? 'var(--text-secondary)' : '#f8f8ff', marginBottom: 4, lineHeight: 1.4 }}>{n.text}</p>
                                            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Supported initiatives */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h2 style={{ fontSize: 18, color: '#f8f8ff', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Lightbulb size={18} color="#fbbf24" /> My Initiatives
                                    </h2>
                                    <Link href="/initiatives" style={{ fontSize: 13, color: '#a78bfa', textDecoration: 'none' }}>View all</Link>
                                </div>
                                <div className="glass" style={{ padding: 20 }}>
                                    <p style={{ fontSize: 15, fontWeight: 600, color: '#f8f8ff', marginBottom: 6 }}>Robotics Workshop Béjaïa</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                                        <span>47 / 50 supporters</span>
                                        <span style={{ color: '#a78bfa', fontWeight: 600 }}>94% threshold</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: '94%' }} />
                                    </div>
                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 10 }}>
                                        ⚡ 3 more supporters needed to notify ODEJ Béjaïa!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
