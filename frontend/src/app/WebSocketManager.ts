type MessageHandler = (data: any) => void

class WebSocketManager {

    private static instance: WebSocketManager
    private ws: WebSocket | null = null
    private handlers: MessageHandler[] = []

    private constructor() {}

    static getInstance(): WebSocketManager {

        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager()
        }

        return WebSocketManager.instance
    }

    connect(url: string) {

        if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {

            this.ws = new WebSocket(url)

            this.ws.onopen = () => console.log("WebSocket connected")

            this.ws.onclose = () => console.log("WebSocket disconnected")

            this.ws.onmessage = (event) => {

                try {
                    const data = JSON.parse(event.data)
                    this.handlers.forEach((h) => h(data))
                } catch (err) {
                    console.error("Invalid JSON", err)
                }

            }

            this.ws.onerror = (err) => console.error("WebSocket error: ", err)

        }

    }

    addHandler(handler: MessageHandler) {
        this.handlers.push(handler)
    }

    removeHandler(handler: MessageHandler) {
        this.handlers = this.handlers.filter((h) => h !== handler)
    }

    sendMessage(data: any) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data))
        }
    }

}

export default WebSocketManager.getInstance()
