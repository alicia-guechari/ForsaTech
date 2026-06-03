'use client'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { Bell, Trash2, Clock, Info } from 'lucide-react'
import { useMemo } from 'react'
import { useAppStore } from '@/lib/store/useAppStore'
import { useAuthStore } from '@/lib/store/useAuthStore'

export default function NotificationsPage() {
    const user = useAuthStore(state => state.user)
    const notifications = useAppStore(state => state.notifications)
    const markAllNotificationsRead = useAppStore(state => state.markAllNotificationsRead)
    const deleteNotification = useAppStore(state => state.deleteNotification)

    const relevantNotifications = useMemo(() => {
        if (!user) return []
        return notifications.filter(note => note.wilaya === user.wilaya && (
            user.role === 'odej'
                ? note.type === 'initiative' || note.type === 'offer'
                : note.type === 'offer' || note.type === 'general'
        ))
    }, [notifications, user])

    const markAllRead = () => {
        markAllNotificationsRead()
    }

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                        <div>
                            <h1 style={{ fontSize: 32, marginBottom: 8 }}>Notifications</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                                Stay updated on your applications, initiatives, and new matches.
                            </p>
                        </div>
                        <button onClick={markAllRead} className="btn-secondary" style={{ fontSize: 13, padding: '8px 16px' }}>
                            Mark all as read
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {relevantNotifications.length === 0 ? (
                            <div className="glass" style={{ padding: 48, textAlign: 'center' }}>
                                <Bell size={48} color="var(--text-muted)" style={{ marginBottom: 16, opacity: 0.3 }} />
                                <p style={{ color: 'var(--text-secondary)' }}>You're all caught up!</p>
                            </div>
                        ) : (
                            relevantNotifications.map((n, i) => (
                                <motion.div
                                    key={n.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass"
                                    style={{
                                        padding: '20px 24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 20,
                                        borderLeft: n.read ? '4px solid transparent' : '4px solid #7c3aed',
                                        background: n.read ? 'rgba(255,255,255,0.02)' : 'rgba(124,58,237,0.05)',
                                    }}
                                >
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 12,
                                        background: n.read ? 'rgba(255,255,255,0.05)' : 'rgba(124,58,237,0.15)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Bell size={18} color={n.read ? 'var(--text-muted)' : '#a78bfa'} />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <p style={{
                                            fontSize: 15,
                                            color: n.read ? 'var(--text-secondary)' : '#f8f8ff',
                                            fontWeight: n.read ? 400 : 500,
                                            marginBottom: 4,
                                            lineHeight: 1.5
                                        }}>
                                            {n.text}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                                                <Clock size={12} /> {n.time}
                                            </span>
                                            {!n.read && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#a78bfa', fontWeight: 600 }}>
                                                    New
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button
                                            onClick={() => deleteNotification(n.id)}
                                            style={{
                                                background: 'transparent', border: 'none', cursor: 'pointer',
                                                color: 'var(--text-muted)', padding: 8, borderRadius: 8,
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Pro tip card */}
                    <div className="glass-purple" style={{ marginTop: 40, padding: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: '50%' }}>
                            <Info size={20} color="white" />
                        </div>
                        <div>
                            <p style={{ fontWeight: 600, color: 'white', marginBottom: 2 }}>Pro Tip</p>
                            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                                Enable browser push notifications in settings to never miss an opportunity match or initiative update.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
