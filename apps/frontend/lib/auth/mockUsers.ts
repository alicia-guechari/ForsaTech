// Client-side mock user registry for development/testing
type StoredUser = {
    id: string
    name: string
    email: string
    role: 'youth' | 'odej'
    avatar?: string
    wilaya?: string
    interests?: string[]
    password?: string
}

const KEY = 'forsatech-mock-users-v1'

export function saveMockUser(user: StoredUser) {
    if (typeof window === 'undefined') return
    try {
        const raw = localStorage.getItem(KEY)
        const list: StoredUser[] = raw ? JSON.parse(raw) : []
        const filtered = list.filter(u => u.email !== user.email)
        filtered.push(user)
        localStorage.setItem(KEY, JSON.stringify(filtered))
    } catch (e) {
        // ignore
    }
}

export function findMockUserByEmail(email: string): StoredUser | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(KEY)
        if (!raw) return null
        const list: StoredUser[] = JSON.parse(raw)
        return list.find(u => u.email.toLowerCase() === email.toLowerCase()) ?? null
    } catch (e) {
        return null
    }
}

export function clearMockUsers() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(KEY)
}
