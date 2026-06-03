'use client'
import { useRef, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Info, Filter, RefreshCw, X } from 'lucide-react'
import { useAuthStore } from '@/lib/store/useAuthStore'

const CATEGORIES = ['All', 'Technology', 'Environment', 'Sports', 'Volunteering', 'Arts', 'Leadership', 'Entrepreneurship']

const mockOpportunities = [
    { id: '1', title: 'Robotics Championship', category: 'Technology', odej: 'ODEJ Béjaïa', score: 95, color: '#7c3aed' },
    { id: '2', title: 'Web Dev Bootcamp', category: 'Technology', odej: 'ODEJ Alger', score: 88, color: '#5b21b6' },
    { id: '3', title: 'Reforestation Day', category: 'Environment', odej: 'ODEJ Béjaïa', score: 81, color: '#059669' },
    { id: '4', title: 'Football Tournament', category: 'Sports', odej: 'ODEJ Tizi Ouzou', score: 72, color: '#d97706' },
    { id: '5', title: 'Leadership Camp', category: 'Leadership', odej: 'ODEJ Sétif', score: 65, color: '#dc2626' },
    { id: '6', title: 'Arts & Culture', category: 'Arts', odej: 'ODEJ Constantine', score: 58, color: '#9333ea' },
    { id: '7', title: 'Volunteer Day', category: 'Volunteering', odej: 'ODEJ Béjaïa', score: 54, color: '#0891b2' },
    { id: '8', title: 'Startup Pitch', category: 'Entrepreneurship', odej: 'ODEJ Oran', score: 47, color: '#be185d' },
]

interface BubbleState {
    id: string
    x: number
    y: number
    r: number
    vx: number
    vy: number
    title: string
    category: string
    odej: string
    score: number
    color: string
}

