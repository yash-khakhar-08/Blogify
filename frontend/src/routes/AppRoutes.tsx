import { Routes, Route } from "react-router-dom"
import { Home, CreateBlog, SingleBlog } from "../features/blog"
import { Register, Login } from "../features/auth"
import NotFound from "../pages/NotFound"
import ProtectedRoute from "./ProtectedRoutes"
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"
import PageWrapper from "../components/PageWrapper"
import { Profile } from "../features/profile"
import ModifyCreateBlog from "../features/blog/pages/ModifyCreateBlog"

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>

                <Route 
                    path="/" 
                    element={
                        <PageWrapper>
                            <Home />
                        </PageWrapper>
                    }
                />

                <Route
                    path="/blog/create"
                    element={
                        <ProtectedRoute>
                            <PageWrapper>
                                <CreateBlog />
                            </PageWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/blog/create/trial"
                    element={
                        <ProtectedRoute>
                            <PageWrapper>
                                <ModifyCreateBlog />
                            </PageWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/blog/:id"
                    element={
                        <PageWrapper>
                        <SingleBlog />
                        </PageWrapper>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <PageWrapper>
                                <Profile />
                            </PageWrapper>
                        </ProtectedRoute>
                    }
                />

            </Route>

            <Route element={<AuthLayout />}>

                <Route
                    path="/login"
                    element={
                        <PageWrapper>
                            <Login />
                        </PageWrapper>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PageWrapper>
                        <Register />
                        </PageWrapper>
                    }
                />

            </Route>

            <Route
                path="*"
                element={
                    <PageWrapper>
                        <NotFound />
                    </PageWrapper>
                }
            />

        </Routes>
    )
}

export default AppRoutes
