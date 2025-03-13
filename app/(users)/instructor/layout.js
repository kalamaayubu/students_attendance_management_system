'use client'

import AdminHeader from "@/components/admin/AdminHeader"
import Sidebar from "@/components/instructor/Sidebar"
import { useEffect, useState } from "react"

export default function InstructorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
      <header className="bg-white p-4 py-2 fixed top-0 left-0 right-0 shadow-md z-50">
        <AdminHeader toggleSideBar={() => setSidebarOpen(prev => !prev)}/>
      </header>

      <div className="flex gap-0 h-full pt-[70px]">
        <nav className="relative z-50">
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isSmallScreen={isSmallScreen}/>
        </nav>

        <div className="relative flex-1 h-full overflow-hidden">
          {/* Overlay only on main content */}
          {isSmallScreen && sidebarOpen && (
            <div
              className="absolute inset-0 bg-gray-950 opacity-80 z-40"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Main Content */}
          <main className="relative flex-1 h-full bg-slate-200 bg-opacity-80 p-4 overflow-y-auto z-30 md:p-5 lg:p-6 xl:p-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
