'use client'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Bell, Heart, MessageCircle, Plus, MapPin, ThumbsUp, ArrowRight, Lightbulb, CheckCircle, XCircle, Clock } from 'lucide-react'

const statusConfig = {
    pending: { label: 'Gathering Support', color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', icon: Clock },
    notified: { label: 'Ready for ODEJ', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', icon: Bell },
    approved: { label: 'ODEJ Approved ✓', color: '#34d399', bg: 'rgba(16,185,129,0.12)', icon: CheckCircle },
    rejected: { label: 'Rejected', color: '#f87171', bg: 'rgba(239,68,68,0.12)', icon: XCircle },
}

import { useAuthStore } from '@/lib/store/useAuthStore'
import { useAppStore, Initiative } from '@/lib/store/useAppStore'
import { useRouter } from 'next/navigation'

function InitiativeCard({ item }: { item: Initiative }) {
    const { user, isAuthenticated } = useAuthStore()
    const router = useRouter()
    const supportInitiative = useAppStore(state => state.supportInitiative)

    const supported = item.supportedBy?.includes(user?.id || '') || false
    const supporters = item.supporters
    const pct = Math.min(Math.round((supporters / item.threshold) * 100), 100)
    const cfg = statusConfig[item.status as keyof typeof statusConfig]

    const handleSupport = () => {
        if (!isAuthenticated || !user?.id) {
            if (confirm('Authentication required. Would you like to sign in to support this initiative?')) {
                router.push('/auth/signin')
            }
            return
        }

        supportInitiative(item.id, user.id)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass card-hover"
            style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff', lineHeight: 1.35, flex: 1 }}>{item.title}</h3>
                <span style={{
                    display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 100,
                    background: cfg.bg, color: cfg.color, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
                }}>
                    <cfg.icon size={11} /> {cfg.label}
                </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>

            {/* Meta */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 12 }}><MapPin size={11} />{item.wilaya}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>by {item.author}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{item.daysAgo}d ago</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 12 }}><MessageCircle size={11} />{item.comments}</span>
            </div>

            {/* Progress */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><ThumbsUp size={11} /> {supporters} / {item.threshold} supporters</span>
                    <span style={{ color: pct >= 100 ? '#34d399' : '#a78bfa', fontWeight: 600 }}>{pct}%</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: pct >= 100 ? '#34d399' : undefined, transition: 'width 0.6s ease' }} />
                </div>
                {pct >= 80 && pct < 100 && (
                    <p style={{ fontSize: 11, color: '#fbbf24', marginTop: 5 }}>⚡ {item.threshold - supporters} more supporters to notify ODEJ!</p>
                )}
                {pct >= 100 && (
                    <p style={{ fontSize: 11, color: '#34d399', marginTop: 5 }}>✓ Threshold reached – ODEJ notified!</p>
                )}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {item.tags.map(t => <span key={t} className="badge-pill badge-purple" style={{ fontSize: 10 }}>{t}</span>)}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
                <button
                    onClick={handleSupport}
                    className={supported ? 'btn-primary' : 'btn-secondary'}
                    style={{ flex: 1, justifyContent: 'center', fontSize: 13, padding: '9px 14px' }}
                    disabled={item.status === 'approved'}
                >
                    <ThumbsUp size={14} /> {supported ? 'Supported!' : 'Support'}
                </button>
                <Link href={`/initiatives/${item.id}`} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: 13, padding: '9px 14px' }}>
                    Discuss <MessageCircle size={14} />
                </Link>
            </div>
        </motion.div>
    )
}

