import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv'
dotenv.config()

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing!")
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
})

const imageHandler = async (file: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "blogify" },
            (error, result) => {
                if (error || !result) {
                    console.error(error)
                    return reject(error || new Error('cloudinary error'))
                } else {
                    resolve(result.secure_url)
                }
            }
        )

        stream.end(file)
    })
}

export default imageHandler