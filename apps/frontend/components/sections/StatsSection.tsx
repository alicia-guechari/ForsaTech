'use client'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const stats = [
    { value: '68', label: 'Wilayas Covered', suffix: '' },
    { value: '1,200', label: 'Active Opportunities', suffix: '+' },
    { value: '45,000', label: 'Youth Registered', suffix: '+' },
    { value: '230', label: 'ODEJ Establishments', suffix: '' },
]

export function StatsSection() {
    return (
        <section style={{ padding: '60px 24px 0' }}>
            <div className="container-page">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 16,
                }}>
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="glass"
                            style={{ padding: '24px 20px', textAlign: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2, marginBottom: 6 }}>
                                <span style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontSize: 'clamp(24px, 3vw, 36px)',
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>{s.value}</span>
                                <span style={{ color: '#a78bfa', fontSize: 20, fontWeight: 700 }}>{s.suffix}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