function useNetworkGraph(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    opportunities: typeof mockOpportunities,
    userAvatar: string,
    refreshKey: number
) {
    const [hovered, setHovered] = useState<{ opp: (typeof mockOpportunities)[0]; x: number; y: number } | null>(null)
    const [selected, setSelected] = useState<(typeof mockOpportunities)[0] | null>(null)
    const bubblesRef = useRef<BubbleState[]>([])
    const animRef = useRef<number>(0)
    const mouseRef = useRef({ x: -999, y: -999 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let W = canvas.offsetWidth
        let H = canvas.offsetHeight
        canvas.width = W
        canvas.height = H

        const cx = W / 2
        const cy = H / 2

        // Center user bubble
        const centerR = 36

        // Place opportunity bubbles in a gentle random placement
        bubblesRef.current = opportunities.map((opp, i) => {
            const angle = (i / opportunities.length) * Math.PI * 2
            const dist = 120 + (opp.score / 100) * 50
            const r = 12 + (opp.score / 100) * 10
            return {
                ...opp,
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                r,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
            }
        })

        function draw() {
            if (!ctx) return
            const bubbles = bubblesRef.current
            ctx.clearRect(0, 0, W, H)

            // Background grid
            ctx.save()
            ctx.strokeStyle = 'rgba(255,255,255,0.08)'
            ctx.lineWidth = 1
            const gridSize = 32
            for (let x = 0; x <= W; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, H)
                ctx.stroke()
            }
            for (let y = 0; y <= H; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(W, y)
                ctx.stroke()
            }
            ctx.restore()

            // Draw connection lines
            bubbles.forEach(b => {
                ctx.beginPath()
                ctx.strokeStyle = b.color + '30'
                ctx.lineWidth = 1
                ctx.setLineDash([4, 6])
                ctx.moveTo(cx, cy)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
                ctx.setLineDash([])
            })

            // Draw opportunity bubbles
            bubbles.forEach(b => {
                // Soft shadow
                ctx.beginPath()
                ctx.arc(b.x, b.y + 3, b.r + 6, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(0, 0, 0, 0.14)'
                ctx.fill()

                // Glow
                const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 1.4)
                grd.addColorStop(0, b.color + '20')
                grd.addColorStop(1, 'transparent')
                ctx.beginPath()
                ctx.arc(b.x, b.y, b.r * 1.4, 0, Math.PI * 2)
                ctx.fillStyle = grd
                ctx.fill()

                // Main circle
                ctx.beginPath()
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
                ctx.fillStyle = b.color + '18'
                ctx.fill()
                ctx.strokeStyle = b.color + 'b0'
                ctx.lineWidth = 1.2
                ctx.stroke()

                // Label below the node
                ctx.fillStyle = '#f8f8ff'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'top'
                const fontSize = Math.max(10, Math.min(12, b.r / 2.2))
                ctx.font = `600 ${fontSize}px Inter, sans-serif`
                const label = b.title.length > 24 ? b.title.slice(0, 24) + '…' : b.title
                ctx.fillText(label, b.x, b.y + b.r + 8)
            })

            // Draw center (user) bubble
            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerR)
            gradient.addColorStop(0, '#8b5cf6')
            gradient.addColorStop(1, '#4c1d95')
            ctx.beginPath()
            ctx.arc(cx, cy, centerR, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()
            ctx.strokeStyle = '#a78bfa'
            ctx.lineWidth = 2
            ctx.stroke()

            // Center glow
            const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerR * 1.8)
            centerGlow.addColorStop(0, 'rgba(139,92,246,0.3)')
            centerGlow.addColorStop(1, 'transparent')
            ctx.beginPath()
            ctx.arc(cx, cy, centerR * 1.8, 0, Math.PI * 2)
            ctx.fillStyle = centerGlow
            ctx.fill()

            // User initials
            ctx.fillStyle = '#f8f8ff'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = '700 14px Space Grotesk, sans-serif'
            ctx.fillText(userAvatar, cx, cy - 6)
            ctx.font = '500 9px Inter, sans-serif'
            ctx.fillStyle = 'rgba(248,248,255,0.7)'
            ctx.fillText('YOU', cx, cy + 9)
        }

        function physics() {
            bubblesRef.current = bubblesRef.current.map(b => {
                // Attraction to orbit
                const angle = Math.atan2(b.y - cy, b.x - cx)
                const dist = Math.hypot(b.x - cx, b.y - cy)
                const targetDist = 130 + (b.score / 100) * 60
                const forceMag = (dist - targetDist) * 0.003

                let vx = b.vx - Math.cos(angle) * forceMag + (Math.random() - 0.5) * 0.05
                let vy = b.vy - Math.sin(angle) * forceMag + (Math.random() - 0.5) * 0.05

                // Damping
                vx *= 0.98
                vy *= 0.98

                let nx = b.x + vx
                let ny = b.y + vy

                // Bounds
                if (nx - b.r < 0 || nx + b.r > W) { vx *= -0.5; nx = b.x }
                if (ny - b.r < 0 || ny + b.r > H) { vy *= -0.5; ny = b.y }

                return { ...b, x: nx, y: ny, vx, vy }
            })
        }

        function loop() {
            physics()
            draw()
            animRef.current = requestAnimationFrame(loop)
        }
        loop()

        // Handle resize
        function onResize() {
            if (!canvas) return
            W = canvas.offsetWidth
            H = canvas.offsetHeight
            canvas.width = W
            canvas.height = H
        }
        window.addEventListener('resize', onResize)

        // Mouse move for hover
        function onMouseMove(e: MouseEvent) {
            if (!canvas) return
            const rect = canvas.getBoundingClientRect()
            const mx = e.clientX - rect.left
            const my = e.clientY - rect.top
            mouseRef.current = { x: mx, y: my }

            const hit = bubblesRef.current.find(b => Math.hypot(b.x - mx, b.y - my) < b.r)
            if (hit) {
                setHovered({ opp: hit, x: hit.x, y: hit.y })
                canvas.style.cursor = 'pointer'
            } else {
                setHovered(null)
                canvas.style.cursor = 'default'
            }
        }
        canvas.addEventListener('mousemove', onMouseMove)

        function onClick(e: MouseEvent) {
            if (!canvas) return
            const rect = canvas.getBoundingClientRect()
            const mx = e.clientX - rect.left
            const my = e.clientY - rect.top
            const hit = bubblesRef.current.find(b => Math.hypot(b.x - mx, b.y - my) < b.r)
            if (hit) {
                setSelected(hit)
            } else {
                setSelected(null)
            }
        }

        canvas.addEventListener('click', onClick)

        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener('resize', onResize)
            canvas.removeEventListener('mousemove', onMouseMove)
            canvas.removeEventListener('click', onClick)
        }
    }, [canvasRef, opportunities, userAvatar, refreshKey])

    return { hovered, selected, setSelected }
}

