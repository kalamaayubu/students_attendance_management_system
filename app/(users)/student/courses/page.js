import { getCourses } from "@/actions/admin/getCourses"
import EnrollCourseBtn from "@/components/student/EnrollCourseBtn"

const StudentCoursesPage = async () => {
    try {
        const res = await getCourses()
        if (res.length < 1) {
            console.log('No course was found:')
            return
        } 
        
  return (
    <div className="md:p-6 xl:p-8">
        <div className="flex flex-wrap gap-8">
            {res?.map(course => (
                <div key={course.id} className="group cursor-default transition-shadow duration-300 shadow-lg w-[250px] rounded-lg p-4 bg-white hover:shadow-gray-600">
                <div className="flex flex-col ">
                    <div className="self-start flex gap-4">
                        {course.course_code}
                        <EnrollCourseBtn 
                            courseCode={course.course_code} 
                            courseId={course.id}
                        />

                    </div>
                    <span className="truncate">{course.course_name}</span>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
} catch (error) {
    console.error('Error fetching courses:', error)
    return <p className="text-red-700">Error fetching courses:</p>
}
}

export default StudentCoursesPage