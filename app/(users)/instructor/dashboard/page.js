import { getAllCoursesCount } from "@/actions/getAllCoursesCount";
import { getAttendanceData } from "@/actions/instructor/getAttendanceChartData";
import { getCoursesCount } from "@/actions/instructor/getCoursesCount";
import { CountSkeleton } from "@/components/CountSkeleton";
import AttendanceLineChart from "@/components/instructor/AttendanceLineChart";
import StatsCard from "@/components/StatsCard";
import { getUserId } from "@/utils/getUserId";
import { BookCheckIcon, Presentation, TrendingUp } from "lucide-react";

const InstructorDashboard = async () => {
  const instructorId = await getUserId()
  // Get the instructor's statistics
  try {
    const coursesCount = await getCoursesCount(instructorId); // Instructor's courses
    const allCoursesCount = await getAllCoursesCount() // All courses offered
    const data = await getAttendanceData(instructorId); // Attendance data for visualization
    console.log('Fetched chart data', data)

  const stats = [
    { icon: Presentation, title: "My Lectures", count: `${coursesCount}`, color: "#1D4ED8", shadowColor: "#60A5FA", percentage: "4.5", trendIcon: TrendingUp },
    { icon: BookCheckIcon, title: "All courses", count: `${allCoursesCount}`, color: "#7C3AED", shadowColor: "#C084FC", percentage: "6.8", trendIcon: TrendingUp },
  ]

    return (
      <div className="flex flex-col gap-5 overflow-y-auto">
        <div className="flex gap-4 flex-wrap items-center" >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat}/>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4">
          <CountSkeleton/>
          <AttendanceLineChart data={data}/>
        </div>
      </div>
    )
  } catch (error) {
  }
}

export default InstructorDashboard