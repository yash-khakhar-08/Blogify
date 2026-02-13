import { apiClient } from "../../../services/api/apiClient"
import type { LoginPayload, AuthState, RegisterPayload } from "../types/auth.types"

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL

export const registerUser = async (
    payload: RegisterPayload
): Promise<{message: string}> => {

    return apiClient<{message: string}>(
        `${backendApiUrl}/api/auth/register`,
        {
            method: "POST",
            body: payload,
        },
        null
    )
}

export const loginUser = async (
    payload: LoginPayload
): Promise<AuthState> => {

    return apiClient<AuthState>(
        `${backendApiUrl}/api/auth/login`,
        {
            method: "POST",
            body: payload,
        },
        null
    )
}
