'use client'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { Menu, X, Bell, User, Zap } from 'lucide-react'

import { useAppStore } from '@/lib/store/useAppStore'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { usePathname, useRouter } from 'next/navigation'

export function Navbar() {
    const { user, isAuthenticated, logout } = useAuthStore()
    const pathname = usePathname()
    const router = useRouter()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [hydrated, setHydrated] = useState(false)
    const notifications = useAppStore(state => state.notifications)

    // Wait for Zustand to hydrate from localStorage before rendering
    useEffect(() => {
        setHydrated(true)
    }, [])

    const isOdejMode = (user?.role === 'odej') || pathname?.startsWith('/odej')

    const notificationCount = useMemo(() => {
        if (!user) return 0
        return notifications.filter(note => !note.read && note.wilaya === user.wilaya && (
            user.role === 'odej'
                ? note.type === 'initiative' || note.type === 'offer'
                : note.type === 'offer' || note.type === 'general'
        )).length
    }, [notifications, user])

    const navLinks = !hydrated
        ? []
        : isOdejMode
            ? [{ href: '/odej', label: 'Dashboard' }]
            : !isAuthenticated
                ? []
                : [
                    { href: '/opportunities', label: 'Opportunities' },
                    { href: '/initiatives', label: 'Initiatives' },
                    { href: '/dashboard/network', label: 'My Network' },
                ]

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: scrolled ? '0 32px' : '0 24px',
                height: '68px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: scrolled
                    ? 'rgba(5, 5, 16, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(24px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
            }}
        >
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <div style={{
                    width: 36,
                    height: 36,
                    background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
                }}>
                    <Zap size={18} color="white" strokeWidth={2.5} />
                </div>
                <span style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#f8f8ff',
                    letterSpacing: '-0.02em'
                }}>
                    Forsa<span style={{ color: '#a78bfa' }}>Tech</span>
                </span>
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="hidden md:flex">
                {navLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            color: 'rgba(248,248,255,0.7)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: 500,
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                            (e.target as HTMLElement).style.color = '#f8f8ff'
                                ; (e.target as HTMLElement).style.background = 'rgba(139,92,246,0.1)'
                        }}
                        onMouseLeave={e => {
                            (e.target as HTMLElement).style.color = 'rgba(248,248,255,0.7)'
                                ; (e.target as HTMLElement).style.background = 'transparent'
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Auth actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {!hydrated ? (
                    // During hydration, show minimal nav to prevent mismatch
                    null
                ) : isOdejMode ? (
                    isAuthenticated ? (
                        <>
                            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
                                Logout
                            </button>
                        </>
                    ) : null
                ) : isAuthenticated ? (
                    <>
                        {/* Notification bell */}
                        <Link href="/dashboard/notifications" style={{
                            position: 'relative',
                            width: 38, height: 38,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(248,248,255,0.85)',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}>
                            <Bell size={18} />
                            {notificationCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: -2, right: -2,
                                    width: 17, height: 17,
                                    background: '#7c3aed',
                                    borderRadius: '50%',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '2px solid #050510'
                                }}>
                                    {notificationCount}
                                </span>
                            )}
                        </Link>

                        {/* User Profile link */}
                        <Link href="/profile" style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '6px 12px 6px 6px', borderRadius: '10px',
                            background: 'rgba(139,92,246,0.1)',
                            border: '1px solid rgba(139,92,246,0.2)',
                            textDecoration: 'none', color: '#f8f8ff'
                        }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '8px',
                                background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, fontWeight: 700
                            }}>
                                {user?.avatar || (user?.name?.substring(0, 2).toUpperCase() || 'U')}
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600 }} className="hidden lg:inline">{user?.name}</span>
                            <User size={16} />
                        </Link>

                        <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/auth/signin" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                            Sign In
                        </Link>
                        <Link href="/auth/signup" className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                            Get Started
                        </Link>
                    </>
                )}

                {/* Mobile hamburger */}
                {!isOdejMode && isAuthenticated && hydrated && (
                    <button
                        onClick={() => setMenuOpen(prev => !prev)}
                        style={{
                            display: 'none',
                            width: 38, height: 38,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '10px',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        className="md:hidden !flex"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                )}
            </div>

            {/* Mobile menu */}
            {menuOpen && !isOdejMode && hydrated && (
                <div style={{
                    position: 'absolute',
                    top: '68px',
                    left: 0,
                    right: 0,
                    background: 'rgba(5,5,16,0.97)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(139,92,246,0.2)',
                    padding: '16px 24px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}>
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                padding: '12px 16px',
                                borderRadius: '10px',
                                color: 'rgba(248,248,255,0.8)',
                                textDecoration: 'none',
                                fontSize: '15px',
                                fontWeight: 500,
                                background: 'rgba(139,92,246,0.05)',
                                border: '1px solid rgba(139,92,246,0.1)',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ height: 12 }} />
                    {isAuthenticated ? (
                        <>
                            <Link href="/profile" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/signin" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                                Sign In
                            </Link>
                            <Link href="/auth/signup" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}
