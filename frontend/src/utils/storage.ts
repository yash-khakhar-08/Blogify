import { type AuthState } from "../features/auth/types/auth.types"

export const getStoredAuth = (): AuthState => {

    try {

        const raw = localStorage.getItem("userData")
        if (!raw) return { token: null, user: null }

        const parsed = JSON.parse(raw) as AuthState

        return {
            token: parsed.token ?? null,
            user: parsed.user ?? null,
        }

    } catch {
        return { token: null, user: null }
    }
}
