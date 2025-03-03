import { getAttendanceRecords } from "@/actions/student/getAttendanceRecords";
import { getClasses } from "@/actions/student/getClassesTest"
import UpcomingClassCard from "@/components/student/UpcomingClassCard"
import { getUserId } from "@/utils/getUserId"

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween"; // ✅ Import the missing plugin
dayjs.extend(utc);
dayjs.extend(isBetween); // ✅ Extend dayjs with isBetween

export const revalidate = 0; // Regenerate after 2 hours

const SchedulesPage = async () => {
    try {
        // Get id of the loged in student
        const studentId = await getUserId()
        // console.log('STUDENTID:', studentId)

        // Get schedules of the student's enrolled courses
        const schedules = await getClasses(studentId)
        if (schedules.length === 0) {
            return <p>Could not fetch upcomming schedules</p>
        }

        // Fetch attendance records for the student
        const attendanceRecords = await getAttendanceRecords(studentId)
        const now = dayjs.utc().local().add(3, "hour"); // Adds 3 hours to the current time

        // Categorize classes per their scheduled time
        const upcoming = [];
        const ongoing = [];
        const past = [];

        schedules.forEach(schedule => {
            const start = dayjs.utc(schedule.start_time).local()
            const end = dayjs.utc(schedule.end_time).local()

            if (start.isAfter(now)) {
                upcoming.push({...schedule, status: 'upcoming'})
            } else if (now.isBetween(start, end, null, '[)')) {  // [) includes start, excludes end
                // console.log("ONGOING CLASS DETECTED:", schedule);
                ongoing.push({...schedule, status: 'ongoing'});
            } else if(end.isBefore(now)) {
                past.push({...schedule, status: 'past'})
            } 

            // console.log(`FROM DATABASE -> NOW: ${now}\n STARTS: ${start}\n ENDS: ${end}`)
            // console.log('ISBETWEEN:', now.isBetween(start, end, null, "[]"))
            // // console.log("isBetween (default):", now.isBetween(start, end));
        });

        return (
            <div className="md:p-5 lg:p-6 xl:p-7 2xl:p-8">
                {/* Ongoing */}
                {ongoing.length > 0 && (
                    <div className="flex flex-col mt-6">
                        <h3 className="text-[20px] bg-gradient-to-br from-blue-800 to-purple-500 bg-clip-text text-transparent">Ongoing</h3>
                        <div className="flex flex-wrap py-2 gap-6">
                            {ongoing.map((schedule) => (
                                <UpcomingClassCard 
                                    key={schedule.schedule_id} 
                                    scheduleData={schedule}
                                    studentId={studentId}
                                    attendanceRecords={attendanceRecords}
                                    status="ongoing"
                                />
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Upcoming */}
                {upcoming.length > 0 && (
                    <div className="flex flex-col pt-8">
                        <h3 className="text-[20px] bg-gradient-to-br from-blue-800 to-purple-500 bg-clip-text text-transparent">Upcoming</h3>
                        <div className="flex flex-wrap py-2 gap-6">
                            {upcoming.map((schedule) => (
                                <UpcomingClassCard 
                                    key={schedule.schedule_id} 
                                    scheduleData={schedule}
                                    studentId={studentId}
                                    attendanceRecords={attendanceRecords}
                                    status="upcoming"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past */}
                {past.length > 0 && (
                    <div className="flex flex-col mt-6 pt-8 opacity-60">
                        <h3 className="text-[20px] bg-gradient-to-br from-blue-800 to-purple-500 bg-clip-text text-transparent">Past Classes</h3>
                        <div className="flex flex-wrap py-2 gap-6">
                            {past.map((schedule) => (
                                <UpcomingClassCard 
                                    key={schedule.schedule_id} 
                                    scheduleData={schedule}
                                    studentId={studentId}
                                    attendanceRecords={attendanceRecords}
                                    status="past"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    } catch (error) {
        console.error('Error fetching upcoming classes:', error)
    }
}

export default SchedulesPage