import { getCourses } from "@/actions/instructor/getMyLectures"
import Scheduling from "@/components/instructor/Scheduling"

const SchedulesPage = async () => {
    try {
        // Fetch instructor's courses
        const {success, courses, message, error } = await getCourses()

        if (!success) {
            console.error('Something went wrong')
            return <p className="text-red-600">{error} || Error occured. please try again later</p>
        }

        if (courses.length === 0) {
            console.log('Error occured fetching courses. Please try again later')
            return <p className="text-red-600">{message} || Could not fetch your courses</p>
        }
        return (
            <div>
                <div className="flex flex-col gap-8">
                    <div className="">
                        <h1 className="text-3xl lg:text-4xl mb-2 text-center lg:text-start">Schedule a lesson</h1>
                        <Scheduling courses={courses}/>
                    </div>

                    <div>
                        <h2 className="text-2xl lg:text-3xl">My schedules</h2>
                    </div>
                </div>
            </div>
        )
    } catch (error) {
         console.error('Error fetching your courses:', error)   
    }
}

export default SchedulesPage