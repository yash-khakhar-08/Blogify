import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../app/hooks"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ApiError } from "../../../services/api/apiError"
import { createBlog, deleteBlog } from "../services/blog.service"
import Swal from 'sweetalert2'
import Editor from "../../../components/Editor"
import { isEmptyContent, normalizeContent } from "../../../utils/content.validation"

const SingleBlog = () => {

    const [loading, setLoading] = useState(false)
    const {user, token} = useAppSelector((state) => state.auth)
    const location = useLocation()
    const navigate = useNavigate()

    const { blog } = location.state || {}

    if (!blog) {
        navigate("/", { replace: true })
        return null
    }

    const [content, setContent] = useState('')

    useEffect(() => {
        setContent(blog.content)
    }, [blog])

    const handlePublish = async () => {
    
        if (!content.trim()) {
            toast.error("Blog Content cannot be empty")
            return
        }

        if (isEmptyContent(content)) {
            toast.error("Blog Content cannot be empty")
            return
        }

        const cleanedContent = normalizeContent(content)
        if(!cleanedContent){
            toast.error("Blog Content cannot be empty")
            return
        }

        setLoading(true)

        try {

            await createBlog({
                blogId: blog._id,
                title: blog.title,
                content: cleanedContent
            }, token)

            toast.success("Blog published successfully!")

            setContent(cleanedContent)

        } catch(error: unknown) {
            if (error instanceof ApiError) {
                toast.error(error.message)
            } else {
                toast.error("Failed to publish blog")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteBlog = async () => {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {

            try {
                await deleteBlog(blog._id, token)
                Swal.fire('Deleted!', 'Your blog has been deleted.', 'success')
                navigate(-1)
            } catch(error: unknown) {
                if (error instanceof ApiError) {
                    toast.error(error.message)
                } else {
                    toast.error("Failed to delete blog")
                }
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Blog by
                    </h1>
                    <p className="text-gray-500 mt-1">
                        <span className="font-semibold">{blog.author.firstName} {blog.author.lastName}</span>
                    </p>
                </div>

                <div className="mb-4">

                    <label className="block text-sm font-medium mb-1">Blog Title</label>
                    <input type="text" value={blog.title} readOnly
                        className="w-full border rounded-md px-4 py-2 text-lg focus:ring focus:ring-blue-200"/>

                </div>

                <div className="border rounded-md p-4 min-h-[250px] mb-4">
                    <Editor 
                    content={content} 
                    setContent={setContent} 
                    token={token} 
                    readonly={user?.id !== blog.author._id} 
                    />
                </div>

                <div className="mb-4">

                    <label className="block text-sm font-medium mb-1">Published On</label>
                    <input type="text" value={new Date(blog.updatedAt).toLocaleString()} readOnly
                        className="w-full border rounded-md px-4 py-2 text-lg focus:ring focus:ring-blue-200"/>

                </div>

                {user?.id === blog.author._id &&
                <div className="flex justify-end gap-4">

                    <button type="button" disabled={loading} className="px-5 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                        onClick={() => {setContent('')}}>
                        Clear
                    </button>

                    <button type="button" disabled={loading}
                        onClick={handlePublish} className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
                        
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}

                        {loading ? "Publishing..." : "Publish Blog"}
                        
                    </button>

                    <button type="button" disabled={loading}
                        onClick={() => handleDeleteBlog()} className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
                        
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}

                        {loading ? "Deleting..." : "Delete Blog"}
                        
                    </button>
                    
                </div> }

            </div>
            
        </div>
    )
}

export default SingleBlog
