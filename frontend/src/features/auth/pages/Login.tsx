import React, { useState } from "react";
import { loginUser } from "../services/auth.service";
import { ApiError } from "../../../services/api/apiError";
import toast from "react-hot-toast";
import { type LoginFormData } from "../types/auth.types";
import { useDispatch } from "react-redux";
import { setAuthData } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);

        try {

            const userData = await loginUser({
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem("userData", JSON.stringify(userData))
            
            dispatch(setAuthData({
                token: userData.token,
                user: userData.user
            }))

            toast.success("Login successful!")

            setFormData({
                email: "",
                password: ""
            })

            navigate('/')

        } catch (error: unknown) {
            if (error instanceof ApiError) {
                toast.error(error.message)
            } else {
                toast.error("Unexpected error occurred")
            }
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">

            <h1 className="text-2xl font-semibold text-center mb-6">Login to Blogify</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>

                    <label className="block text-sm font-medium mb-1">Email</label>

                    <input type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200" />

                </div>

                <div className="relative">

                    <label className="block text-sm font-medium mb-1">Password</label>

                    <input type={showPassword ? "text" : "password"} name="password"
                        value={formData.password} onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200" />

                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                        {showPassword ? "Hide" : "Show"}
                    </button>

                </div>

                <button type="submit" disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center gap-2">
                    
                    {loading && (
                    <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">

                        <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"></circle>

                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    )}

                    {loading ? "Verifing..." : "Login"}

                </button>

            </form>

            <h1 className="block text-sm font-medium mt-1">
                Don't have an account?&nbsp;
                <Link to='/register'>
                    <span className="text-blue-600 hover:text-blue-700 hover:underline transition">
                        Sign up
                    </span>
                </Link>
            </h1>

        </div>
    </div>
  )
}

export default Login
