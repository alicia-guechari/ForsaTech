'use client'
import Link from 'next/link'
import { Zap, Github, Twitter, MapPin } from 'lucide-react'

export function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer style={{
            borderTop: '1px solid var(--border-color)',
            padding: '60px 24px 32px',
        }}>
            <div className="container-page">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 40,
                    marginBottom: 48,
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 32, height: 32,
                                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                                borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Zap size={15} color="white" strokeWidth={2.5} />
                            </div>
                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17, color: '#f8f8ff' }}>
                                Forsa<span style={{ color: '#a78bfa' }}>Tech</span>
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>
                            Connecting Algerian youth with opportunities across all 68 wilayas. Powered by ODEJ.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13 }}>
                            <MapPin size={13} />
                            Algeria · فرصتك
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Platform</h4>
                        {[
                            ['Opportunities', '/opportunities'],
                            ['Initiatives', '/initiatives'],
                            ['My Network', '/dashboard/network'],
                            ['Dashboard', '/dashboard'],
                        ].map(([label, href]) => (
                            <Link key={href} href={href} style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}>
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* ODEJ */}
                    <div>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>ODEJ</h4>
                        {[
                            ['ODEJ Dashboard', '/odej'],
                            ['Manage Opportunities', '/odej/opportunities'],
                            ['Review Initiatives', '/odej/initiatives'],
                            ['FAQ Management', '/odej/faq'],
                        ].map(([label, href]) => (
                            <Link key={href} href={href} style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}>
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Info */}
                    <div>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Info</h4>
                        {[
                            ['About', '/#about'],
                            ['FAQ', '/#faq'],
                            ['Privacy Policy', '/privacy'],
                            ['Terms of Use', '/terms'],
                        ].map(([label, href]) => (
                            <Link key={href} href={href} style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="divider" />
                <div style={{
                    paddingTop: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 12,
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                        © {year} ForsaTech · Built for ECOHACK '26 · Green Technology Principles
                    </p>
                    <span className="badge-pill badge-green" style={{ fontSize: 11 }}>
                        🌱 Low-carbon platform
                    </span>
                </div>
            </div>
        </footer>
    )
}
