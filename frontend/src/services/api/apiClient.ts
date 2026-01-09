import { handleApiError } from "./apiError"

interface ApiClientOptions{
    method: string;
    headers?: unknown;
    body?: unknown;
}

export const apiClient = async <T>(
    url: string,
    options: ApiClientOptions = {method: "GET"},
    token: string | null
): Promise<T> => {

    const response = await fetch(url, {

        method: options.method,
        
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options.headers || {}),
        },

        body: options.body ? JSON.stringify(options.body) : undefined,
    })

    await handleApiError(response)

    return response.json() as Promise<T>

}
