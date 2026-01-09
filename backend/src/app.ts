import express, { Application } from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import blogRoutes from './routes/blogRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use('/api/auth', authRoutes)
app.use('/api/blog', blogRoutes)


export default app

