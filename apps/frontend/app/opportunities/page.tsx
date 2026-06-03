'use client'
import { useEffect, useMemo, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { opportunitiesApi } from '@/lib/api/client'
import { Search, Filter, MapPin, Calendar, Users, Code2, Leaf, Trophy, Heart, ArrowRight, Briefcase, AlertCircle } from 'lucide-react'

const CATEGORIES = ['All', 'Technology', 'Environment', 'Sports', 'Volunteering', 'Arts', 'Culture', 'Leadership', 'Entrepreneurship', 'Training']
const WILAYAS = ['All Wilayas', 'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane']

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
    Culture: { color: '#f472b6', bg: 'rgba(244,114,182,0.15)' },
    Leadership: { color: '#38bdf8', bg: 'rgba(56,189,248,0.15)' },
    Entrepreneurship: { color: '#fb923c', bg: 'rgba(251,146,60,0.15)' },
    Training: { color: '#a3e635', bg: 'rgba(163,230,53,0.15)' },
}

// Static fallback data
const staticFallbackOpportunities = [
    { id: '1', title: 'National Robotics & AI Championship', category: 'Technology', wilaya: 'Alger', date: '2026-07-15', capacity: 120, applications: 47, odej: 'ODEJ Alger', description: 'Compete in teams of 3-5 to design and program autonomous robots. All levels welcome.' },
    { id: '2', title: 'Reforestation Volunteer Day – Kabylie', category: 'Environment', wilaya: 'Béjaïa', date: '2026-07-08', capacity: 80, applications: 23, odej: 'ODEJ Béjaïa', description: 'Join thousands of volunteers to plant trees across the forests of Kabylie.' },
    { id: '3', title: 'Regional Youth Football Tournament', category: 'Sports', wilaya: 'Constantine', date: '2026-07-20', capacity: 200, applications: 88, odej: 'ODEJ Constantine', description: 'Inter-wilaya football tournament open to youth aged 16-25.' },
]

interface Opportunity {
    id: string
    title: string
    category: { name?: string } | string
    wilaya: { name?: string } | string
    date: Date | string
    capacity: number
    applications?: number
    description?: string
    desc?: string
    odej?: { id?: string } | string
    status?: string
    score?: number
}

