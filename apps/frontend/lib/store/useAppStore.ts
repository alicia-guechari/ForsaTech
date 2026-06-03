import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Initiative {
    id: string
    title: string
    desc: string
    wilaya: string
    author: string
    threshold: number
    supporters: number
    comments: number
    status: 'pending' | 'notified' | 'approved' | 'rejected'
    daysAgo: number
    tags: string[]
    supportedBy?: string[]
}

export interface Offer {
    id: string
    title: string
    category: string
    wilaya: string
    date: string
    capacity: number
    registered: number
    remaining: number
    odej: string
    applicants: number
    status: string
    desc: string
    location: string
    duration: string
}

export interface Application {
    id: string
    offerId: string
    userId: string
    userName: string
    userWilaya: string
    status: 'pending' | 'accepted' | 'rejected'
    date: string
}


export interface Notification {
    id: string
    text: string
    time: string
    read: boolean
    type: 'initiative' | 'offer' | 'general'
    wilaya: string
    initiativeId?: string
}

interface AppState {
    initiatives: Initiative[]
    offers: Offer[]
    applications: Application[]
    notifications: Notification[]
    addInitiative: (initiative: Initiative) => void
    supportInitiative: (initiativeId: string, userId: string) => void
    approveInitiative: (initiativeId: string, odejName: string) => void
    addOffer: (offer: Offer) => void
    applyToOffer: (offerId: string, user: { id: string, name: string, wilaya?: string }) => void
    updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => void
    markNotificationRead: (notificationId: string) => void
    markAllNotificationsRead: () => void
    deleteNotification: (notificationId: string) => void
}

const initialInitiatives: Initiative[] = [
    {
        id: '1',
        title: 'Robotics Workshop in Béjaïa',
        desc: 'We need a hands-on robotics and Arduino programming workshop for high school and university students in Béjaïa.',
        wilaya: 'Béjaïa',
        author: 'Ahmed B.',
        threshold: 50,
        supporters: 47,
        comments: 12,
        status: 'pending',
        daysAgo: 3,
        tags: ['Technology', 'Robotics'],
    },
    {
        id: '2',
        title: 'Clean Beach Campaign – Béjaïa Coast',
        desc: 'Organize a coordinated beach cleanup along the Béjaïa coastline, involving youth groups, ODEJ, and local authorities.',
        wilaya: 'Béjaïa',
        author: 'Lynda M.',
        threshold: 50,
        supporters: 50,
        comments: 24,
        status: 'approved',
        daysAgo: 10,
        tags: ['Environment', 'Volunteering'],
    },
    {
        id: '3',
        title: 'Female Entrepreneurship Mentorship Program',
        desc: 'A 6-week mentorship program for young Algerian women interested in starting their own businesses.',
        wilaya: 'Constantine',
        author: 'Sara K.',
        threshold: 50,
        supporters: 33,
        comments: 8,
        status: 'pending',
        daysAgo: 6,
        tags: ['Entrepreneurship', 'Leadership'],
    },
    {
        id: '4',
        title: 'Youth Photography Festival',
        desc: 'An annual photography exhibition and competition for young Algerian photographers aged 18–30.',
        wilaya: 'Alger',
        author: 'Youcef A.',
        threshold: 50,
        supporters: 19,
        comments: 5,
        status: 'pending',
        daysAgo: 2,
        tags: ['Arts', 'Culture'],
    },
]

const initialOffers: Offer[] = [
    {
        id: '1',
        title: 'Reforestation Volunteer Day – Kabylie',
        category: 'Environment',
        wilaya: 'Béjaïa',
        date: '2026-07-08',
        capacity: 80,
        registered: 57,
        remaining: 23,
        odej: 'ODEJ Béjaïa',
        applicants: 34,
        status: 'Open',
        desc: 'Join thousands of volunteers to plant trees across the forests of Kabylie. Materials and refreshments included.',
        location: 'Béjaïa Forest Park',
        duration: '1 day',
    },
    {
        id: '2',
        title: 'Kabyle Cultural Arts Festival',
        category: 'Arts',
        wilaya: 'Béjaïa',
        date: '2026-09-01',
        capacity: 300,
        registered: 128,
        remaining: 172,
        odej: 'ODEJ Béjaïa',
        applicants: 73,
        status: 'Open',
        desc: 'Annual celebration of Amazigh arts, music, poetry and crafts with workshops for youth and families.',
        location: 'Béjaïa Culture Center',
        duration: '3 days',
    },
    {
        id: '3',
        title: 'Youth Leadership Bootcamp',
        category: 'Leadership',
        wilaya: 'Alger',
        date: '2026-08-15',
        capacity: 50,
        registered: 44,
        remaining: 6,
        odej: 'ODEJ Alger',
        applicants: 42,
        status: 'Closing soon',
        desc: 'Two-week program helping young people validate ideas, build confidence, and pitch community projects.',
        location: 'Alger Training Center',
        duration: '2 weeks',
    },
]

