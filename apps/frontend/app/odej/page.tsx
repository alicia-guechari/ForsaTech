'use client'
import { useMemo, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAppStore } from '@/lib/store/useAppStore'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    LayoutDashboard, Plus, Users, Lightbulb, HelpCircle,
    BarChart3, CheckCircle2, XCircle, FileText, ArrowUpRight, TrendingUp, Calendar, Check, X
} from 'lucide-react'

const recentInitiatives = [
    { id: '1', title: 'Robotics Workshop Béjaïa', supporters: 47, threshold: 50, pct: 94 },
    { id: '2', title: 'Street Art Festival', supporters: 32, threshold: 50, pct: 64 },
]

const defaultFormState = {
    title: '',
    category: 'Environment',
    wilaya: 'Béjaïa',
    date: '',
    capacity: 40,
    location: '',
    duration: '1 day',
    desc: '',
}

export default function OdejDashboardPage() {
    const [activeTab, setActiveTab] = useState('overview')
    const offers = useAppStore(state => state.offers)
    const addOffer = useAppStore(state => state.addOffer)
    const updateOffer = useAppStore(state => state.updateOffer)
    const deleteOffer = useAppStore(state => state.deleteOffer)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editOfferId, setEditOfferId] = useState<string | null>(null)
    const [createForm, setCreateForm] = useState(defaultFormState)
    const [editForm, setEditForm] = useState(defaultFormState)
    const [formError, setFormError] = useState('')
    const user = useAuthStore(state => state.user)

    const applications = useAppStore(state => state.applications)
    const updateApplicationStatus = useAppStore(state => state.updateApplicationStatus)

    const userOffers = useMemo(
        () => offers.filter(offer => offer.odej === user?.name || offer.wilaya === user?.wilaya),
        [offers, user]
    )

    const pendingApplications = useMemo(
        () => applications.filter(app => app.status === 'pending' && userOffers.some(o => o.id === app.offerId)),
        [applications, userOffers]
    )

    const summary = useMemo(() => ({
        totalOffers: userOffers.length,
        totalRegistered: userOffers.reduce((acc, offer) => acc + offer.registered, 0),
        totalApplicants: userOffers.reduce((acc, offer) => acc + offer.applicants, 0),
        totalOpen: userOffers.filter(offer => offer.status === 'Open').length,
    }), [userOffers])

    const mockStats = [
        { label: 'Posted Offers', value: String(summary.totalOffers), icon: LayoutDashboard, color: '#a78bfa' },
        { label: 'Total Registered', value: String(summary.totalRegistered), icon: Users, color: '#34d399' },
        { label: 'Pending Applicants', value: String(summary.totalApplicants), icon: FileText, color: '#fbbf24' },
        { label: 'Open Listings', value: String(summary.totalOpen), icon: Lightbulb, color: '#f87171' },
    ]

    function handleCreateInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setCreateForm(prev => ({ ...prev, [name]: name === 'capacity' ? Number(value) : value }))
    }

    function handleCreateSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!createForm.title.trim() || !createForm.location.trim() || !createForm.date || !createForm.desc.trim()) {
            setFormError('Please complete all required fields.')
            return
        }

        const newOffer = {
            id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            title: createForm.title.trim(),
            category: createForm.category,
            wilaya: createForm.wilaya,
            date: createForm.date,
            capacity: createForm.capacity,
            registered: 0,
            remaining: createForm.capacity,
            odej: user?.name || 'ODEJ Partner',
            applicants: 0,
            status: 'Open',
            desc: createForm.desc.trim(),
            location: createForm.location.trim(),
            duration: createForm.duration,
        }

        addOffer(newOffer)
        setFormError('')
        setCreateForm(defaultFormState)
        setShowCreateModal(false)
    }

    function openEditModal(offer: typeof defaultFormState & { id: string }) {
        setEditOfferId(offer.id)
        setEditForm({
            title: offer.title,
            category: offer.category,
            wilaya: offer.wilaya,
            date: offer.date,
            capacity: offer.capacity,
            location: offer.location,
            duration: offer.duration,
            desc: offer.desc,
        })
        setFormError('')
        setShowEditModal(true)
    }

    function handleEditInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setEditForm(prev => ({ ...prev, [name]: name === 'capacity' ? Number(value) : value }))
    }

    function handleEditSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!editOfferId) return
        if (!editForm.title.trim() || !editForm.location.trim() || !editForm.date || !editForm.desc.trim()) {
            setFormError('Please complete all required fields.')
            return
        }

        updateOffer(editOfferId, {
            title: editForm.title.trim(),
            category: editForm.category,
            wilaya: editForm.wilaya,
            date: editForm.date,
            capacity: editForm.capacity,
            remaining: Math.max(0, editForm.capacity - (offers.find(o => o.id === editOfferId)?.registered ?? 0)),
            desc: editForm.desc.trim(),
            location: editForm.location.trim(),
            duration: editForm.duration,
        })

        setFormError('')
        setShowEditModal(false)
        setEditOfferId(null)
    }

    function handleRemoveOffer(offerId: string) {
        if (!window.confirm('Delete this offer? This action cannot be undone.')) return
        deleteOffer(offerId)
    }

    return (
        <main>
            <Navbar />
            <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
                <div className="container-page">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                        <div>
                            <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12 }}>
                                ODEJ Administration
                            </div>
                            <h1 style={{ fontSize: 32 }}>
                                Dashboard — <span style={{ color: '#a78bfa' }}>{user?.name || 'ODEJ Partner'}</span>
                            </h1>
                            <p style={{ marginTop: 8, color: 'var(--text-secondary)' }}>
                                {user ? `Managing offers for ${user.wilaya || 'your wilaya'}` : 'Sign in to view your posted ODEJ opportunities.'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                                <Plus size={18} /> New Opportunity
                            </button>
                            <Link href="/odej/approvals" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                <CheckCircle2 size={18} /> Approve Initiatives
                            </Link>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                        {mockStats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="stat-card"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <s.icon size={18} color={s.color} />
                                    <span style={{ fontSize: 11, color: '#34d399', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <ArrowUpRight size={12} /> +12%
                                    </span>
                                </div>
                                <p className="stat-number" style={{ color: s.color }}>{s.value}</p>
                                <p className="stat-label">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {showCreateModal && (
                        <div style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(5, 5, 16, 0.82)',
                            padding: 24,
                        }}>
                            <div style={{
                                width: '100%',
                                maxWidth: 620,
                                background: 'rgba(10, 10, 28, 0.95)',
                                borderRadius: 24,
                                border: '1px solid rgba(139,92,246,0.2)',
                                boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
                                padding: '28px 30px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                    <div>
                                        <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#a78bfa', margin: 0 }}>New ODEJ Opportunity</p>
                                        <h2 style={{ fontSize: 24, margin: '10px 0 0', color: '#f8f8ff' }}>Add a new offer</h2>
                                    </div>
                                    <button onClick={() => setShowCreateModal(false)} style={{
                                        border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18,
                                    }}>✕</button>
                                </div>
                                <form onSubmit={handleCreateSubmit} style={{ display: 'grid', gap: 18 }}>
                                    {formError && (
                                        <div style={{ padding: 12, background: 'rgba(248,113,113,0.12)', color: '#fee2e2', borderRadius: 14 }}>
                                            {formError}
                                        </div>
                                    )}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Title</label>
                                            <input name="title" value={createForm.title} onChange={handleCreateInput} required className="input-dark" placeholder="Reforestation Volunteer Day" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Category</label>
                                            <select name="category" value={createForm.category} onChange={handleCreateInput} className="input-dark" style={{ appearance: 'none' }}>
                                                <option>Environment</option>
                                                <option>Training</option>
                                                <option>Sports</option>
                                                <option>Arts</option>
                                                <option>Leadership</option>
                                                <option>Volunteering</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Wilaya</label>
                                            <input name="wilaya" value={createForm.wilaya} onChange={handleCreateInput} className="input-dark" placeholder="Béjaïa" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Date</label>
                                            <input name="date" type="date" value={createForm.date} onChange={handleCreateInput} required className="input-dark" />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Capacity</label>
                                            <input name="capacity" type="number" min={1} value={createForm.capacity} onChange={handleCreateInput} className="input-dark" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Duration</label>
                                            <input name="duration" value={createForm.duration} onChange={handleCreateInput} className="input-dark" placeholder="1 day" />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Location</label>
                                        <input name="location" value={createForm.location} onChange={handleCreateInput} className="input-dark" placeholder="Béjaïa Forest Park" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Description</label>
                                        <textarea name="desc" value={createForm.desc} onChange={handleCreateInput} rows={5} className="input-dark" placeholder="Describe the opportunity, what participants will do, and what’s included." />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
                                        <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary" style={{ minWidth: 120, justifyContent: 'center' }}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn-primary" style={{ minWidth: 160, justifyContent: 'center' }}>
                                            Create opportunity
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {showEditModal && (
                        <div style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(5, 5, 16, 0.82)',
                            padding: 24,
                        }}>
                            <div style={{
                                width: '100%',
                                maxWidth: 620,
                                background: 'rgba(10, 10, 28, 0.95)',
                                borderRadius: 24,
                                border: '1px solid rgba(139,92,246,0.2)',
                                boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
                                padding: '28px 30px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                    <div>
                                        <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#a78bfa', margin: 0 }}>Edit Opportunity</p>
                                        <h2 style={{ fontSize: 24, margin: '10px 0 0', color: '#f8f8ff' }}>Update your offer</h2>
                                    </div>
                                    <button onClick={() => setShowEditModal(false)} style={{
                                        border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18,
                                    }}>✕</button>
                                </div>
                                <form onSubmit={handleEditSubmit} style={{ display: 'grid', gap: 18 }}>
                                    {formError && (
                                        <div style={{ padding: 12, background: 'rgba(248,113,113,0.12)', color: '#fee2e2', borderRadius: 14 }}>
                                            {formError}
                                        </div>
                                    )}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Title</label>
                                            <input name="title" value={editForm.title} onChange={handleEditInput} required className="input-dark" placeholder="Reforestation Volunteer Day" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Category</label>
                                            <select name="category" value={editForm.category} onChange={handleEditInput} className="input-dark" style={{ appearance: 'none' }}>
                                                <option>Environment</option>
                                                <option>Training</option>
                                                <option>Sports</option>
                                                <option>Arts</option>
                                                <option>Leadership</option>
                                                <option>Volunteering</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Wilaya</label>
                                            <input name="wilaya" value={editForm.wilaya} onChange={handleEditInput} className="input-dark" placeholder="Béjaïa" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Date</label>
                                            <input name="date" type="date" value={editForm.date} onChange={handleEditInput} required className="input-dark" />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Capacity</label>
                                            <input name="capacity" type="number" min={1} value={editForm.capacity} onChange={handleEditInput} className="input-dark" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Duration</label>
                                            <input name="duration" value={editForm.duration} onChange={handleEditInput} className="input-dark" placeholder="1 day" />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Location</label>
                                        <input name="location" value={editForm.location} onChange={handleEditInput} className="input-dark" placeholder="Béjaïa Forest Park" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Description</label>
                                        <textarea name="desc" value={editForm.desc} onChange={handleEditInput} rows={5} className="input-dark" placeholder="Describe the opportunity, what participants will do, and what’s included." />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
                                        <button type="button" onClick={() => setShowEditModal(false)} className="btn-secondary" style={{ minWidth: 120, justifyContent: 'center' }}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn-primary" style={{ minWidth: 160, justifyContent: 'center' }}>
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div className="glass" style={{ padding: 24 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <h2 style={{ fontSize: 18, color: '#f8f8ff', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Users size={18} color="#a78bfa" /> My Posted Opportunities
                                    </h2>
                                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                                        {userOffers.length} offer{userOffers.length === 1 ? '' : 's'} listed
                                    </span>
                                </div>

                                {userOffers.length === 0 ? (
                                    <div style={{ padding: 24, background: 'rgba(255,255,255,0.03)', borderRadius: 16 }}>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                                            No posted offers found for your ODEJ yet. Create a new opportunity to start receiving applications.
                                        </p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gap: 18 }}>
                                        {userOffers.map(offer => (
                                            <div key={offer.id} className="glass" style={{ padding: 20, borderRadius: 20 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
                                                    <div>
                                                        <p style={{ fontSize: 13, color: '#a78bfa', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{offer.category}</p>
                                                        <h3 style={{ fontSize: 20, margin: 0, color: '#f8f8ff' }}>{offer.title}</h3>
                                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8 }}>
                                                            {offer.location} · {new Date(offer.date).toLocaleDateString('en-GB')} · {offer.duration}
                                                        </p>
                                                    </div>
                                                    <span style={{ fontSize: 12, color: '#a78bfa', background: 'rgba(167,139,250,0.15)', padding: '8px 12px', borderRadius: 999 }}>
                                                        {offer.status}
                                                    </span>
                                                </div>

                                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 18 }}>{offer.desc}</p>

                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginBottom: 18 }}>
                                                    <div style={{ padding: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 16 }}>
                                                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Capacity</p>
                                                        <p style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff' }}>{offer.capacity}</p>
                                                    </div>
                                                    <div style={{ padding: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 16 }}>
                                                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Registered</p>
                                                        <p style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff' }}>{offer.registered}</p>
                                                    </div>
                                                    <div style={{ padding: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 16 }}>
                                                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Applicants</p>
                                                        <p style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff' }}>{offer.applicants}</p>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                                    <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
                                                        <span>{offer.registered} registered</span>
                                                        <span>· {offer.remaining} seats left</span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                        <button
                                                            onClick={() => openEditModal(offer)}
                                                            className="btn-secondary"
                                                            style={{ padding: '10px 16px', fontSize: 13, minWidth: 110 }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemoveOffer(offer.id)}
                                                            className="btn-secondary"
                                                            style={{ padding: '10px 16px', fontSize: 13, minWidth: 110, borderColor: 'rgba(248,113,113,0.3)', color: '#f87171' }}
                                                        >
                                                            Delete
                                                        </button>
                                                        <Link href={`/opportunities/${offer.id}`} className="btn-secondary" style={{ padding: '10px 16px', fontSize: 13, minWidth: 150 }}>
                                                            View offer details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Pending Applications section */}
                            {pendingApplications.length > 0 && (
                                <div className="glass" style={{ padding: 24, border: '1px solid rgba(251,191,36,0.3)' }}>
                                    <h2 style={{ fontSize: 18, color: '#f8f8ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <FileText size={18} color="#fbbf24" /> Pending Applications
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {pendingApplications.map(app => {
                                            const offer = userOffers.find(o => o.id === app.offerId)
                                            return (
                                                <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 16 }}>
                                                    <div>
                                                        <p style={{ fontWeight: 600, color: '#f8f8ff' }}>{app.userName}</p>
                                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                                                            Applied for <span style={{ color: '#a78bfa' }}>{offer?.title}</span> · {app.userWilaya}
                                                        </p>
                                                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                                                            {new Date(app.date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button className="btn-secondary" onClick={() => updateApplicationStatus(app.id, 'rejected')} style={{ padding: 8, color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}>
                                                            <X size={16} /> Reject
                                                        </button>
                                                        <button className="btn-primary" onClick={() => updateApplicationStatus(app.id, 'accepted')} style={{ padding: 8, background: '#34d399', color: '#000' }}>
                                                            <Check size={16} /> Accept
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="glass" style={{ padding: 24 }}>
                                <h2 style={{ fontSize: 18, color: '#f8f8ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <BarChart3 size={18} color="#60a5fa" /> Recruitment Trends
                                </h2>
                                <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 12, padding: '0 10px' }}>
                                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} style={{ flex: 1, position: 'relative' }}>
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                                style={{
                                                    background: 'linear-gradient(to top, #7c3aed, #a78bfa)',
                                                    borderRadius: '4px 4px 0 0',
                                                    width: '100%'
                                                }}
                                            />
                                            <span style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: 'var(--text-muted)' }}>
                                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div className="glass" style={{ padding: 20 }}>
                                <h3 style={{ fontSize: 16, color: '#f8f8ff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Lightbulb size={18} color="#fbbf24" /> Local Initiatives
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {recentInitiatives.map(ini => (
                                        <div key={ini.id}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                                                <span style={{ color: '#f8f8ff', fontWeight: 500 }}>{ini.title}</span>
                                                <span style={{ color: '#a78bfa' }}>{ini.pct}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: `${ini.pct}%` }} />
                                            </div>
                                            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                                                {ini.supporters} / {ini.threshold} supporters
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/odej/initiatives" className="btn-secondary" style={{ width: '100%', marginTop: 20, fontSize: 12, padding: '8px' }}>
                                    Review All
                                </Link>
                            </div>

                            <div className="glass" style={{ padding: 20 }}>
                                <h3 style={{ fontSize: 16, color: '#f8f8ff', marginBottom: 16 }}>Admin Tools</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {[
                                        { label: 'Manage FAQ', icon: HelpCircle, href: '/odej/faq' },
                                        { label: 'Export Statistics', icon: FileText, href: '/odej/stats' },
                                        { label: 'Public Announcements', icon: TrendingUp, href: '/odej/news' },
                                    ].map(item => (
                                        <Link key={item.label} href={item.href} style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            padding: '10px 12px', borderRadius: 10,
                                            color: 'var(--text-secondary)', textDecoration: 'none',
                                            fontSize: 14, background: 'rgba(255,255,255,0.03)'
                                        }}>
                                            <item.icon size={16} />
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
