import { getCourses } from "@/actions/admin/getCourses";
import AddCourseButton from "@/components/admin/AddCourseButton"
import CoursesList from "@/components/admin/CoursesList"

const AdminstrationPage = async () => {
    const courses = await getCourses();
    console.log("Fetched Courses:", courses); // ✅ Debugging
  
  return (
    <div className="flex flex-col gap-4 lg:mx-4">
      <div className="flex items-center justify-between">
        <h1>Courses</h1>
        <AddCourseButton/>
      </div>
      <div>
        <CoursesList courses={courses}/>
      </div>
    </div>
  )
}

export default AdminstrationPage