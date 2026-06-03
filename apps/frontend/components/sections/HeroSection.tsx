'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MapPin } from 'lucide-react'
import { useAuthStore } from '@/lib/store/useAuthStore'

export function HeroSection() {
    const { user, isAuthenticated } = useAuthStore()
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '68px',
        }}>
            {/* Radial glow backdrop */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -60%)',
                width: '700px',
                height: '700px',
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Floating orbs */}
            <div style={{
                position: 'absolute', top: '15%', left: '8%',
                width: 200, height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent)',
                animation: 'float 6s ease-in-out infinite',
            }} />
            <div style={{
                position: 'absolute', bottom: '20%', right: '10%',
                width: 150, height: 150,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)',
                animation: 'float 8s ease-in-out infinite reverse',
            }} />

            <div className="container-page" style={{ textAlign: 'center', zIndex: 1, padding: '80px 24px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    {/* Badge */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                        <span className="badge-pill badge-purple">
                            <Sparkles size={12} />
                            ECOHACK '26 – Youth Platform
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontSize: 'clamp(36px, 6vw, 72px)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                        color: '#f8f8ff',
                        marginBottom: 24,
                        maxWidth: '900px',
                        margin: '0 auto 24px',
                    }}>
                        Your Opportunities{' '}
                        <span className="gradient-text">Oriented Around You</span>
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        color: 'rgba(248,248,255,0.65)',
                        maxWidth: '600px',
                        margin: '0 auto 40px',
                        lineHeight: 1.7,
                        fontWeight: 400,
                    }}>
                        Discover training programs, volunteering activities, competitions and events
                        near you — powered by ODEJ across all of Algeria.
                    </p>

                    {/* CTA buttons */}
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
                        {!isAuthenticated ? (
                            <>
                                <Link href="/auth/signup" className="btn-primary" style={{ fontSize: '16px', padding: '14px 28px' }}>
                                    Get Started
                                    <ArrowRight size={18} />
                                </Link>
                                <Link href="/opportunities" className="btn-secondary" style={{ fontSize: '16px', padding: '14px 28px' }}>
                                    Explore Opportunities
                                </Link>
                            </>
                        ) : user?.role === 'odej' ? (
                            <Link href="/odej" className="btn-primary" style={{ fontSize: '16px', padding: '14px 28px' }}>
                                Go to Dashboard
                                <ArrowRight size={18} />
                            </Link>
                        ) : (
                            <Link href="/opportunities" className="btn-primary" style={{ fontSize: '16px', padding: '14px 28px' }}>
                                Explore Opportunities
                                <ArrowRight size={18} />
                            </Link>
                        )}
                    </div>

                    {/* Wilaya indicator */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center', color: 'rgba(248,248,255,0.4)', fontSize: '13px' }}>
                        <MapPin size={14} />
                        Available across all <strong style={{ color: 'rgba(248,248,255,0.7)' }}>68 Wilayas</strong> of Algeria
                    </div>
                </motion.div>

                {/* Hero visual – Network preview */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{ marginTop: 64 }}
                >
                    <HeroNetworkPreview />
                </motion.div>
            </div>
        </section>
    )
}

function HeroNetworkPreview() {
    const bubbles = [
        { x: 50, y: 45, r: 56, label: 'YOU', color: '#7c3aed', isCenter: true },
        { x: 20, y: 25, r: 38, label: 'Robotics\nWorkshop', color: '#5b21b6', score: 95 },
        { x: 78, y: 22, r: 30, label: 'Volunteer\nProgram', color: '#1d4ed8', score: 82 },
        { x: 82, y: 62, r: 34, label: 'Tech\nBoot Camp', color: '#047857', score: 78 },
        { x: 18, y: 68, r: 26, label: 'Arts\nFestival', color: '#9333ea', score: 64 },
        { x: 50, y: 80, r: 22, label: 'Sports\nEvent', color: '#b45309', score: 55 },
        { x: 35, y: 15, r: 20, label: 'Leadership\nCamp', color: '#be123c', score: 48 },
    ]

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '700px',
            margin: '0 auto',
            height: 'clamp(280px, 40vw, 420px)',
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
            border: '1px solid rgba(139,92,246,0.15)',
            borderRadius: '24px',
            overflow: 'hidden',
        }}>
            {/* Connection lines SVG */}
            <svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {bubbles.slice(1).map((b, i) => (
                    <line
                        key={i}
                        x1="50" y1="45"
                        x2={b.x} y2={b.y}
                        stroke={b.color}
                        strokeWidth="0.4"
                        strokeDasharray="1,1"
                    />
                ))}
            </svg>

            {/* Bubbles */}
            {bubbles.map((b, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: i * 0.1 + 0.5,
                        type: 'spring',
                        stiffness: 180,
                    }}
                    style={{
                        position: 'absolute',
                        left: `calc(${b.x}% - ${b.r}px)`,
                        top: `calc(${b.y}% - ${b.r}px)`,
                        width: b.r * 2,
                        height: b.r * 2,
                        borderRadius: '50%',
                        background: b.isCenter
                            ? 'linear-gradient(135deg, #7c3aed, #4f46e5)'
                            : b.color + '30',
                        border: `2px solid ${b.color}`,
                        boxShadow: b.isCenter
                            ? `0 0 30px ${b.color}60`
                            : `0 0 ${b.score ? Math.round(b.score / 5) : 8}px ${b.color}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                        cursor: b.isCenter ? 'default' : 'pointer',
                    }}
                >
                    <span style={{
                        fontSize: b.isCenter ? '10px' : '8px',
                        fontWeight: 700,
                        color: '#f8f8ff',
                        textAlign: 'center',
                        lineHeight: 1.2,
                        whiteSpace: 'pre',
                        padding: '4px',
                    }}>
                        {b.label}
                    </span>
                </motion.div>
            ))}
        </div>
    )
}
