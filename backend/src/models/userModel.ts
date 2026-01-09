import mongoose, { Schema, Document } from 'mongoose'
import { type IUser } from '../types/userTypes'

export interface IUserModel extends IUser, Document {}

const userSchema: Schema<IUserModel> = new Schema(

    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },

    { timestamps: true }
)

export default mongoose.model<IUserModel>('User', userSchema)
