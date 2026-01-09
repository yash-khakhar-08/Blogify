import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import type { JSX } from "react"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

    const token = useAppSelector((state) => state.auth.token)

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