export default function NetworkPage() {
    const router = useRouter()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { user, isAuthenticated } = useAuthStore()
    const [refreshKey, setRefreshKey] = useState(0)
    const [filterCategory, setFilterCategory] = useState('All')

    const userProfile = {
        name: user?.name || 'ForsaTech User',
        wilaya: user?.wilaya || 'Alger',
        avatar: user?.avatar || user?.name?.split(' ').map(part => part[0]?.toUpperCase()).join('').slice(0, 2) || 'FT',
    }

    const personalizedOpportunities = isAuthenticated ? mockOpportunities.filter(opp => {
        const matchesWilaya = user?.wilaya ? opp.odej.includes(user.wilaya) : false
        const matchesInterest = user?.interests?.some(interest => opp.category.toLowerCase() === interest.toLowerCase() || opp.category.toLowerCase().includes(interest.toLowerCase()))
        return matchesWilaya || Boolean(matchesInterest)
    }).filter(opp => filterCategory === 'All' || opp.category === filterCategory) : mockOpportunities

    const displayedOpportunities = personalizedOpportunities.length ? personalizedOpportunities : mockOpportunities
    const { hovered, selected, setSelected } = useNetworkGraph(canvasRef, displayedOpportunities, userProfile.avatar, refreshKey)

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
                        <div>
                            <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12 }}>
                                My Opportunity Network
                            </div>
                            <h1 style={{ fontSize: 32, marginBottom: 8 }}>
                                Hello, <span className="gradient-text-purple">{userProfile.name}</span>
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                                {displayedOpportunities.length} opportunities matched to your profile. Bubble size = recommendation score.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={() => {
                                const currentIndex = CATEGORIES.indexOf(filterCategory)
                                const nextIndex = (currentIndex + 1) % CATEGORIES.length
                                setFilterCategory(CATEGORIES[nextIndex])
                            }} className="btn-secondary" style={{ fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Filter size={14} /> Filter: {filterCategory}
                            </button>
                            <button onClick={() => setRefreshKey(k => k + 1)} className="btn-secondary" style={{ fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <RefreshCw size={14} /> Refresh
                            </button>
                        </div>
                    </div>

                    {/* Canvas Container */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(400px, 60vh, 580px)',
                        background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, rgba(5,5,16,0) 70%)',
                        border: '1px solid rgba(139,92,246,0.15)',
                        borderRadius: 24,
                        overflow: 'hidden',
                    }}>
                        <div style={{ filter: isAuthenticated ? 'none' : 'blur(8px)', width: '100%', height: '100%', transition: 'filter 0.4s ease' }}>
                            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
                        </div>

                        {!isAuthenticated && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(5,5,16,0.4)', zIndex: 50, textAlign: 'center', padding: 24
                            }}>
                                <div className="glass" style={{ padding: '32px 40px', borderRadius: 24, border: '1px solid rgba(139,92,246,0.3)' }}>
                                    <h2 style={{ fontSize: 24, marginBottom: 12 }}>Personalized Matches Locked</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 320 }}>
                                        Sign in to see a personalized network of opportunities matched to your interests and location.
                                    </p>
                                    <Link href="/signup" className="btn-primary" style={{ display: 'inline-flex', padding: '12px 32px' }}>
                                        Get Started / Sign In
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Hover tooltip */}
                        {isAuthenticated && hovered && (
                            <div style={{
                                position: 'absolute',
                                left: Math.min(hovered.x + 16, (typeof window !== 'undefined' ? window.innerWidth : 1000) - 220),
                                top: Math.max(hovered.y - 80, 10),
                                minWidth: 190,
                                background: 'rgba(5,5,16,0.97)',
                                border: '1px solid rgba(139,92,246,0.4)',
                                borderRadius: 12,
                                padding: '12px 16px',
                                pointerEvents: 'none',
                                zIndex: 10,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                            }}>
                                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: '#f8f8ff' }}>{hovered.opp.title}</p>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{hovered.opp.odej} · {hovered.opp.category}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Match score</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>{hovered.opp.score}%</span>
                                </div>
                                <div className="progress-bar" style={{ marginTop: 6 }}>
                                    <div className="progress-fill" style={{ width: `${hovered.opp.score}%` }} />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => router.push(`/opportunities/${hovered.opp.id}`)}
                                    style={{
                                        display: 'block', marginTop: 10,
                                        width: '100%', textAlign: 'center', fontSize: 12, fontWeight: 600,
                                        color: '#a78bfa', border: '1px solid rgba(139,92,246,0.35)', background: 'rgba(139,92,246,0.1)',
                                        padding: '8px 6px', borderRadius: 6, cursor: 'pointer'
                                    }}
                                >
                                    View opportunity →
                                </button>
                            </div>
                        )}
                        {isAuthenticated && selected && (
                            <div style={{
                                position: 'absolute',
                                right: 24,
                                top: 24,
                                width: 320,
                                maxWidth: 'calc(100% - 48px)',
                                background: 'rgba(7, 9, 27, 0.95)',
                                border: '1px solid rgba(139,92,246,0.35)',
                                borderRadius: 24,
                                padding: 22,
                                zIndex: 20,
                                boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                    <div>
                                        <p style={{ margin: 0, color: '#a78bfa', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Selected opportunity</p>
                                        <h3 style={{ margin: '10px 0 0', fontSize: 20 }}>{selected.title}</h3>
                                    </div>
                                    <div style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(124,58,237,0.14)', color: '#c4b5fd', fontWeight: 700, fontSize: 12 }}>
                                        {selected.score}% match
                                    </div>
                                </div>
                                <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Category</span>
                                        <strong>{selected.category}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Location</span>
                                        <strong>{selected.odej}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Opportunity ID</span>
                                        <strong>{selected.id}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
                                    <button
                                        type="button"
                                        onClick={() => router.push(`/opportunities/${selected.id}`)}
                                        className="btn-primary"
                                        style={{ flex: '1 1 auto', justifyContent: 'center' }}
                                    >
                                        View opportunity
                                    </button>
                                    <button type="button" onClick={() => setSelected(null)} className="btn-secondary" style={{ flex: '1 1 auto', justifyContent: 'center' }}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Score legend */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass"
                        style={{ marginTop: 24, padding: '16px 24px', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
                            <Info size={14} />
                            Recommendation formula:
                        </div>
                        {[
                            { label: 'Interests match', pct: '40%', color: '#a78bfa' },
                            { label: 'Location', pct: '25%', color: '#60a5fa' },
                            { label: 'Popularity', pct: '20%', color: '#34d399' },
                            { label: 'Activity', pct: '15%', color: '#fbbf24' },
                        ].map(item => (
                            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                                <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                                <span style={{ fontWeight: 700, color: item.color }}>{item.pct}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
