import { getEnrolledCourses } from "@/actions/student/getEnrolledCourses"
import { getUserId } from "@/utils/getUserId"

const EnrolledCoursesPage = async () => {
    try {
        const studentId = await getUserId()

        // Enl
        if (!studentId) {
            console.error("Student ID not found");
            return <p>Student ID not available</p>;
        }

        // Get the specified student's enrolled courses
        const res = await getEnrolledCourses(studentId)

        // If the result is not an array
        if (!Array.isArray(res)) {
            console.error("Expected an array but got:", res);
            return <p>Failed to load courses.</p>;
        }

        return (
            <div>
                <div>
                    <h1 className="text-3xl lg:text-4xl">Enrolled Courses</h1>
                    <div className="bg-white p-4 w-fit rounded-lg">
                        <ol className="list-decimal px-2 pr-3">
                            {res.map((course, index) => (
                                <div key={index}>
                                    <li className="flex gap-6 mb-2">
                                        <span className="font-semibold">{course.courses?.course_code}</span>
                                        <span>{course.courses?.course_name}</span>
                                    </li>
                                    {index !== res.length - 1 && ( // Add separator ONLY if not the last item
                                        <div className="my-2 h-[1px] w-full bg-gray-300" />
                                    )}              
                                </div>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )

    } catch (error) {
        console.error('Error fetching enrolled courses:', error)
        return
    }
}

export default EnrolledCoursesPage