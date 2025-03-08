'use client'

import AdminHeader from "@/components/admin/AdminHeader"
import Sidebar from "@/components/admin/Sidebar"
import { useState } from "react"

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white h-screen flex flex-col relative">
      <header className="bg-white p-4 py-2 fixed top-0 left-0 right-0 shadow-md">
        <AdminHeader toggleSideBar={() => setSidebarOpen(prev => !prev)}/>
      </header>

      <div className="flex gap-0 h-full pt-[70px]">
        <nav>
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        </nav>
        <main className="flex-1 h-full bg-lightGray p-4 overflow-y-auto bg-gray-200">
          {children}
        </main>
      </div>
    </div>
  )
}
