import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { type IBlog } from "../types/blog.types"
import { getAllBlogs } from "../services/blog.service"
import Loader from "../../../components/Loader"
import { FiSearch, FiChevronDown, FiPlus } from "react-icons/fi"
import { useWebSocket } from "../../../app/useWebSocket"

const Home = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const [currentPage, setCurrentPage] = useState(1)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm.trim())
            setCurrentPage(1)
        }, 1000)

        return () => clearTimeout(timer)

    }, [searchTerm])
    
    const { data, isLoading, isFetching, error } = useQuery<{data: IBlog[], totalPages: number}>({
        queryKey: ["blogs", currentPage, debouncedSearch, sortOrder],
        queryFn: () =>
            getAllBlogs({
                page: currentPage,
                searchTerm: debouncedSearch,
                sortOrder
            }),
        staleTime: 5 * 60 * 1000,  
        placeholderData: (previousData) => previousData
    })

    const blogs = data?.data || []
    const totalPages = data?.totalPages || 1

    const handleWebSocketMessage = useCallback((msg: any) => {

            if (msg.type === "NEW_BLOG") {

                // Update React Query cache for blogs in real-time
                queryClient.setQueryData<{ data: IBlog[]; totalPages: number }>(
                    ["blogs", currentPage, debouncedSearch, sortOrder],
                        (oldData) => {
                        if (!oldData) return { data: [msg.payload], totalPages: 1 }
                        return {
                            ...oldData,
                            data: [msg.payload, ...oldData.data],
                            totalPages: oldData.totalPages + 1,
                        }
                    }
                )
            }
        },

        [queryClient, currentPage, debouncedSearch, sortOrder]
    )

    useWebSocket("http://localhost:8080", handleWebSocketMessage)

    if(isLoading){
        return <Loader/>
    }

    if (error) {
        return <p className="text-red-500 text-center">Failed to load blogs</p>
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Sub-header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
    
                {/* Search */}
                <div className="flex items-center gap-2 w-full md:w-1/2">
                    <FiSearch className="text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                </div>
    
                {/* Sort & Create */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
                        onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}>
                        <span>Sort by UpdatedAt</span>
                        <FiChevronDown size={20} />
                    </div>
    
                    <button onClick={() => navigate("/blog/create")}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        <FiPlus /> Create New Blog
                    </button>
    
                </div>
            </div>
            
            {/* Background fetching indicator */}
            {isFetching && (
                <p className="text-sm text-gray-400 mb-4">loading...</p>
            )}

            {/* User Blogs */}
            <div className="grid md:grid-cols-2 gap-6">
    
                {blogs.length > 0 ? (
                blogs.map((blog: IBlog) => (
    
                    <div key={blog._id} onClick={() => navigate(`/blog/${blog._id}`, { state: { blog } })}
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer">
    
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <p className="text-gray-600 mt-2 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                        <p className="text-sm text-gray-400 mt-4">
                            Updated: {new Date(blog.updatedAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-400 mt-4">
                            Created: {new Date(blog.createdAt).toLocaleString()}
                        </p>
    
                    </div>
                ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center">
                        No blogs found.
                    </p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">

                    {/* Previous */}
                    <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                    </button>

                    {/* Page info */}
                    <span className="text-gray-600 text-sm">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                    </span>

                    {/* Next */}
                    <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                    </button>

                </div>
            )}
        </div>
    )
}

export default Home
