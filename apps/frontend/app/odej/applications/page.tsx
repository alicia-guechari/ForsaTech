'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { applicationsApi } from '@/lib/api/client'
import { Check, X, Clock, ArrowLeft } from 'lucide-react'

interface OdejApplicationData {
    id: string
    status: 'pending' | 'approved' | 'rejected'
    appliedAt: string
    user: {
        id: string
        name: string
        email: string
        wilaya: string
    }
    opportunity: {
        id: string
        title: string
        date: string
        wilaya: string
    }
}

export default function OdejApplicationsPage() {
    const { user, isAuthenticated, token } = useAuthStore()
    const router = useRouter()
    const [applications, setApplications] = useState<OdejApplicationData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isAuthenticated || !token) {
            router.push('/odej/signin')
            return
        }

        if (user?.role !== 'odej') {
            router.push('/dashboard/applications')
            return
        }

        fetchApplications()
    }, [isAuthenticated, user, token, router])

    const fetchApplications = async () => {
        try {
            setLoading(true)
            const data = await applicationsApi.getByOdej(token!)
            setApplications(data)
            setError('')
        } catch (err) {
            console.error('Failed to fetch applications:', err)
            setError('Could not load applications. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (appId: string, newStatus: 'approved' | 'rejected') => {
        try {
            const result = await applicationsApi.updateStatus(appId, newStatus, token!)
            setApplications(applications.map(app => app.id === appId ? { ...app, status: newStatus } : app))
        } catch (err) {
            setError('Failed to update application status')
        }
    }

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: { bg: 'rgba(251, 191, 36, 0.15)', text: '#fbbf24', icon: Clock },
            approved: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', icon: Check },
            rejected: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', icon: X },
        }
        const style = styles[status as keyof typeof styles] || styles.pending
        const Icon = style.icon
        return {
            style,
            Icon,
            label: status.charAt(0).toUpperCase() + status.slice(1),
        }
    }

    // Group applications by status
    const pending = applications.filter(a => a.status === 'pending')
    const approved = applications.filter(a => a.status === 'approved')
    const rejected = applications.filter(a => a.status === 'rejected')

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                        <Link href="/odej" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s' }}>
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: 4 }}>Applications Management</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Review and approve/reject applications to your opportunities</p>
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div style={{ padding: 16, borderRadius: 12, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', marginBottom: 20, fontSize: 14 }}>
                            {error}
                        </div>
                    )}

                    {/* Loading state */}
                    {loading && (
                        <div style={{ textAlign: 'center', padding: 60 }}>
                            <div style={{ display: 'inline-block', width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#7c3aed', animation: 'spin 0.8s linear infinite' }} />
                            <p style={{ color: 'var(--text-secondary)', marginTop: 16 }}>Loading applications...</p>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && applications.length === 0 && (
                        <div className="glass" style={{ padding: 60, textAlign: 'center' }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                            <h2 style={{ fontSize: 20, marginBottom: 8 }}>No applications yet</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                                Once users apply to your opportunities, their applications will appear here.
                            </p>
                            <Link href="/odej" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                Back to Dashboard
                            </Link>
                        </div>
                    )}

                    {/* Stats */}
                    {!loading && applications.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 32 }}>
                            <div className="glass" style={{ padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 28, fontWeight: 700, color: '#fbbf24' }}>{pending.length}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Pending Review</div>
                            </div>
                            <div className="glass" style={{ padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>{approved.length}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Approved</div>
                            </div>
                            <div className="glass" style={{ padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 28, fontWeight: 700, color: '#ef4444' }}>{rejected.length}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Rejected</div>
                            </div>
                        </div>
                    )}

                    {/* Pending Applications */}
                    {!loading && pending.length > 0 && (
                        <div style={{ marginBottom: 36 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Clock size={20} style={{ color: '#fbbf24' }} />
                                Pending Review ({pending.length})
                            </h2>
                            <div style={{ display: 'grid', gap: 12 }}>
                                {pending.map(app => (
                                    <div key={app.id} className="glass card-hover" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, color: '#f8f8ff', marginBottom: 6 }}>{app.user.name}</div>
                                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                                                📧 {app.user.email} • 📍 {app.user.wilaya}
                                            </div>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                                Opportunity: {app.opportunity.title}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                onClick={() => updateStatus(app.id, 'approved')}
                                                className="btn-primary"
                                                style={{ padding: '8px 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
                                            >
                                                <Check size={14} /> Approve
                                            </button>
                                            <button
                                                onClick={() => updateStatus(app.id, 'rejected')}
                                                className="btn-secondary"
                                                style={{ padding: '8px 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
                                            >
                                                <X size={14} /> Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Approved Applications */}
                    {!loading && approved.length > 0 && (
                        <div style={{ marginBottom: 36 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Check size={20} style={{ color: '#10b981' }} />
                                Approved ({approved.length})
                            </h2>
                            <div style={{ display: 'grid', gap: 12 }}>
                                {approved.map(app => (
                                    <div key={app.id} className="glass" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, opacity: 0.8 }}>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#f8f8ff', marginBottom: 4 }}>{app.user.name}</div>
                                            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                                                {app.user.email} • {app.opportunity.title}
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 500 }}>
                                            ✓ Approved
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rejected Applications */}
                    {!loading && rejected.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <X size={20} style={{ color: '#ef4444' }} />
                                Rejected ({rejected.length})
                            </h2>
                            <div style={{ display: 'grid', gap: 12 }}>
                                {rejected.map(app => (
                                    <div key={app.id} className="glass" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, opacity: 0.7 }}>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#f8f8ff', marginBottom: 4 }}>{app.user.name}</div>
                                            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                                                {app.user.email} • {app.opportunity.title}
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontWeight: 500 }}>
                                            ✗ Rejected
                                        </span>
                                    </div>
                                ))}
                            </div>
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
