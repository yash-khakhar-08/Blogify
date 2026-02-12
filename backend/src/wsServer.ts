import { WebSocketServer } from "ws"
import http from "http"

let wss: WebSocketServer

export const initWebSocketServer = (server: http.Server) => {

    wss = new WebSocketServer({ server })

    wss.on("connection", (ws) => {

        console.log("WebSocket client connected")

        ws.on("message", (message) => {
            console.log("Received from client: ", message.toString())
        })

        ws.on("close", () => {
            console.log("WebSocket client disconnected")
        })
    })

    return wss
}


export const broadcast = (data: any) => {

    if (!wss) return

    const msg = JSON.stringify(data)

    wss.clients.forEach((client) => {

        if (client.readyState === client.OPEN) {
            client.send(msg)
        }
<<<<<<< HEAD
        
=======

>>>>>>> 6021305 (added web sockets terraform and docker)
    })

}