export default function InitiativesPage() {
    const { user, isAuthenticated } = useAuthStore()
    const router = useRouter()
    const initiatives = useAppStore(state => state.initiatives)
    const addInitiative = useAppStore(state => state.addInitiative)
    const [showNew, setShowNew] = useState(false)
    const [showMine, setShowMine] = useState(false)
    const [newInit, setNewInit] = useState({ title: '', desc: '', wilaya: '' })

    const userInitiatives = initiatives.filter(item => user?.name ? item.author === user.name : false)
    const personalizedInitiatives = isAuthenticated ? initiatives.filter(item => {
        const matchesWilaya = user?.wilaya ? item.wilaya === user.wilaya : false
        const matchesInterest = user?.interests?.some(interest => item.tags.some(tag => tag.toLowerCase() === interest.toLowerCase()))
        return matchesWilaya || Boolean(matchesInterest)
    }) : initiatives

    const initiativesToShow = showMine && isAuthenticated
        ? userInitiatives
        : personalizedInitiatives.length > 0
            ? personalizedInitiatives
            : initiatives

    const visibleLabel = showMine && isAuthenticated ? 'My Initiatives' : isAuthenticated ? 'Matched Initiatives' : 'Community Initiatives'

    const handleOpenPost = () => {
        if (!isAuthenticated) {
            if (confirm('Authentication required. Would you like to sign in to post an initiative?')) {
                router.push('/auth/signin')
            }
            return
        }
        setShowNew(true)
    }

    const handleSubmitInitiative = () => {
        if (!newInit.title.trim() || !newInit.desc.trim() || !newInit.wilaya.trim()) {
            alert('Please fill in all fields before posting your initiative.')
            return
        }

        const created: Initiative = {
            id: `${Date.now()}`,
            title: newInit.title.trim(),
            desc: newInit.desc.trim(),
            wilaya: newInit.wilaya,
            author: user?.name || 'You',
            threshold: 50,
            supporters: 1,
            comments: 0,
            status: 'pending',
            daysAgo: 0,
            tags: [newInit.wilaya, 'Community'],
            supportedBy: user?.id ? [user.id] : [],
        }

        addInitiative(created)
        setNewInit({ title: '', desc: '', wilaya: '' })
        setShowNew(false)
        setShowMine(true)
        alert('Initiative posted! It is now visible on your board.')
    }

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
                        <div>
                            <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12 }}>
                                <Lightbulb size={12} /> {visibleLabel}
                            </div>
                            <h1 style={{ fontSize: 32, marginBottom: 8 }}>
                                {isAuthenticated ? `Ideas for ${user?.wilaya || 'your area'}` : 'Community Demand → Events'}
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 500 }}>
                                {isAuthenticated
                                    ? showMine
                                        ? `Showing ${initiativesToShow.length} initiative${initiativesToShow.length === 1 ? '' : 's'} by you.`
                                        : `Showing ${initiativesToShow.length} initiatives chosen to match your profile.`
                                    : 'Propose ideas, gather 50 supporters, and watch ODEJ turn your initiative into a real event.'}
                            </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            {isAuthenticated && (
                                <button
                                    className="btn-secondary"
                                    onClick={() => setShowMine(prev => !prev)}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 16px' }}
                                >
                                    {showMine ? 'Show All Initiatives' : 'See My Initiatives'}
                                </button>
                            )}
                            <button className="btn-primary" onClick={handleOpenPost}>
                                <Plus size={16} /> Post Initiative
                            </button>
                        </div>
                    </div>

                    {/* New initiative modal */}
                    <AnimatePresence>
                        {showNew && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 200, padding: 24,
                                    backdropFilter: 'blur(10px)',
                                }}
                                onClick={e => { if (e.target === e.currentTarget) setShowNew(false) }}
                            >
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                                    style={{
                                        width: '100%', maxWidth: 520,
                                        padding: 40, background: '#0a0a20',
                                        borderRadius: 32, border: '1px solid rgba(139,92,246,0.3)',
                                        boxShadow: '0 24px 64px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    <h2 style={{ fontSize: 26, marginBottom: 10, fontWeight: 700, color: '#f8f8ff' }}>Post a New Initiative</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 14 }}>
                                        Your idea will be shared with the community. Need 50 supporters to notify ODEJ.
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 4 }}>INITIATIVE TITLE</label>
                                            <input className="input-dark" placeholder="e.g. Robotics workshop for students" style={{ padding: '14px 18px', fontSize: 15 }} value={newInit.title}
                                                onChange={e => setNewInit(p => ({ ...p, title: e.target.value }))} />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 4 }}>DESCRIPTION</label>
                                            <textarea className="input-dark" placeholder="Describe your idea in detail…"
                                                rows={4} style={{ resize: 'vertical', padding: '14px 18px', fontSize: 15 }} value={newInit.desc}
                                                onChange={e => setNewInit(p => ({ ...p, desc: e.target.value }))} />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 4 }}>LOCATION (WILAYA)</label>
                                            <select className="input-dark" style={{ padding: '14px 18px', fontSize: 15 }} value={newInit.wilaya} onChange={e => setNewInit(p => ({ ...p, wilaya: e.target.value }))}>
                                                <option value="">Select your wilaya…</option>
                                                {['Alger', 'Béjaïa', 'Constantine', 'Oran', 'Sétif', 'Annaba', 'Tizi Ouzou'].map(w => <option key={w} value={w}>{w}</option>)}
                                            </select>
                                        </div>

                                        <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                                            <button className="btn-secondary" onClick={() => setShowNew(false)} style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>Cancel</button>
                                            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: 15, fontWeight: 700 }}
                                                onClick={handleSubmitInitiative}>
                                                Post Initiative
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* How it works banner */}
                    <div className="glass" style={{ padding: '16px 24px', marginBottom: 28, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                        {['1. Post initiative', '→', '2. Gather 50 supporters', '→', '3. ODEJ notified', '→', '4. Event created', '→', '5. All supporters invited 🎉'].map((s, i) => (
                            <span key={i} style={{ fontSize: 13, color: s === '→' ? 'var(--text-muted)' : 'var(--text-secondary)', fontWeight: s.includes('1.') || s.includes('2.') || s.includes('3.') || s.includes('4.') || s.includes('5.') ? 600 : 400 }}>{s}</span>
                        ))}
                    </div>

                    {/* Initiative cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                        {initiativesToShow.length > 0 ? initiativesToShow.map(item => <InitiativeCard key={item.id} item={item} />) : (
                            <div className="glass" style={{ padding: 28, textAlign: 'center', width: '100%' }}>
                                <h2 style={{ margin: 0, fontSize: 22, color: '#f8f8ff' }}>No initiatives found</h2>
                                <p style={{ color: 'var(--text-secondary)', marginTop: 10 }}>Post your first idea and it will show up here instantly.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
