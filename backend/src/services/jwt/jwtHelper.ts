import jwt, { SignOptions, JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = 86400

interface TokenPayload {
    id: string;
}

export const signToken = (payload: TokenPayload): string => {

    const options: SignOptions = { 
        expiresIn: JWT_EXPIRES_IN
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
    return token

}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
}