const initialNotifications: Notification[] = []

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            initiatives: initialInitiatives,
            offers: initialOffers,
            applications: [],
            notifications: initialNotifications,
            addInitiative: (initiative) => set((state) => ({ initiatives: [initiative, ...state.initiatives] })),
            supportInitiative: (initiativeId, userId) => set((state) => {
                let newNotification: Notification | null = null

                const initiatives = state.initiatives.map((init): Initiative => {
                    if (init.id !== initiativeId) return init

                    const supportedBy = init.supportedBy || []
                    const isAlreadySupported = supportedBy.includes(userId)

                    let newSupporters = init.supporters
                    let newSupportedBy = [...supportedBy]

                    if (isAlreadySupported) {
                        newSupporters = Math.max(0, init.supporters - 1)
                        newSupportedBy = newSupportedBy.filter(id => id !== userId)
                    } else {
                        newSupporters = init.supporters + 1
                        newSupportedBy.push(userId)
                    }

                    let status: Initiative['status'] = init.status

                    if (!isAlreadySupported && init.status === 'pending' && init.supporters < init.threshold && newSupporters >= init.threshold) {
                        status = 'notified'
                        newNotification = {
                            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                            text: `Initiative "${init.title}" has reached ${init.threshold} supporters and is ready for ODEJ approval in ${init.wilaya}.`,
                            time: new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
                            read: false,
                            type: 'initiative',
                            wilaya: init.wilaya,
                            initiativeId: init.id,
                        }
                    }

                    if (newSupporters < init.threshold && init.status === 'notified') {
                        status = 'pending'
                    }

                    return { ...init, supporters: newSupporters, supportedBy: newSupportedBy, status }
                })

                return {
                    initiatives,
                    notifications: newNotification ? [newNotification, ...state.notifications] : state.notifications,
                }
            }),
            approveInitiative: (initiativeId, odejName) => set((state) => {
                let newOffer: Offer | null = null
                const initiatives = state.initiatives.map((init): Initiative => {
                    if (init.id !== initiativeId) return init
                    if (init.status === 'approved') return init

                    const offerDate = new Date()
                    offerDate.setDate(offerDate.getDate() + 14)
                    const dateString = offerDate.toISOString().slice(0, 10)
                    const category = init.tags[0] ?? 'Community'

                    newOffer = {
                        id: `offer-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                        title: `${init.title} — Official ODEJ Program`,
                        category,
                        wilaya: init.wilaya,
                        date: dateString,
                        capacity: Math.max(init.threshold * 2, 50),
                        registered: 0,
                        remaining: Math.max(init.threshold * 2, 50),
                        odej: odejName,
                        applicants: 0,
                        status: 'Open',
                        desc: `Official ODEJ offer based on community initiative: ${init.desc}`,
                        location: `${init.wilaya} ODEJ Center`,
                        duration: '1 day',
                    }

                    return { ...init, status: 'approved' }
                })

                return {
                    initiatives,
                    offers: newOffer ? [newOffer, ...state.offers] : state.offers,
                    notifications: newOffer
                        ? [
                            {
                                id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                                text: `An initiative in ${newOffer!.wilaya} has been approved and published as an ODEJ offer.`,
                                time: new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
                                read: false,
                                type: 'offer',
                                wilaya: newOffer!.wilaya,
                                initiativeId,
                            },
                            ...state.notifications,
                        ]
                        : state.notifications,
                }
            }),
            addOffer: (offer) => set((state) => ({ offers: [offer, ...state.offers] })),
            applyToOffer: (offerId, user) => set((state) => {
                const alreadyApplied = state.applications.some(app => app.offerId === offerId && app.userId === user.id)
                if (alreadyApplied) return state

                const newApp: Application = {
                    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                    offerId,
                    userId: user.id,
                    userName: user.name,
                    userWilaya: user.wilaya || 'Unknown',
                    status: 'pending',
                    date: new Date().toISOString()
                }

                return {
                    applications: [newApp, ...state.applications],
                    offers: state.offers.map(offer => offer.id === offerId ? { ...offer, applicants: offer.applicants + 1 } : offer)
                }
            }),
            updateApplicationStatus: (appId, status) => set((state) => {
                let updatedOfferId = ''
                const apps = state.applications.map(app => {
                    if (app.id === appId) {
                        updatedOfferId = app.offerId
                        return { ...app, status }
                    }
                    return app
                })

                let offers = state.offers
                if (status === 'accepted' && updatedOfferId) {
                    offers = offers.map(o => {
                        if (o.id === updatedOfferId) {
                            return {
                                ...o,
                                registered: o.registered + 1,
                                remaining: Math.max(0, o.remaining - 1),
                                applicants: Math.max(0, o.applicants - 1)
                            }
                        }
                        return o
                    })
                } else if (status === 'rejected' && updatedOfferId) {
                    offers = offers.map(o => o.id === updatedOfferId ? { ...o, applicants: Math.max(0, o.applicants - 1) } : o)
                }

                return { applications: apps, offers }
            }),
            markNotificationRead: (notificationId) => set((state) => ({
                notifications: state.notifications.map(notification =>
                    notification.id === notificationId ? { ...notification, read: true } : notification
                )
            })),
            markAllNotificationsRead: () => set((state) => ({
                notifications: state.notifications.map(notification => ({ ...notification, read: true }))
            })),
            deleteNotification: (notificationId) => set((state) => ({
                notifications: state.notifications.filter(notification => notification.id !== notificationId)
            })),
        }),
        { name: 'forsatech-app-data' }
    )
)
