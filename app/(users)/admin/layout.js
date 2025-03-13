'use client'
import AdminHeader from "@/components/admin/AdminHeader"
import Sidebar from "@/components/admin/Sidebar"
import { useEffect, useState } from "react"

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  
    // Function to check the screen size dynamically
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    }
  
    useEffect(() => {
      checkScreenSize() // Run initially on mount
      window.addEventListener('resize', checkScreenSize)
  
      return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

  return (
    <div className="bg-white h-screen flex flex-col relative">
      <header className="bg-white p-4 py-2 fixed top-0 left-0 right-0 shadow-md">
        <AdminHeader toggleSideBar={() => setSidebarOpen(prev => !prev)}/>
      </header>

      <div className="flex gap-0 h-full pt-[70px]">
        <nav>
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isSmallScreen={isSmallScreen}/>
        </nav>
        <main className="flex-1 h-full p-4 overflow-y-auto bg-slate-200 md:p-5 lg:p-6 xl:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}
