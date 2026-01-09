import React, { useState } from "react";
import { registerUser } from "../services/auth.service";
import { ApiError } from "../../../services/api/apiError";
import toast from "react-hot-toast";
import type { RegisterFormData, RegisterFormErrors } from "../types/auth.types";


const Register = () => {

    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    const validateForm = (): boolean => {

        const errors: RegisterFormErrors = {};

        if (formData.firstName.trim().length < 3 || formData.firstName.length > 100) {
            errors.firstName = "First name must be 3-100 characters long";
        }

        if (formData.lastName.trim().length < 3 || formData.lastName.length > 100) {
            errors.lastName = "Last name must be 3-100 characters long";
        }

        const emailRegex = /^[\w.-]+@prominentpixel\.com$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = "Email must be a valid @prominentpixel.com email";
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            errors.password = "Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 symbol";
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {

            await registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Registration successful!")

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            })

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

            <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
           
                <div>

                    <label className="block text-sm font-medium mb-1">First Name</label>

                    <input type="text" name="firstName"
                    value={formData.firstName} onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 ${
                        formErrors.firstName ? "border-red-500" : ""
                    }`} />

                    {formErrors.firstName && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.firstName}</p>
                    )}

                </div>

                <div>

                    <label className="block text-sm font-medium mb-1">Last Name</label>

                    <input type="text" name="lastName"
                    value={formData.lastName} onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 ${
                        formErrors.lastName ? "border-red-500" : ""
                    }`} />

                    {formErrors.lastName && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.lastName}</p>
                    )}

                </div>

                <div>

                    <label className="block text-sm font-medium mb-1">Email</label>

                    <input type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 ${
                        formErrors.email ? "border-red-500" : ""
                    }`} />

                    {formErrors.email && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                    )}

                </div>

                <div className="relative">

                    <label className="block text-sm font-medium mb-1">Password</label>

                    <input type={showPassword ? "text" : "password"} name="password"
                        value={formData.password} onChange={handleChange}
                        className={`w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 ${
                        formErrors.password ? "border-red-500" : ""
                    }`} />

                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                        {showPassword ? "Hide" : "Show"}
                    </button>

                    {formErrors.password && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>
                    )}

                </div>

                <div className="relative">

                    <label className="block text-sm font-medium mb-1">Confirm Password</label>

                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                        value={formData.confirmPassword} onChange={handleChange}
                        className={`w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 ${
                        formErrors.confirmPassword ? "border-red-500" : ""
                    }`} />

                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                    
                    {formErrors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.confirmPassword}</p>
                    )}

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

                    {loading ? "Signing up..." : "Sign Up"}

                </button>

            </form>
        </div>
    </div>
  )
}

export default Register
