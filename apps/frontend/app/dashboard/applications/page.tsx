'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { applicationsApi } from '@/lib/api/client'
import { Check, X, Clock, Trash2, ArrowLeft } from 'lucide-react'

interface ApplicationData {
    id: string
    status: 'pending' | 'approved' | 'rejected'
    appliedAt: string
    opportunity: {
        id: string
        title: string
        date: string
        wilaya: string
        category: { name: string }
        odej: { id: string }
    }
}

export default function ApplicationsPage() {
    const { user, isAuthenticated, token } = useAuthStore()
    const router = useRouter()
    const [applications, setApplications] = useState<ApplicationData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isAuthenticated || !token) {
            router.push('/auth/signin')
            return
        }

        if (user?.role === 'odej') {
            router.push('/odej/applications')
            return
        }

        fetchApplications()
    }, [isAuthenticated, user, token, router])

    const fetchApplications = async () => {
        try {
            setLoading(true)
            const data = await applicationsApi.getMe(token!)
            setApplications(data)
            setError('')
        } catch (err) {
            console.error('Failed to fetch applications:', err)
            setError('Could not load your applications. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (appId: string) => {
        if (!window.confirm('Are you sure you want to withdraw this application?')) return

        try {
            await applicationsApi.delete(appId, token!)
            setApplications(applications.filter(app => app.id !== appId))
        } catch (err) {
            setError('Failed to withdraw application')
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

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    {/* Header with back button */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                        <Link href="/dashboard/network" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s' }}>
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: 4 }}>My Applications</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Track and manage your opportunity applications</p>
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
                            <p style={{ color: 'var(--text-secondary)', marginTop: 16 }}>Loading your applications...</p>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && applications.length === 0 && (
                        <div className="glass" style={{ padding: 60, textAlign: 'center' }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                            <h2 style={{ fontSize: 20, marginBottom: 8 }}>No applications yet</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                                Start exploring opportunities and apply to programs that match your interests.
                            </p>
                            <Link href="/opportunities" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                Browse Opportunities
                            </Link>
                        </div>
                    )}

                    {/* Applications list */}
                    {!loading && applications.length > 0 && (
                        <div style={{ display: 'grid', gap: 16 }}>
                            {applications.map(app => {
                                const { style, Icon, label } = getStatusBadge(app.status)
                                const appDate = new Date(app.appliedAt).toLocaleDateString('en-GB', { day: 'short', month: 'short', year: 'numeric' })
                                const oppDate = new Date(app.opportunity.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                return (
                                    <div key={app.id} className="glass card-hover" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                                <Link href={`/opportunities`} style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff', textDecoration: 'none' }}>
                                                    {app.opportunity.title}
                                                </Link>
                                                <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: style.bg, color: style.text, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <Icon size={12} />
                                                    {label}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--text-secondary)' }}>
                                                <span>📍 {app.opportunity.wilaya}</span>
                                                <span>📅 {oppDate}</span>
                                                <span style={{ color: 'var(--text-muted)' }}>Applied {appDate}</span>
                                            </div>
                                        </div>
                                        {app.status === 'pending' && (
                                            <button
                                                onClick={() => handleDelete(app.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 10,
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={e => {
                                                    (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.2)'
                                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239, 68, 68, 0.4)'
                                                }}
                                                onMouseLeave={e => {
                                                    (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.1)'
                                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239, 68, 68, 0.2)'
                                                }}
                                                title="Withdraw application"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
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
