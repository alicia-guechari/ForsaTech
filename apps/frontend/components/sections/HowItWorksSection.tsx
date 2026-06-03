'use client'
import { motion } from 'framer-motion'
import { UserPlus, Bell, Rocket } from 'lucide-react'

const steps = [
    {
        icon: UserPlus,
        color: '#7c3aed',
        number: '01',
        title: 'Subscribe',
        desc: 'Create your account, select your interests and wilaya. Your personalized profile takes just 2 minutes.',
    },
    {
        icon: Bell,
        color: '#3b82f6',
        number: '02',
        title: 'Get Alert',
        desc: 'Our intelligent engine ranks opportunities by interest match, wilaya proximity, event popularity, and urgency.',
    },
    {
        icon: Rocket,
        color: '#10b981',
        number: '03',
        title: 'Participate',
        desc: 'Apply to events, join community initiatives, earn digital achievement badges — and grow.',
    },
]

export function HowItWorksSection() {
    return (
        <section style={{ padding: '100px 24px' }}>
            <div className="container-page">
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <div className="section-label" style={{ display: 'inline-flex', marginBottom: 16 }}>
                        <Rocket size={12} /> How It Works
                    </div>
                    <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 16 }}>
                        Three Steps to Your Next Opportunity
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', fontSize: 17 }}>
                        From sign-up to participation in minutes, not days.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 24,
                }}>
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className="glass card-hover"
                            style={{ padding: 32, position: 'relative', overflow: 'hidden' }}
                        >
                            {/* Step number (watermark) */}
                            <div style={{
                                position: 'absolute',
                                top: -10, right: 16,
                                fontSize: 80,
                                fontWeight: 900,
                                color: step.color,
                                opacity: 0.08,
                                fontFamily: 'Space Grotesk, sans-serif',
                                lineHeight: 1,
                                userSelect: 'none',
                            }}>
                                {step.number}
                            </div>

                            <div style={{
                                width: 52, height: 52,
                                borderRadius: 14,
                                background: step.color + '20',
                                border: `1px solid ${step.color}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: 20,
                            }}>
                                <step.icon size={24} color={step.color} />
                            </div>

                            <h3 style={{ fontSize: 20, marginBottom: 10, color: '#f8f8ff' }}>{step.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: 15 }}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
