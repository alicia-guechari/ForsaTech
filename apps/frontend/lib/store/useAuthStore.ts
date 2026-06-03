import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string;
    email: string;
    name: string;
    role: 'youth' | 'odej';
    avatar?: string;
    wilaya?: string;
    interests?: string[];
    savedOffers?: string[];
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    toggleSaveOffer: (offerId: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
            toggleSaveOffer: (offerId) => set((state) => {
                if (!state.user) return state;
                const saved = state.user.savedOffers || [];
                const isSaved = saved.includes(offerId);
                return {
                    user: {
                        ...state.user,
                        savedOffers: isSaved ? saved.filter(id => id !== offerId) : [...saved, offerId]
                    }
                };
            }),
        }),
        {
            name: 'forsatech-auth-v2',
        }
    )
)
