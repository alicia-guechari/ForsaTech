'use client'
import { useMemo } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAppStore } from '@/lib/store/useAppStore'
import { useAuthStore } from '@/lib/store/useAuthStore'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Bell, MapPin, Lightbulb } from 'lucide-react'

export default function OdejApprovalsPage() {
    const user = useAuthStore(state => state.user)
    const initiatives = useAppStore(state => state.initiatives)
    const notifications = useAppStore(state => state.notifications)
    const approveInitiative = useAppStore(state => state.approveInitiative)

    const wilaya = user?.wilaya || ''
    const readyApprovals = useMemo(
        () => initiatives.filter(init => init.wilaya === wilaya && init.status === 'notified'),
        [initiatives, wilaya]
    )
    const notificationCount = useMemo(
        () => notifications.filter(note => note.wilaya === wilaya && note.type === 'initiative' && !note.read).length,
        [notifications, wilaya]
    )

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
                        <div>
                            <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12 }}>
                                <Bell size={12} /> ODEJ Approvals
                            </div>
                            <h1 style={{ fontSize: 32, marginBottom: 10 }}>Approve initiatives from {wilaya || 'your region'}</h1>
                            <p style={{ color: 'var(--text-secondary)', maxWidth: 540 }}>
                                Review initiatives that have reached 50 supporters and convert them into official ODEJ offers.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <Link href="/odej" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                <ArrowLeft size={16} /> Back to Dashboard
                            </Link>
                            <button className="btn-primary" type="button">
                                {notificationCount} New Notification{notificationCount === 1 ? '' : 's'}
                            </button>
                        </div>
                    </div>

                    {user ? (
                        <div style={{ display: 'grid', gap: 20 }}>
                            {readyApprovals.length > 0 ? readyApprovals.map(init => (
                                <motion.div
                                    key={init.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass card-hover"
                                    style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#60a5fa', fontSize: 12, fontWeight: 700 }}>
                                                <Lightbulb size={14} /> Ready for approval
                                            </div>
                                            <h2 style={{ margin: 0, fontSize: 20 }}>{init.title}</h2>
                                            <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>{init.desc}</p>
                                        </div>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 999, background: 'rgba(96,165,250,0.12)', color: '#2563eb', fontSize: 12, fontWeight: 700 }}>
                                            <MapPin size={14} /> {init.wilaya}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}><strong>{init.supporters}</strong> supporters</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}><strong>{init.comments}</strong> comments</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Threshold: <strong>{init.threshold}</strong></div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                                        <button className="btn-secondary" onClick={() => approveInitiative(init.id, user.name)}>
                                            Approve and publish <CheckCircle2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="glass" style={{ padding: 32, textAlign: 'center' }}>
                                    <h2 style={{ margin: 0, fontSize: 24 }}>No initiatives waiting approval yet</h2>
                                    <p style={{ marginTop: 12, color: 'var(--text-secondary)' }}>
                                        Once an initiative in {wilaya} reaches 50 supporters, it will appear here for your review.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="glass" style={{ padding: 28, textAlign: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: 24 }}>Sign in to manage approvals</h2>
                            <p style={{ marginTop: 12, color: 'var(--text-secondary)' }}>
                                Use your ODEJ account to review approved initiatives and convert them into offers.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    )
}
