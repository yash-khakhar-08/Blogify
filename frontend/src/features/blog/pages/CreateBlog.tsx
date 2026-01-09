import { useState } from "react"
import toast from "react-hot-toast"
import { createBlog } from "../services/blog.service"
import { useAppSelector } from "../../../app/hooks"
import { ApiError } from "../../../services/api/apiError"
import Editor from "../../../components/Editor"

const CreateBlog = () => {

    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')

    const { token } = useAppSelector((state) => state.auth)

    const handlePublish = async () => {

        if (!title.trim()) {
            toast.error("Blog Title is cannot be empty")
            return
        }

        if (!content.trim()) {
            toast.error("Blog Content cannot be empty")
            return
        }

        setLoading(true)

        try {

            await createBlog({
                title: title.trim(),
                content: content.trim()
            }, token)

            toast.success("Blog published successfully!")

            setTitle("")
            setContent('')

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

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        ✍️ Create Blog
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Write something amazing on <span className="font-semibold">Blogify</span>
                    </p>
                </div>

                <div className="mb-4">

                    <label className="block text-sm font-medium mb-1">Blog Title</label>
                    <input type="text" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your blog title..."
                        className="w-full border rounded-md px-4 py-2 text-lg focus:ring focus:ring-blue-200"/>

                </div>

                <div className="border rounded-md p-4 min-h-[250px] mb-4">
                    <Editor 
                    content={content} 
                    setContent={setContent} 
                    token={token} 
                    readonly={false} 
                    />
                </div>

                <div className="flex justify-end gap-4">

                    <button type="button" disabled={loading} className="px-5 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                            setTitle("")
                            setContent('')
                        }}
                    >
                        Clear
                    </button>

                    <button type="button" disabled={loading}
                        onClick={handlePublish} className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
                        
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}

                        {loading? "Publishing..." : "Publish Blog"}
                        
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default CreateBlog
