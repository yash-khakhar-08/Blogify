export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = "ApiError"
        this.status = status
    }
}

export const handleApiError = async (response: Response) => {

    if (!response.ok) {
        let message = "Something went wrong"

        try {

            const errorData = await response.json()
            message = errorData?.message || message

        } catch {
            message = "JSON PARSE ERROR!"
        }

        throw new ApiError(message, response.status)
    }
}
