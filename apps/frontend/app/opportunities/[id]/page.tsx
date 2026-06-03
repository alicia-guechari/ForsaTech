'use client'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Calendar, MapPin, Users, Clock, Award, BookmarkPlus,
    Building2, CheckCircle2, ArrowLeft, BookmarkCheck, Share2
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store/useAppStore'
import { useAuthStore } from '@/lib/store/useAuthStore'

export default function OpportunityDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string

    const offer = useAppStore(state => state.offers.find(o => o.id === id))
    const applications = useAppStore(state => state.applications)
    const applyToOffer = useAppStore(state => state.applyToOffer)

    const { user, isAuthenticated, toggleSaveOffer } = useAuthStore()

    if (!offer) {
        return (
            <main>
                <Navbar />
                <div style={{ minHeight: '100vh', padding: '100px 24px', textAlign: 'center' }}>
                    <h1 style={{ color: '#f8f8ff', fontSize: 24, marginBottom: 20 }}>Opportunity not found</h1>
                    <Link href="/opportunities" className="btn-secondary" style={{ display: 'inline-flex' }}>Go Back</Link>
                </div>
            </main>
        )
    }

    const hasApplied = user ? applications.some(app => app.offerId === offer.id && app.userId === user.id) : false
    const isSaved = user?.savedOffers?.includes(offer.id) || false
    const requirements = [
        'Age 16–35',
        'ForsaTech account required',
        'National ID or student card',
    ]

    const handleApply = () => {
        if (!isAuthenticated || !user) {
            if (confirm('Authentication required. Sign in?')) router.push('/auth/signin')
            return
        }
        applyToOffer(offer.id, user)
        alert('Application submitted successfully!')
    }

    const handleSave = () => {
        if (!isAuthenticated || !user) {
            if (confirm('Authentication required. Sign in?')) router.push('/auth/signin')
            return
        }
        toggleSaveOffer(offer.id)
    }

    const pct = Math.round((offer.registered / offer.capacity) * 100)
    const dateStr = new Date(offer.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    {/* Back */}
                    <Link href="/opportunities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, marginBottom: 28 }}>
                        <ArrowLeft size={15} /> Back to Opportunities
                    </Link>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }}>
                        {/* Main content */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            {/* Header */}
                            <div className="glass" style={{ padding: 32, marginBottom: 20 }}>
                                <span className="badge-pill badge-blue" style={{ marginBottom: 16 }}>{offer.category}</span>
                                <h1 style={{ fontSize: 'clamp(22px, 3vw, 32px)', marginBottom: 16, lineHeight: 1.25 }}>{offer.title}</h1>

                                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14 }}><MapPin size={15} />{offer.wilaya}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14 }}><Calendar size={15} />{dateStr}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14 }}><Clock size={15} />{offer.duration}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14 }}><Building2 size={15} />{offer.odej}</span>
                                </div>

                                {/* Capacity */}
                                <div style={{ marginBottom: 4 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Users size={13} /> {offer.registered} / {offer.capacity} registered</span>
                                        <span style={{ color: offer.remaining < 20 ? '#f87171' : '#a78bfa' }}>{offer.remaining} seats left</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${pct}%`, background: offer.remaining < 20 ? '#f87171' : undefined }} />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="glass" style={{ padding: 28, marginBottom: 20 }}>
                                <h2 style={{ fontSize: 18, marginBottom: 16 }}>About this Opportunity</h2>
                                {offer.desc.split('\n\n').map((para, i) => (
                                    <p key={i} style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>{para}</p>
                                ))}
                            </div>

                            {/* Requirements */}
                            <div className="glass" style={{ padding: 28, marginBottom: 20 }}>
                                <h2 style={{ fontSize: 18, marginBottom: 16 }}>Requirements</h2>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {requirements.map((req, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 14 }}>
                                            <CheckCircle2 size={15} color="#34d399" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Location */}
                            <div className="glass" style={{ padding: 28 }}>
                                <h2 style={{ fontSize: 18, marginBottom: 16 }}>Location</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14, marginBottom: 14 }}>
                                    <MapPin size={15} /> {offer.location}
                                </div>
                                <div className="map-container">
                                    <div style={{ textAlign: 'center' }}>
                                        <MapPin size={24} color="rgba(139,92,246,0.5)" />
                                        <p style={{ marginTop: 8, fontSize: 13 }}>Map view</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 88 }}
                        >
                            {/* Apply card */}
                            <div className="glass-purple" style={{ padding: 24 }}>
                                <h3 style={{ fontSize: 17, color: '#f8f8ff', marginBottom: 6 }}>Ready to join?</h3>
                                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>
                                    Apply now to secure your place. ODEJ will confirm your registration.
                                </p>
                                <button onClick={handleApply} disabled={hasApplied || offer.remaining <= 0} className={hasApplied ? 'btn-secondary' : 'btn-primary'} style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }}>
                                    {hasApplied ? 'Applied ✓' : offer.remaining <= 0 ? 'Full' : 'Apply Now'}
                                </button>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={handleSave} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: 13, padding: '9px', background: isSaved ? 'rgba(167, 139, 250, 0.15)' : undefined }}>
                                        {isSaved ? <BookmarkCheck size={14} color="#a78bfa" /> : <BookmarkPlus size={14} />}
                                        {isSaved ? 'Saved' : 'Save'}
                                    </button>
                                </div>
                            </div>

                            {/* Badge preview */}
                            <div className="glass" style={{ padding: 20, textAlign: 'center' }}>
                                <Award size={32} color="#fbbf24" style={{ margin: '0 auto 10px' }} />
                                <p style={{ fontSize: 14, fontWeight: 600, color: '#f8f8ff', marginBottom: 4 }}>Achievement Badge</p>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    Complete this event to earn a unique digital badge with cryptographic proof of participation.
                                </p>
                            </div>

                            {/* ODEJ info */}
                            <div className="glass" style={{ padding: 20 }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hosted by</p>
                                <p style={{ fontSize: 15, fontWeight: 600, color: '#f8f8ff', marginBottom: 6 }}>{offer.odej}</p>
                                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{offer.wilaya}, Algeria</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
