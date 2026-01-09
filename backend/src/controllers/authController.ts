import { Request, Response } from 'express'
import * as authService from '../services/auth/auth.service'

export const register = async (req: Request, res: Response) => {
    try {

        const result = await authService.registerUser(req.body)
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
}

export const login = async (req: Request, res: Response) => {

    try {

        const result = await authService.loginUser(req.body)
        console.log(result)
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({  message: 'Invalid Credentials' })
    }
}
