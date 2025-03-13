import { getAllCoursesCount } from "@/actions/getAllCoursesCount";
import { getAttendanceForCourses, getEnrolledCourses } from "@/actions/student/getStats";
import StatsCard from "@/components/StatsCard";
import AttendancePieChart from "@/components/student/AttendancePieChart";
import { getUserId } from "@/utils/getUserId";
import { BookCheck, Library, Newspaper, Plane, TrendingDown, TrendingUp, Users } from "lucide-react";

const StudentDasboard = async () => {
  // Get the student's statistics
  const studentId = await getUserId()
  try {
    // Get the number of courses the student is enrolled in
    const enrolledCoursesCount = await getEnrolledCourses(studentId);
    if (enrolledCoursesCount === 0) {return}

    // Get the count of all courses offered
    const allCoursesCount = await getAllCoursesCount();
    if (allCoursesCount === 0) {return}

    // Get the attendance statistics for each course
    const attendanceStats = await getAttendanceForCourses(studentId)
    if (attendanceStats.length === 0) {return <p>No attendance record found</p>}

  const stats = [
    { icon: Library, title: "Enrolled courses", count: `${enrolledCoursesCount}`, color: "#1D4ED8", shadowColor: "#60A5FA", percentage: "4.5", trendIcon: TrendingUp },
    { icon: BookCheck, title: "Courses offered", count: `${allCoursesCount}`, color: "#EA580C", shadowColor: "#FDBA74", percentage: "0.5", trendIcon: null },
  ]

    return (
      <div className="flex flex-col gap-5 overflow-y-auto">
        <div className="flex gap-4 flex-wrap items-center" >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat}/>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg">
          <AttendancePieChart attendanceStats={attendanceStats}/>
        </div>
      </div>
    )
  } catch (error) {
    console.error(error)
  }
}

export default StudentDasboard