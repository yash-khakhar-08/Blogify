export interface BlogPayload {
    blogId?: string;
    title: string;
    content: string;
}

export interface IBlog {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
    };
}

export interface filterOptions{
    page: number;
    searchTerm: string;
    sortOrder: "asc" | "desc"
}