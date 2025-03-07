import { getAllCoursesCount } from "@/actions/getAllCoursesCount";
import { getEnrolledCourses } from "@/actions/student/getStats";
import { CountSkeleton } from "@/components/CountSkeleton";
import StatsCard from "@/components/StatsCard";
import { getUserId } from "@/utils/getUserId";
import { BookCheck, Library, Newspaper, Plane, TrendingDown, TrendingUp, Users } from "lucide-react";

const StudentDasboard = async () => {
  // Get the student's statistics
  const studentId = await getUserId()
  try {
    // Get the number of courses the student is enrolled in
    const enrolledCoursesCount = await getEnrolledCourses(studentId);
    if (enrolledCoursesCount === 0) {return}

    // 
    const allCoursesCount = await getAllCoursesCount();
    if (allCoursesCount === 0) {return}

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
          <div className="shadow-md rounded-lg p-4 bg-white size-52">
            The pie chart will go here
          </div>
        </div>

        <div className="bg-white h-[1000px] rounded-lg p-4">
          <p className="font-bold text-2xl">Graph</p>
          <CountSkeleton/>
        </div>
      </div>
    )
} catch (error) {
  console.error(error)
}
}

export default StudentDasboard