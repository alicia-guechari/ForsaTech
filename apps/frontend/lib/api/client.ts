// API client for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
    body?: any
    token?: string | null
}

async function apiCall(endpoint: string, options: ApiOptions = {}) {
    const { method = 'GET', body, token } = options
    const url = `${API_BASE_URL}${endpoint}`
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const config: RequestInit = {
        method,
        headers,
    }

    if (body) {
        try {
            config.body = JSON.stringify(body)
        } catch (stringifyErr) {
            console.error(`Failed to stringify body for ${endpoint}:`, stringifyErr, 'Body:', body)
            throw new Error(`Invalid request data: ${stringifyErr instanceof Error ? stringifyErr.message : 'Unknown error'}`)
        }
    }

    try {
        console.log(`[API] ${method} ${url}`)
        const res = await fetch(url, config)
        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: res.statusText }))
            throw new Error(error.message || `API error: ${res.status}`)
        }
        return await res.json()
    } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error'
        console.error(`[API] Failed: ${method} ${endpoint} - ${errorMsg}`)
        
        // Check if it's a network error (backend not running)
        if (errorMsg === 'Failed to fetch') {
            console.error(`[API] Cannot reach backend at ${API_BASE_URL}. Is the backend running?`)
        }
        throw err
    }
}

// Opportunities API
export const opportunitiesApi = {
    getAll: async (filters?: { categoryId?: string; wilayaId?: string; q?: string }) => {
        const params = new URLSearchParams()
        if (filters?.categoryId) params.append('categoryId', filters.categoryId)
        if (filters?.wilayaId) params.append('wilayaId', filters.wilayaId)
        if (filters?.q) params.append('q', filters.q)
        const qs = params.toString() ? `?${params.toString()}` : ''
        return apiCall(`/opportunities${qs}`)
    },
    getOne: async (id: string) => apiCall(`/opportunities/${id}`),
    create: async (data: any, token: string) =>
        apiCall('/opportunities', { method: 'POST', body: data, token }),
    getRecommendations: async (token: string) =>
        apiCall('/opportunities/recommendations', { token }),
}

// Applications API
export const applicationsApi = {
    apply: async (opportunityId: string, token: string) =>
        apiCall(`/applications/${opportunityId}`, { method: 'POST', token }),
    getMe: async (token: string) =>
        apiCall('/applications/me', { token }),
    getByOdej: async (token: string) =>
        apiCall('/applications/odej', { token }),
    updateStatus: async (id: string, status: string, token: string) =>
        apiCall(`/applications/${id}/status`, {
            method: 'PATCH',
            body: { status },
            token,
        }),
    delete: async (id: string, token: string) =>
        apiCall(`/applications/${id}`, { method: 'DELETE', token }),
}
