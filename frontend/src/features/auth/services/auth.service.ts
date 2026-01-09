import { apiClient } from "../../../services/api/apiClient"
import type { LoginPayload, AuthState, RegisterPayload } from "../types/auth.types"

export const registerUser = async (
    payload: RegisterPayload
): Promise<{message: string}> => {

    return apiClient<{message: string}>(
        "http://localhost:8080/api/auth/register",
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
        "http://localhost:8080/api/auth/login",
        {
            method: "POST",
            body: payload,
        },
        null
    )
}
