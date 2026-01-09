import mongoose, { Schema, Document } from 'mongoose'
import { IBlog } from '../types/blogTypes'

export interface IBlogModel extends IBlog, Document {}

const blogSchema = new Schema<IBlogModel>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },

    {
        timestamps: true
    }
)

export default mongoose.model<IBlogModel>('Blog', blogSchema)
