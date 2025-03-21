import ReduxProvider from "@/redux/ReduxProvider"
import "../styles/globals.css"
import ToastProvider from "@/components/ToastProvider"
import ServiceWorkerRegistration from "@/utils/notification/ServiceWorkerRegistration"
import ReactQueryProvider from "@/components/providers/ReactQueryProvider"

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <ReduxProvider>
          <body>
            <ReactQueryProvider>
              { children }
              <ToastProvider/>
              <ServiceWorkerRegistration/>
            </ReactQueryProvider>
          </body>
        </ReduxProvider>
    </html>
  )
}

export default RootLayout
