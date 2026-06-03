'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, HelpCircle } from 'lucide-react'

const faqData = [
    {
        wilaya: 'All Wilayas',
        items: [
            { q: 'What is ForsaTech?', a: 'ForsaTech is Algeria\'s national youth opportunity platform. It connects young people with training programs, volunteering activities, competitions and events offered by ODEJ (Office des Établissements de Jeunesse) across all 68 wilayas.' },
            { q: 'How does the recommendation system work?', a: 'Our intelligent recommendation engine computes a personalized score for each opportunity using interest similarity, wilaya proximity, popularity, and event urgency. Top matches are surfaced first based on your profile.' },
            { q: 'How do I earn achievement badges?', a: 'Badges are awarded automatically after completing a registered event. Each badge contains a unique cryptographic hash linking it to your participation record. You can display them on your profile.' },
            { q: 'What are community initiatives?', a: 'Youth users can propose new events (e.g., "We need a robotics workshop in Béjaïa"). When 50 supporters back the initiative, a notification is sent to the local ODEJ who can accept and create an official event.' },
        ],
    },
    {
        wilaya: 'ODEJ Béjaïa',
        items: [
            { q: 'What activities does ODEJ Béjaïa offer?', a: 'ODEJ Béjaïa offers: sports programs (football, basketball, swimming), cultural events, environmental volunteering, digital skills workshops, and summer holiday camps.' },
            { q: 'What are ODEJ Béjaïa\'s opening hours?', a: 'Monday–Thursday: 8:00–12:00 & 13:30–16:30. Saturday: 8:00–12:00. Closed Fridays and public holidays.' },
        ],
    },
    {
        wilaya: 'ODEJ Sétif',
        items: [
            { q: 'When does ODEJ Sétif open?', a: 'ODEJ Sétif is open Sunday–Thursday: 8:30–16:30. Contact: +213 36 XX XX XX.' },
            { q: 'What are the requirements to register for ODEJ Sétif programs?', a: 'You need: national ID or student card, age 15–35, and a valid ForsaTech account. Some programs require a guardian signature for participants under 18.' },
        ],
    },
]

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div
            style={{
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
            }}
            onClick={() => setOpen(prev => !prev)}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 0',
                gap: 12,
            }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#f8f8ff', lineHeight: 1.4 }}>{q}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0 }}
                >
                    <ChevronDown size={18} color="rgba(248,248,255,0.5)" />
                </motion.div>
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, paddingBottom: 18 }}>
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQSection() {
    const [query, setQuery] = useState('')
    const [activeWilaya, setActiveWilaya] = useState('All Wilayas')

    const filtered = faqData
        .filter(group => activeWilaya === 'All Wilayas' || group.wilaya === activeWilaya)
        .flatMap(group => group.items)
        .filter(item =>
            !query || item.q.toLowerCase().includes(query.toLowerCase()) || item.a.toLowerCase().includes(query.toLowerCase())
        )

    const wilayas = faqData.map(g => g.wilaya)

    return (
        <section style={{ padding: '100px 24px', background: 'rgba(139,92,246,0.02)' }}>
            <div className="container-page" style={{ maxWidth: 800, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div className="section-label" style={{ display: 'inline-flex', marginBottom: 16 }}>
                        <HelpCircle size={12} /> Smart FAQ
                    </div>
                    <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', marginBottom: 12 }}>
                        Got Questions? Find Answers Fast
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
                        Each ODEJ manages its own FAQ. Search or filter by wilaya.
                    </p>
                </div>

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: 20 }}>
                    <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        className="input-dark"
                        style={{ paddingLeft: 40 }}
                        placeholder='e.g. "What activities does ODEJ Béjaïa offer?"'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>

                {/* Wilaya filter tabs */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                    {wilayas.map(w => (
                        <button
                            key={w}
                            onClick={() => setActiveWilaya(w)}
                            style={{
                                padding: '6px 16px',
                                borderRadius: 100,
                                border: '1px solid',
                                borderColor: activeWilaya === w ? 'var(--neon-purple)' : 'var(--border-color)',
                                background: activeWilaya === w ? 'rgba(139,92,246,0.15)' : 'transparent',
                                color: activeWilaya === w ? '#c4b5fd' : 'var(--text-secondary)',
                                fontSize: 13, fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {w}
                        </button>
                    ))}
                </div>

                {/* FAQ list */}
                <div className="glass" style={{ padding: '0 24px' }}>
                    {filtered.length === 0 ? (
                        <p style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                            No results found for "{query}". Try a different query.
                        </p>
                    ) : (
                        filtered.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)
                    )}
                </div>
            </div>
        </section>
    )
}
