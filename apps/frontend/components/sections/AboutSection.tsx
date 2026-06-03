'use client'
import { motion } from 'framer-motion'
import { Info, Shield, Zap, Globe } from 'lucide-react'

const pillars = [
    { icon: Zap, color: '#a78bfa', title: 'Smart Matching', desc: 'Our scoring engine matches your profile to opportunities with 40% interests, 25% location, 20% popularity, 15% activity.' },
    { icon: Globe, color: '#60a5fa', title: 'Community-Driven', desc: 'Youth publish initiatives, gather support, and ODEJ converts popular demands into real events.' },
    { icon: Shield, color: '#34d399', title: 'Green Architecture', desc: 'Zero AI models. Pure PostgreSQL algorithms. Minimal API payloads. Mobile-first PWA. Carbon-conscious design.' },
]

export function AboutSection() {
    return (
        <section style={{ padding: '100px 24px' }}>
            <div className="container-page">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="lg:grid-cols-2">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="section-label" style={{ display: 'inline-flex', marginBottom: 16 }}>
                            <Info size={12} /> About ForsaTech
                        </div>
                        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', marginBottom: 20, lineHeight: 1.2 }}>
                            A National Platform for Algerian Youth
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75, marginBottom: 16 }}>
                            ForsaTech connects young Algerians with the rich ecosystem of opportunities offered by ODEJ establishments across all 68 wilayas — from technical training and sports to volunteering and cultural events.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75 }}>
                            Built on ECOHACK Green Technology principles, the platform is designed for low data consumption, high performance on mobile networks, and maximum inclusion — serving youth in both metropolitan and remote areas.
                        </p>
                        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <span className="badge-pill badge-purple">Youth Empowerment</span>
                            <span className="badge-pill badge-green">Eco-Friendly</span>
                            <span className="badge-pill badge-blue">ODEJ Official</span>
                            <span className="badge-pill" style={{ background: 'rgba(251,191,36,0.1)', color: '#fcd34d', border: '1px solid rgba(251,191,36,0.2)' }}>68 Wilayas</span>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                    >
                        {pillars.map((p, i) => (
                            <div key={p.title} className="glass" style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                    background: p.color + '15',
                                    border: `1px solid ${p.color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <p.icon size={20} color={p.color} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: '#f8f8ff' }}>{p.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
