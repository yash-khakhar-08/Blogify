import { Request, Response } from 'express'
import * as blogService from '../services/blog/blog.service'
import { type BlogInput } from '../types/blogTypes'
import imageHandler from '../utils/imageHandler'

export const createBlog = async (req: Request, res: Response) => {
    try {

        const {blogId, title, content} = req.body

        const blogBody: BlogInput = {
            blogId,
            title,
            content,
            author: req.userId!
        }

        const result = await blogService.createBlog(blogBody)
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
}

export const getAllBlogs = async (req: Request, res: Response) => {
    try {

        const { page = "1", searchTerm = "", sortOrder = "desc" } = req.query
        
        const result = await blogService.getAllBlogs(+page, String(searchTerm), String(sortOrder))

        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
}

export const getAllUserBlogs = async (req: Request, res: Response) => {
    try {

        const userId = req.userId
        
        const result = await blogService.getAllUserBlogs(userId)
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {

        const {blogId} = req.query

        const result = await blogService.deleteBlog(String(blogId))
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
}

export const uploadImageToCloudinary = async (req: Request, res: Response) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const imageUrl = await imageHandler(req.file.buffer)

        return res.status(200).json({ url: imageUrl })

    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
}