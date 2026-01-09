import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../services/jwt/jwtHelper'
import { Types } from 'mongoose'

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing' })
        }

        const token = authHeader.split(' ')[1]

        const decoded = verifyToken(String(token))

        req.userId = new Types.ObjectId(decoded.id)

        next()

    } catch (error) {
        console.log('Invalid or expired token')
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}
