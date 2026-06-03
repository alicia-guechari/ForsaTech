'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight, Trophy, Leaf, Code2, Heart } from 'lucide-react'

const CATEGORIES: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    Technology: { icon: <Code2 size={14} />, color: '#60a5fa', bg: 'rgba(59,130,246,0.15)' },
    Environment: { icon: <Leaf size={14} />, color: '#34d399', bg: 'rgba(16,185,129,0.15)' },
    Sports: { icon: <Trophy size={14} />, color: '#fbbf24', bg: 'rgba(245,158,11,0.15)' },
    Volunteering: { icon: <Heart size={14} />, color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
}

const mockOpportunities = [
    {
        id: '1',
        title: 'National Robotics & AI Championship',
        category: 'Technology',
        wilaya: 'Alger',
        date: '2026-07-15',
        capacity: 120,
        remaining: 47,
        odej: 'ODEJ Alger',
    },
    {
        id: '2',
        title: 'Reforestation Volunteer Day – Kabylie',
        category: 'Environment',
        wilaya: 'Béjaïa',
        date: '2026-07-08',
        capacity: 80,
        remaining: 23,
        odej: 'ODEJ Béjaïa',
    },
    {
        id: '3',
        title: 'Regional Youth Football Tournament',
        category: 'Sports',
        wilaya: 'Constantine',
        date: '2026-07-20',
        capacity: 200,
        remaining: 88,
        odej: 'ODEJ Constantine',
    },
    {
        id: '4',
        title: 'Digital Skills Bootcamp – Web Dev',
        category: 'Technology',
        wilaya: 'Oran',
        date: '2026-07-28',
        capacity: 60,
        remaining: 12,
        odej: 'ODEJ Oran',
    },
    {
        id: '5',
        title: 'Community Leadership Program',
        category: 'Volunteering',
        wilaya: 'Sétif',
        date: '2026-08-05',
        capacity: 40,
        remaining: 31,
        odej: 'ODEJ Sétif',
    },
    {
        id: '6',
        title: 'Environmental Awareness Campaign',
        category: 'Environment',
        wilaya: 'Annaba',
        date: '2026-08-10',
        capacity: 100,
        remaining: 65,
        odej: 'ODEJ Annaba',
    },
]

function OpportunityCard({ opp, delay }: { opp: typeof mockOpportunities[0]; delay: number }) {
    const cat = CATEGORIES[opp.category] || CATEGORIES.Technology
    const pct = Math.round(((opp.capacity - opp.remaining) / opp.capacity) * 100)
    const dateStr = new Date(opp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay }}
            className="glass card-hover"
            style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff', lineHeight: 1.4, flex: 1 }}>
                    {opp.title}
                </h3>
                <span style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 10px',
                    borderRadius: 100,
                    background: cat.bg,
                    color: cat.color,
                    fontSize: 12, fontWeight: 600,
                    whiteSpace: 'nowrap',
                }}>
                    {cat.icon}
                    {opp.category}
                </span>
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)', fontSize: 13 }}>
                        <MapPin size={13} /> {opp.wilaya}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)', fontSize: 13 }}>
                        <Calendar size={13} /> {dateStr}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)', fontSize: 13 }}>
                        <Users size={13} /> {opp.remaining} seats left
                    </span>
                </div>

                {/* Capacity bar */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                        <span>{opp.odej}</span>
                        <span>{pct}% full</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${pct}%`, background: cat.color + '80' }} />
                    </div>
                </div>
            </div>

            {/* CTA */}
            <Link href={`/opportunities/${opp.id}`} className="btn-primary" style={{ marginTop: 4, padding: '10px 18px', fontSize: 14, justifyContent: 'center' }}>
                View Details
                <ArrowRight size={15} />
            </Link>
        </motion.div>
    )
}

export function OpportunitiesSection() {
    return (
        <section style={{ padding: '100px 24px', background: 'rgba(139,92,246,0.02)' }}>
            <div className="container-page">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12 }}>
                            <Calendar size={12} /> Discover Opportunities
                        </div>
                        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', marginBottom: 10 }}>Featured Opportunities</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 480 }}>
                            Handpicked events and programs from ODEJ establishments near you.
                        </p>
                    </div>
                    <Link href="/opportunities" className="btn-secondary" style={{ fontSize: 14 }}>
                        View All <ArrowRight size={15} />
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 20,
                }}>
                    {mockOpportunities.map((opp, i) => (
                        <OpportunityCard key={opp.id} opp={opp} delay={i * 0.08} />
                    ))}
                </div>
            </div>
        </section>
    )
}
