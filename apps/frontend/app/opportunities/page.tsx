'use client'
import { useEffect, useMemo, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { Search, Filter, MapPin, Calendar, Users, Code2, Leaf, Trophy, Heart, ArrowRight, Briefcase } from 'lucide-react'

const CATEGORIES = ['All', 'Technology', 'Environment', 'Sports', 'Volunteering', 'Arts', 'Leadership', 'Entrepreneurship', 'Training']
const WILAYAS = ['All Wilayas', 'Alger', 'Béjaïa', 'Constantine', 'Oran', 'Sétif', 'Annaba', 'Tizi Ouzou']

const catIcons: Record<string, React.ReactNode> = {
    Technology: <Code2 size={13} />, Environment: <Leaf size={13} />, Sports: <Trophy size={13} />,
    Volunteering: <Heart size={13} />, Leadership: <Briefcase size={13} />,
}
const catColors: Record<string, { color: string; bg: string }> = {
    Technology: { color: '#60a5fa', bg: 'rgba(59,130,246,0.15)' },
    Environment: { color: '#34d399', bg: 'rgba(16,185,129,0.15)' },
    Sports: { color: '#fbbf24', bg: 'rgba(245,158,11,0.15)' },
    Volunteering: { color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
    Arts: { color: '#c084fc', bg: 'rgba(192,132,252,0.15)' },
    Leadership: { color: '#38bdf8', bg: 'rgba(56,189,248,0.15)' },
    Entrepreneurship: { color: '#fb923c', bg: 'rgba(251,146,60,0.15)' },
    Training: { color: '#a3e635', bg: 'rgba(163,230,53,0.15)' },
}

const allOpportunities = [
    { id: '1', title: 'National Robotics & AI Championship', category: 'Technology', wilaya: 'Alger', date: '2026-07-15', capacity: 120, remaining: 47, odej: 'ODEJ Alger', desc: 'Compete in teams of 3-5 to design and program autonomous robots. All levels welcome.' },
    { id: '2', title: 'Reforestation Volunteer Day – Kabylie', category: 'Environment', wilaya: 'Béjaïa', date: '2026-07-08', capacity: 80, remaining: 23, odej: 'ODEJ Béjaïa', desc: 'Join thousands of volunteers to plant trees across the forests of Kabylie.' },
    { id: '3', title: 'Regional Youth Football Tournament', category: 'Sports', wilaya: 'Constantine', date: '2026-07-20', capacity: 200, remaining: 88, odej: 'ODEJ Constantine', desc: 'Inter-wilaya football tournament open to youth aged 16-25.' },
    { id: '4', title: 'Digital Skills Bootcamp – Web Dev', category: 'Technology', wilaya: 'Oran', date: '2026-07-28', capacity: 60, remaining: 12, odej: 'ODEJ Oran', desc: '5-day intensive bootcamp covering HTML, CSS, JavaScript and React basics.' },
    { id: '5', title: 'Community Leadership Program', category: 'Leadership', wilaya: 'Sétif', date: '2026-08-05', capacity: 40, remaining: 31, odej: 'ODEJ Sétif', desc: 'Develop leadership and public speaking skills through workshops and mentoring.' },
    { id: '6', title: 'Environmental Awareness Campaign', category: 'Environment', wilaya: 'Annaba', date: '2026-08-10', capacity: 100, remaining: 65, odej: 'ODEJ Annaba', desc: 'Awareness campaign on plastic waste reduction and sustainable living.' },
    { id: '7', title: 'Youth Entrepreneurship Bootcamp', category: 'Entrepreneurship', wilaya: 'Alger', date: '2026-08-15', capacity: 50, remaining: 28, odej: 'ODEJ Alger', desc: 'Two-week program helping young people validate and pitch business ideas.' },
    { id: '8', title: 'Kabyle Cultural Arts Festival', category: 'Arts', wilaya: 'Béjaïa', date: '2026-09-01', capacity: 300, remaining: 220, odej: 'ODEJ Béjaïa', desc: 'Annual celebration of Amazigh arts, music, poetry and crafts.' },
    { id: '9', title: 'Professional Training – Excel & Data', category: 'Training', wilaya: 'Tizi Ouzou', date: '2026-08-20', capacity: 35, remaining: 15, odej: 'ODEJ Tizi Ouzou', desc: 'Hands-on workshop on Excel, data analysis and basic statistics.' },
]

export default function OpportunitiesPage() {
    const { user, isAuthenticated } = useAuthStore()
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')
    const [wilaya, setWilaya] = useState('All Wilayas')

    useEffect(() => {
        if (!isAuthenticated || !user) return
        if (user.wilaya) {
            setWilaya(user.wilaya)
        }
        if (user.interests?.length) {
            setCategory(user.interests[0])
        }
    }, [isAuthenticated, user])

    const scoredOpportunities = useMemo(() => {
        return allOpportunities.map(opp => {
            const interestMatches = user?.interests?.reduce((sum, interest) => {
                const interestLower = interest.toLowerCase()
                const categoryMatch = opp.category.toLowerCase() === interestLower || opp.category.toLowerCase().includes(interestLower)
                const descMatch = opp.desc.toLowerCase().includes(interestLower)
                return sum + (categoryMatch || descMatch ? 1 : 0)
            }, 0) ?? 0

            const interestScore = user?.interests?.length ? Math.min(1, interestMatches / user.interests.length) : 0
            const locationScore = user?.wilaya ? (opp.wilaya === user.wilaya ? 1 : 0) : 0
            const popularityScore = Math.min(1, (opp.capacity - opp.remaining) / opp.capacity + 0.05)
            const daysUntil = Math.max(0, (new Date(opp.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            const urgencyScore = Math.max(0, Math.min(1, 1 - (daysUntil / 60)))

            const score = Math.round((
                interestScore * 0.45 +
                locationScore * 0.35 +
                popularityScore * 0.15 +
                urgencyScore * 0.05
            ) * 100)

            return { ...opp, score }
        }).sort((a, b) => b.score - a.score)
    }, [user])

    const filtered = scoredOpportunities.filter(o => {
        const matchQ = !query || o.title.toLowerCase().includes(query.toLowerCase()) || o.desc.toLowerCase().includes(query.toLowerCase())
        const matchC = category === 'All' || o.category === category
        const matchW = wilaya === 'All Wilayas' || o.wilaya === wilaya
        return matchQ && matchC && matchW
    })

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    {/* Header */}
                    <div style={{ marginBottom: 36, textAlign: 'center' }}>
                        <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12 }}>
                            Opportunities
                        </div>
                        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 10 }}>
                            {isAuthenticated ? `Opportunities for ${user?.name}` : 'All Opportunities'}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
                            {isAuthenticated ? `Showing opportunities ranked by your personalized match score for ${user?.wilaya || 'your area'}.` : `Browse and filter ${allOpportunities.length} active opportunities from ODEJ across Algeria.`}
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="glass" style={{ padding: 20, marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {/* Search bar */}
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input className="input-dark" style={{ paddingLeft: 40 }} placeholder="Search opportunities…" value={query} onChange={e => setQuery(e.target.value)} />
                        </div>
                        {/* Category pills */}
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {CATEGORIES.map(c => (
                                <button key={c} onClick={() => setCategory(c)} style={{
                                    padding: '6px 14px', borderRadius: 100,
                                    border: `1px solid ${c === category ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                                    background: c === category ? 'rgba(124,58,237,0.2)' : 'transparent',
                                    color: c === category ? '#c4b5fd' : 'var(--text-secondary)',
                                    fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
                                }}>
                                    {c}
                                </button>
                            ))}
                        </div>
                        {/* Wilaya select */}
                        <select className="input-dark" style={{ maxWidth: 240 }} value={wilaya} onChange={e => setWilaya(e.target.value)}>
                            {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                    </div>

                    {/* Results count */}
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>{filtered.length} results</p>

                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                        {filtered.map((opp, i) => {
                            const cat = catColors[opp.category] || catColors.Technology
                            const pct = Math.round(((opp.capacity - opp.remaining) / opp.capacity) * 100)
                            const dateStr = new Date(opp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                            return (
                                <motion.div key={opp.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                    className="glass card-hover" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f8f8ff', lineHeight: 1.4, marginBottom: 6 }}>{opp.title}</h3>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa' }}>{opp.score}% match</span>
                                        </div>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 100, background: cat.bg, color: cat.color, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
                                            {catIcons[opp.category]} {opp.category}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{opp.desc}</p>
                                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 12 }}><MapPin size={12} />{opp.wilaya}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 12 }}><Calendar size={12} />{dateStr}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 12 }}><Users size={12} />{opp.remaining} left</span>
                                    </div>
                                    <div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${pct}%`, background: cat.color + '80' }} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                                            <span>{opp.odej}</span><span>{pct}% full</span>
                                        </div>
                                    </div>
                                    <Link href={`/opportunities/${opp.id}`} className="btn-primary" style={{ justifyContent: 'center', fontSize: 13, padding: '9px 16px' }}>
                                        View Details <ArrowRight size={14} />
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
