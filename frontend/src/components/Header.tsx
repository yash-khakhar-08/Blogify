import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { logout } from "../features/auth/authSlice"

const Header = () => {

    const dispatch = useAppDispatch()
    const { user, token } = useAppSelector((state) => state.auth)

    const handleLogout = () => {
        localStorage.removeItem("userData")
        dispatch(logout())
    }

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
                    Blogify
                </Link>

                <div className="flex items-center gap-4">
                    {token && user ? (
                    <>
                        <Link to='/profile'>
                            <div className="flex items-center gap-2 cursor-pointer">

                                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                                    {user.firstName.charAt(0).toUpperCase()}
                                </div>

                                <span className="hidden sm:block text-sm font-medium text-gray-700">
                                    {user.firstName}
                                </span>

                            </div>
                        </Link>

                        <button onClick={handleLogout} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition">
                            Logout
                        </button>
                    </>
                    ) : (
                        <Link to="/login" className="px-5 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
                            Login
                        </Link>
                    )}
                </div>

            </div>

        </header>
    )
}

export default Header
