import { BlogInput } from "../../types/blogTypes"
import Blog, {IBlogModel} from '../../models/blogModel'
import { Types } from "mongoose"
import { broadcast } from "../../wsServer"

const PAGE_SIZE = 4

export const createBlog = async (data: BlogInput) => {

    const { blogId, title, content, author } = data

    if(blogId){

        const existingBlog = await Blog.findById(blogId)
        if(existingBlog){
            existingBlog.content = content
            await existingBlog.save()
        } else{
            throw new Error('Server Error')
        }

    } else{

        const blog: IBlogModel = new Blog({
            title,
            content,
            author
        })

        await blog.save()

        broadcast({ type: "NEW_BLOG", payload: blog })

    }

    return { message: 'Blog created successfully' }
}

export const getAllBlogs = async (page: number, searchTerm: string, sortOrder: string) => {

    const pageNumber = Math.max(page, 1)

    const filter = {
        title: { $regex: searchTerm as string, $options: "i" },
    }

    const blogs = await Blog.find(filter)
        .sort({ updatedAt: sortOrder === "asc" ? 1 : -1 })
        .skip((pageNumber - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .populate("author", "firstName lastName")

    const total = await Blog.countDocuments(filter)

    return { data: blogs, totalPages: Math.ceil(total / PAGE_SIZE) }

}

export const getAllUserBlogs = async (userId?: Types.ObjectId) => {

    if (!userId) {
        throw new Error("User ID is required")
    }
    
    const blogs = await Blog.find({author: userId}).populate('author', 'firstName lastName').sort({createdAt: -1})

    return { data: blogs }

}

export const deleteBlog = async (blogId: string) => {

    if(!blogId){
        throw new Error('Blog id is missing')
    }

    await Blog.findByIdAndDelete(blogId)

    return { message: 'Blog deleted successfully' }
}