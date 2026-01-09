import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type IBlog } from "../../blog/types/blog.types"
import { getAllUserBlogs } from "../../blog/services/blog.service"
import { FiSettings, FiSearch, FiChevronDown, FiPlus } from "react-icons/fi"
import { useAppSelector } from "../../../app/hooks"
import Loader from "../../../components/Loader"

const Profile = () => {

    const [blogs, setBlogs] = useState<IBlog[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const { token } = useAppSelector((state) => state.auth)

    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                setLoading(true)
                const result = await getAllUserBlogs(token)
                setBlogs(result.data)
            } catch (err) {
                console.error("Error fetching user blogs: ", err)
            } finally{
                setLoading(false)
            }
        }

        fetchBlogs()

    }, [])

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.trim().toLowerCase()))
        .sort((a, b) => {
        if (sortOrder === "asc") {
            return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        } else {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        }
    })

    if (loading){
        return <Loader/>
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            {/* Sub-header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                {/* Account Settings */}
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
                    <FiSettings size={24} />
                    <span className="font-medium text-gray-700">Account Settings</span>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 w-full md:w-1/2">
                    <FiSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search your blogs..."
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

                {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (

                    <div key={blog._id} onClick={() => navigate(`/blog/${blog._id}`, { state: { blog } })}
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer">

                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <p
                            className="text-gray-600 mt-2 line-clamp-3"
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
        </div>
    )
}

export default Profile
