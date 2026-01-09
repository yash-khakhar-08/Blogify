import { Types } from 'mongoose'

export interface IBlog {
    title: string;
    content: string;
    author: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogInput{
    blogId?: string;
    title: string;
    content: string;
    author: Types.ObjectId;
}
