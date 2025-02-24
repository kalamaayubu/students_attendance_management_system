'use client'

import StatsCard from "@/components/StatsCard";
import { BookCheck, BookCheckIcon, Newspaper, Plane, Presentation, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useSelector } from "react-redux";

const InstructorDashboard = () => {
  // Get the userID from the Redux store
  const userId = useSelector(state => state.auth.user?.id)

  const stats = [
    { icon: Presentation, title: "My Lectures", count: 5, color: "#1D4ED8", shadowColor: "#60A5FA", percentage: "4.5", trendIcon: TrendingUp },
    { icon: BookCheckIcon, title: "Attendance", count: 34, color: "#15803D", shadowColor: "#4ADE80", percentage: "2.1", trendIcon: TrendingDown },
    { icon: Plane, title: "Total users", count: 59, color: "#7C3AED", shadowColor: "#C084FC", percentage: "6.8", trendIcon: TrendingUp },
  ]

  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="flex gap-4 flex-wrap items-center" >
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat}/>
        ))}
      </div>

      <div className="bg-white h-[1000px] rounded-lg p-4">
        <p className="font-bold text-2xl">Graph</p>
      </div>
    </div>
  )
}

export default InstructorDashboard