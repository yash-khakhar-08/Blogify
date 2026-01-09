import { Toaster } from "react-hot-toast"

const ToastProvider = () => {
    return (
        <Toaster
        position="top-right"
        toastOptions={{
            className: "bg-white text-gray-800 shadow-md rounded-lg",
            duration: 3000,
        }}
        />
  )
}

export default ToastProvider;
