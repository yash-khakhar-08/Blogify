import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type IBlog } from "../types/blog.types"
import { getAllBlogs } from "../services/blog.service"
import Loader from "../../../components/Loader"
import { FiSearch, FiChevronDown, FiPlus } from "react-icons/fi"

const Home = () => {

    const [blogs, setBlogs] = useState<IBlog[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm.trim())
            setCurrentPage(1)
        }, 1000)

        return () => clearTimeout(timer)

  }, [searchTerm])
    
    useEffect(() => {

        const fetchAllBlogs = async () => {
            try {
                setLoading(true)
                const result = await getAllBlogs({
                    page: currentPage,
                    searchTerm: debouncedSearch,
                    sortOrder: sortOrder
                })
                setBlogs(result.data)
                setTotalPages(result.totalPages)
            } catch (err) {
                console.error("Error fetching blogs: ", err)
            } finally{
                setLoading(false)
            }
        }   

        fetchAllBlogs()
    }, [currentPage, debouncedSearch, sortOrder])

    if(loading){
        return <Loader/>
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
    
            {/* User Blogs */}
            <div className="grid md:grid-cols-2 gap-6">
    
                {blogs.length > 0 ? (
                blogs.map((blog) => (
    
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
