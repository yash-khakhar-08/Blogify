import { useEffect } from "react"
import WebSocketManager from "./WebSocketManager"

export const useWebSocket = (
    url: string, 
    onMessage: (data: any) => void
) => {

    useEffect(() => {

        WebSocketManager.connect(url)

        WebSocketManager.addHandler(onMessage)

        return () => {
            WebSocketManager.removeHandler(onMessage)
        }

    }, [url, onMessage])

}
