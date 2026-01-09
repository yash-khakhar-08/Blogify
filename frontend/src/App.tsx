import ToastProvider from "./components/ToastProvider"
import AppRoutes from "./routes/AppRoutes"
import ScrollToTop from "./components/ScrollToTop"
import './App.css'

export default function App (){
  return(
    <>
      <ToastProvider/>
      <ScrollToTop/>
      <AppRoutes />
    </>
  )
}