'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { opportunitiesApi, applicationsApi } from '@/lib/api/client'
import { ArrowLeft, MapPin, Calendar, Users, CheckCircle, AlertCircle, Loader } from 'lucide-react'

interface OpportunityDetail {
    id: string
    title: string
    description: string
    category: { name: string }
    wilaya: { name: string }
    date: string
    capacity: number
    applications?: Array<any>
    requirements?: string[]
    odej?: { id: string }
    status?: string
    createdAt?: string
}

export default function OpportunityDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { user, isAuthenticated, token } = useAuthStore()
    const [opportunity, setOpportunity] = useState<OpportunityDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [hasApplied, setHasApplied] = useState(false)
    const [applying, setApplying] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const oppId = params.id as string

    useEffect(() => {
        fetchOpportunity()
    }, [oppId])

    const fetchOpportunity = async () => {
        try {
            setLoading(true)
            const data = await opportunitiesApi.getOne(oppId)
            setOpportunity(data)
            
            // Check if user has already applied
            if (isAuthenticated && token && user) {
                try {
                    const apps = await applicationsApi.getMe(token)
                    setHasApplied(apps.some((app: any) => app.opportunity.id === oppId))
                } catch (e) {
                    // Ignore check error
                }
            }
        } catch (err) {
            console.error('Failed to fetch opportunity:', err)
            setError('Could not load opportunity details')
        } finally {
            setLoading(false)
        }
    }

    const handleApply = async () => {
        if (!isAuthenticated || !token) {
            router.push('/auth/signin')
            return
        }

        try {
            setApplying(true)
            await applicationsApi.apply(oppId, token)
            setHasApplied(true)
            setSuccessMessage('Successfully applied to this opportunity! Check your applications for updates.')
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to apply')
        } finally {
            setApplying(false)
        }
    }

    if (loading) {
        return (
            <main>
                <Navbar />
                <div style={{ minHeight: '100vh', padding: '100px 24px 60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Loader size={40} style={{ margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
                        <p style={{ color: 'var(--text-secondary)' }}>Loading opportunity...</p>
                    </div>
                </div>
                <Footer />
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </main>
        )
    }

    if (!opportunity) {
        return (
            <main>
                <Navbar />
                <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                    <div className="container-page">
                        <Link href="/opportunities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#a78bfa', textDecoration: 'none', marginBottom: 24, fontSize: 14 }}>
                            <ArrowLeft size={16} /> Back to Opportunities
                        </Link>
                        <div className="glass" style={{ padding: 60, textAlign: 'center' }}>
                            <AlertCircle size={48} style={{ margin: '0 auto 16px', color: '#ef4444' }} />
                            <h1 style={{ fontSize: 24, marginBottom: 8 }}>{error || 'Opportunity not found'}</h1>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>The opportunity you're looking for doesn't exist or has been removed.</p>
                            <Link href="/opportunities" className="btn-primary">
                                Browse Other Opportunities
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        )
    }

    const appCount = opportunity.applications?.length || 0
    const spotsLeft = Math.max(0, opportunity.capacity - appCount)
    const fillPct = Math.round((appCount / opportunity.capacity) * 100)
    const oppDate = new Date(opportunity.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    const wilaya_name = typeof opportunity.wilaya === 'string' ? opportunity.wilaya : opportunity.wilaya?.name
    const category_name = typeof opportunity.category === 'string' ? opportunity.category : opportunity.category?.name

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page" style={{ maxWidth: 800 }}>
                    {/* Back button */}
                    <Link href="/opportunities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#a78bfa', textDecoration: 'none', marginBottom: 24, fontSize: 14 }}>
                        <ArrowLeft size={16} /> Back to Opportunities
                    </Link>

                    {/* Success message */}
                    {successMessage && (
                        <div style={{ padding: 16, borderRadius: 12, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <CheckCircle size={18} />
                            {successMessage}
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div style={{ padding: 16, borderRadius: 12, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {/* Main content */}
                    <div className="glass" style={{ padding: 40, marginBottom: 24 }}>
                        {/* Header */}
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 6, background: 'rgba(124,58,237,0.2)', color: '#c4b5fd' }}>
                                    {category_name}
                                </span>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                    {opportunity.status?.charAt(0).toUpperCase() + (opportunity.status?.slice(1) || '')}
                                </span>
                            </div>
                            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>
                                {opportunity.title}
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6 }}>
                                {opportunity.description}
                            </p>
                        </div>

                        {/* Info grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>📍 Location</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff' }}>{wilaya_name}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>📅 Date</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff' }}>{oppDate}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>👥 Spots</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff' }}>
                                    {spotsLeft} of {opportunity.capacity} available
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Capacity</div>
                            <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ width: `${fillPct}%`, height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a78bfa)', transition: 'width 0.3s' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                                <span>{appCount} applications</span>
                                <span>{fillPct}% full</span>
                            </div>
                        </div>

                        {/* Requirements */}
                        {opportunity.requirements && opportunity.requirements.length > 0 && (
                            <div style={{ marginBottom: 28 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f8f8ff', marginBottom: 12 }}>Requirements</h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
                                    {opportunity.requirements.map((req, i) => (
                                        <li key={i} style={{ fontSize: 14, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', flexShrink: 0 }} />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Apply Section */}
                    {isAuthenticated ? (
                        <div className="glass" style={{ padding: 24, textAlign: 'center' }}>
                            {hasApplied ? (
                                <div>
                                    <CheckCircle size={48} style={{ margin: '0 auto 16px', color: '#10b981' }} />
                                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#10b981', marginBottom: 8 }}>You've already applied</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                                        We've received your application. Check your applications page for status updates.
                                    </p>
                                    <Link href="/dashboard/applications" className="btn-secondary">
                                        View Your Applications
                                    </Link>
                                </div>
                            ) : spotsLeft > 0 ? (
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                                        {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining. Ready to apply?
                                    </p>
                                    <button
                                        onClick={handleApply}
                                        disabled={applying}
                                        className="btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '12px 24px', opacity: applying ? 0.5 : 1, cursor: applying ? 'not-allowed' : 'pointer' }}
                                    >
                                        {applying ? (
                                            <>
                                                <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Applying...
                                            </>
                                        ) : (
                                            'Apply Now'
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <AlertCircle size={48} style={{ margin: '0 auto 16px', color: '#ef4444' }} />
                                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ef4444', marginBottom: 8 }}>Opportunity is full</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                                        This opportunity has reached its capacity. Check back later for updates.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="glass" style={{ padding: 24, textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                                Sign in to apply for this opportunity
                            </p>
                            <Link href="/auth/signin" className="btn-primary" style={{ display: 'inline-block' }}>
                                Sign in to Apply
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </main>
    )
}