export default function OpportunitiesPage() {
    const { user, isAuthenticated } = useAuthStore()
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')
    const [wilaya, setWilaya] = useState('All Wilayas')

    useEffect(() => {
        fetchOpportunities()
    }, [])

    useEffect(() => {
        if (!isAuthenticated || !user) return
        if (user.wilaya) {
            setWilaya(user.wilaya)
        }
        if (user.interests?.length) {
            const matchingCat = CATEGORIES.find(c => c.toLowerCase() === user.interests[0]?.toLowerCase())
            if (matchingCat) setCategory(matchingCat)
        }
    }, [isAuthenticated, user])

    const fetchOpportunities = async () => {
        try {
            setLoading(true)
            const data = await opportunitiesApi.getAll()
            // Normalize API response (in case it differs from static format)
            const normalized = data.map((opp: any) => ({
                id: opp.id,
                title: opp.title,
                category: opp.category?.name || opp.category || 'General',
                wilaya: opp.wilaya?.name || opp.wilaya || 'Unknown',
                date: opp.date,
                capacity: opp.capacity || 50,
                applications: opp.applications?.length || 0,
                description: opp.description || '',
                odej: opp.odej?.id ? `ODEJ ${opp.wilaya?.name || 'Partner'}` : 'ODEJ Partner',
                status: opp.status || 'open',
            }))
            setOpportunities(normalized)
            setError('')
        } catch (err) {
            console.error('Failed to fetch opportunities:', err)
            // Fall back to static data
            setOpportunities(staticFallbackOpportunities)
            setError('Showing cached opportunities')
        } finally {
            setLoading(false)
        }
    }

    const scoredOpportunities = useMemo(() => {
        return opportunities.map(opp => {
            let score = 50 // Base score
            const category = typeof opp.category === 'string' ? opp.category : opp.category?.name

            if (isAuthenticated && user) {
                // Interest match
                const interestMatches = user.interests?.filter(interest =>
                    category?.toLowerCase().includes(interest.toLowerCase()) || interest.toLowerCase().includes(category?.toLowerCase() || '')
                ).length || 0
                score += interestMatches * 20

                // Location match
                const wilayaName = typeof opp.wilaya === 'string' ? opp.wilaya : opp.wilaya?.name
                if (wilayaName === user.wilaya) score += 20

                // Popularity
                const fillPct = opp.applications && opp.capacity ? Math.min(1, opp.applications / opp.capacity) : 0
                score += fillPct * 10
            }

            return { ...opp, score: Math.min(100, score) }
        }).sort((a, b) => b.score - a.score)
    }, [opportunities, user, isAuthenticated])

    const filtered = scoredOpportunities.filter(o => {
        const category_val = typeof o.category === 'string' ? o.category : o.category?.name
        const wilaya_val = typeof o.wilaya === 'string' ? o.wilaya : o.wilaya?.name
        const matchQ = !query || o.title.toLowerCase().includes(query.toLowerCase()) || o.description?.toLowerCase().includes(query.toLowerCase())
        const matchC = category === 'All' || category_val === category
        const matchW = wilaya === 'All Wilayas' || wilaya_val === wilaya
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
                            🌟 Opportunities
                        </div>
                        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 10 }}>
                            {isAuthenticated ? `Opportunities for ${user?.name}` : 'All Opportunities'}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
                            {isAuthenticated
                                ? `Showing ${filtered.length} opportunities ranked by your personalized match score.`
                                : `Browse ${opportunities.length} active opportunities from ODEJ across Algeria.`}
                        </p>
                    </div>

                    {/* Error banner */}
                    {error && (
                        <div style={{ padding: 12, borderRadius: 10, background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)', color: '#fbbf24', marginBottom: 20, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {/* Filters */}
                    <div className="glass" style={{ padding: 20, marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input className="input-dark" style={{ paddingLeft: 40 }} placeholder="Search opportunities…" value={query} onChange={e => setQuery(e.target.value)} />
                        </div>
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
                        <select className="input-dark" style={{ maxWidth: 240 }} value={wilaya} onChange={e => setWilaya(e.target.value)}>
                            {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                    </div>

                    {/* Results count */}
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
                        {loading ? 'Loading...' : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
                    </p>

                    {/* Loading skeleton */}
                    {loading && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="glass" style={{ padding: 24, minHeight: 300, animation: 'pulse 2s infinite' }} />
                            ))}
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && filtered.length === 0 && (
                        <div className="glass" style={{ padding: 60, textAlign: 'center' }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                            <h2 style={{ fontSize: 20, marginBottom: 8 }}>No opportunities found</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your filters or search terms.</p>
                        </div>
                    )}

                    {/* Grid */}
                    {!loading && filtered.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                            {filtered.map((opp, i) => {
                                const cat_name = typeof opp.category === 'string' ? opp.category : opp.category?.name || 'General'
                                const wilaya_name = typeof opp.wilaya === 'string' ? opp.wilaya : opp.wilaya?.name || 'Unknown'
                                const cat = catColors[cat_name] || catColors.Technology
                                const pct = opp.capacity ? Math.round(((opp.applications || 0) / opp.capacity) * 100) : 0
                                const dateStr = new Date(opp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                const remaining = Math.max(0, (opp.capacity || 0) - (opp.applications || 0))

                                return (
                                    <motion.div key={opp.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                        className="glass card-hover" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f8f8ff', lineHeight: 1.4, marginBottom: 6 }}>{opp.title}</h3>
                                                {opp.score !== undefined && <span style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa' }}>{Math.round(opp.score)}% match</span>}
                                            </div>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 100, background: cat.bg, color: cat.color, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
                                                {catIcons[cat_name]} {cat_name}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{opp.description || opp.desc || 'Exciting opportunity'}</p>
                                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 12 }}><MapPin size={12} />{wilaya_name}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 12 }}><Calendar size={12} />{dateStr}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 12 }}><Users size={12} />{remaining} spot{remaining !== 1 ? 's' : ''}</span>
                                        </div>
                                        <div>
                                            <div className="progress-bar" style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                                                <div className="progress-fill" style={{ width: `${pct}%`, background: cat.color, height: '100%', transition: 'width 0.3s' }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                                                <span>{opp.odej}</span><span>{pct}% full</span>
                                            </div>
                                        </div>
                                        {isAuthenticated ? (
                                            <Link href={`/opportunities/${opp.id}`} className="btn-primary" style={{ justifyContent: 'center', fontSize: 13, padding: '9px 16px' }}>
                                                View & Apply <ArrowRight size={14} />
                                            </Link>
                                        ) : (
                                            <Link href="/auth/signin" className="btn-primary" style={{ justifyContent: 'center', fontSize: 13, padding: '9px 16px' }}>
                                                Sign in to Apply <ArrowRight size={14} />
                                            </Link>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </main>
    )
}
