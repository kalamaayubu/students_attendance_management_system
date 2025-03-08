'use client'

import AdminHeader from "@/components/admin/AdminHeader"
import Sidebar from "@/components/instructor/Sidebar"
import { useState } from "react"

export default function InstructorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-white h-screen flex flex-col relative">
      <header className="bg-white p-4 py-2 fixed top-0 left-0 right-0 shadow-md">
        <AdminHeader toggleSideBar={() => setSidebarOpen(prev => !prev)}/>
      </header>

      <div className="flex gap-0 h-full pt-[70px]">
        <nav>
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        </nav>
        <main className="flex-1 h-full bg-lightGray p-4 lg:p-6 xl:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
