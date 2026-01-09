import { apiClient } from "../../../services/api/apiClient"
import type { BlogPayload, filterOptions, IBlog } from "../types/blog.types"

export const createBlog = async (
    payload: BlogPayload,
    token: string | null
): Promise<{message: string}> => {

    return apiClient<{message: string}>(
        "http://localhost:8080/api/blog/create",
        {
            method: "POST",
            body: payload,
        },
        token
    )
}

export const getAllBlogs = async (filterOptions: filterOptions): Promise<{data: IBlog[], totalPages: number}> => {

    return apiClient<{data: IBlog[], totalPages: number}>(
        `http://localhost:8080/api/blog/getAllBlogs?page=${filterOptions.page}&searchTerm=${filterOptions.searchTerm}&sortOrder=${filterOptions.sortOrder}`,
        {
            method: "GET",
        },
        null
    )
}

export const getAllUserBlogs = async (token: string | null): Promise<{data: IBlog[]}> => {

    return apiClient<{data: IBlog[]}>(
        "http://localhost:8080/api/blog/getAllUserBlogs",
        {
            method: "GET",
        },
        token
    )
}

export const deleteBlog = async (
    blogId: string, 
    token: string | null
): Promise<{message: string}> => {

    return apiClient<{message: string}>(
        `http://localhost:8080/api/blog/delete?blogId=${blogId}`,
        {
            method: "DELETE",
        },
        token
    )
}

export const uploadImage = async ( 
    payload: any,
    token: string | null
): Promise<{url: string}> => {

    const response = await fetch('http://localhost:8080/api/blog/upload-image',{
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: payload
    })

    return response.json()
    
}