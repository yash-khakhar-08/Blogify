import http from "http"
import app from './app'
import dotenv from 'dotenv'
import { connectDB } from './config/database'
import { initWebSocketServer } from "./wsServer"

dotenv.config()

const PORT = process.env.PORT || 8080

connectDB().then(() => {

    const server = http.createServer(app)

    initWebSocketServer(server)

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
    
})
