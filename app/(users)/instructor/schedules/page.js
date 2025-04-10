import { getCourses } from "@/actions/instructor/getMyLectures"
import { getMySchedules } from "@/actions/instructor/getMySchedules"
import ScheduleCard from "@/components/instructor/ScheduleCard"
import Scheduling from "@/components/instructor/Scheduling"
import { getUserId } from "@/utils/getUserId"

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween"; // ✅ Import the missing plugin
dayjs.extend(utc);
dayjs.extend(isBetween); // ✅ Extend dayjs with isBetween


const SchedulesPage = async () => {
    // Check time and sort the schedules in upcomming, ongoing or past sessions
    const now = dayjs.utc().local().add(3, "hour"); // Adds 3 hours to the current time

    // Categorize classes per their scheduled time
    const upcoming = [];
    const ongoing = [];
    const past = [];

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

        // Fetch the instructor's scheduled sessions
        const instructorId = await getUserId()
        const { sessions, fetchSessionsSuccess, fetchSessionsError } = await getMySchedules(instructorId)

        // Determine where each session belong according to its scheduled time
        sessions.forEach((session) => {
            const start = dayjs.utc(session.start_time).local()
            const end = dayjs.utc(session.end_time).local()

            if (start.isAfter(now)) {
                upcoming.push({ ...session, status: 'upcomming' })
            } else if (now.isBetween(start, end, null, '[)')) {
                ongoing.push({...session, status: 'ongoing'})
            } else {
                past.push({...session, status: 'past'})
            }
        })

        return (
            <div className="">
                <div className="flex flex-col gap-4">
                    <div className="bg-white p-5 mt-2">
                        <h1 className="text-[18px] bg-gradient-to-br from-blue-800 to-purple-500 text-transparent bg-trasparent bg-clip-text mb-2 text-center lg:text-start">Schedule a lesson</h1>
                        <Scheduling courses={courses}/>
                    </div>

                    {/* Ongoing sessions */}
                    {ongoing.length > 0 && (
                        <div className="mt-10 bg-white p-6">
                            <h2 className="text-[18px] bg-gradient-to-br from-blue-800 to-purple-500 text-transparent bg-trasparent bg-clip-text">Ongoing sessions</h2>
                            <div className="">
                                {ongoing.length > 0 && (
                                    <div className="flex gap-4 flex-wrap">
                                        {ongoing.map((session, index) => (
                                            <ScheduleCard status={'ongoing'} key={index} session={session} courses={courses}/>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Upcomming sessions */}
                    {upcoming.length > 0 && (
                        <div className="mt-10 p-6 bg-white">
                            <h2 className="text-[18px] bg-gradient-to-br from-blue-800 to-purple-500 text-transparent bg-trasparent bg-clip-text">Upcoming sessions</h2>
                            <div className="">
                                {upcoming.length > 0 && (
                                    <div className="flex gap-4 flex-wrap">
                                        {upcoming.map((session, index) => (
                                            <ScheduleCard status={'upcoming'} key={index} session={session} courses={courses}/>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Past sessions */}
                    {past.length > 0 && (
                        <div className="mt-10 hidden bg-white p-5 flex-col items-center">
                            <h2 className="text-[18px] mb-6 bg-gradient-to-br from-blue-800 to-purple-500 text-transparent bg-trasparent bg-clip-text">Last two days</h2>
                            <div className="">
                                {past.length > 0 && (
                                    <div className="flex gap-4 flex-wrap bg-opacity-20">
                                        {past.map((session, index) => (
                                            <ScheduleCard status={'past'} key={index} session={session} courses={courses}/>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    } catch (error) {
         console.error('Error fetching your courses:', error)   
    }
}

export default SchedulesPage