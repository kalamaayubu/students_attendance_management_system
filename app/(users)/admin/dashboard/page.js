import { getInstructorsCount, getStudentsCount } from "@/actions/admin/getStats";
import { getAllCoursesCount } from "@/actions/getAllCoursesCount";
import StatsCard from "@/components/StatsCard";
import { GraduationCap, Library, Presentation, TrendingDown, TrendingUp } from "lucide-react";

const AdminDashboard = async () => {
  // Get statistics
  try {
    const instructorsCount = await getInstructorsCount()
    const studentsCount = await getStudentsCount()
    const coursesCount = await getAllCoursesCount()
  
  const stats = [
    { icon: Presentation, title: "Instructors", count: `${instructorsCount}`, color: "#1D4ED8", shadowColor: "#60A5FA", percentage: "4.5", trendIcon: TrendingUp },
    { icon: GraduationCap, title: "Students", count: `${studentsCount}`, color: "#15803D", shadowColor: "#4ADE80", percentage: "2.1", trendIcon: TrendingDown },
    { icon: Library, title: "Courses offered", count: `${coursesCount}`, color: "#7C3AED", shadowColor: "#C084FC", percentage: "6.8", trendIcon: TrendingUp },
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
  } catch (error) {
      
  }
}

export default AdminDashboard