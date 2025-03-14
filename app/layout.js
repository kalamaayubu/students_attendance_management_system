import ReduxProvider from "@/redux/ReduxProvider"
import "../styles/globals.css"
import ToastProvider from "@/components/ToastProvider"
import ServiceWorkerRegistration from "@/utils/notification/ServiceWorkerRegistration"

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <ReduxProvider>
          <body>
            { children }
            <ToastProvider/>
            <ServiceWorkerRegistration/>
          </body>
        </ReduxProvider>
    </html>
  )
}

export default RootLayout
