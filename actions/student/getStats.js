'use server'
import { createClient } from "@/lib/supabase/server"

// Get all the enrolled courses of a student
export async function getEnrolledCourses(studentId) {
    const supabase = await createClient()

    const { count, error } = await supabase
        .from("enrollments")
        .select("course_id", { count: "exact", head: true })
        .eq("student_id", studentId)

    if (error) {
        console.log('Error fetching enrolled courses:', error)
        return 0
    }

    console.log(`Student ${studentId} is enrolled in ${count} courses.`);
    return count
}

// Get the student's attendance for each enrolled course
export async function getAttendanceForCourses(studentId) {
    const supabase = await createClient()

    const {data, error} = await supabase
        .from('attendance')
        .select(`
            schedule_id,
            student_id,
            schedules!inner(
                course_id,
                courses(course_code)
            ),
            enrollments!inner(course_id)
        `)
        .eq('enrollments.student_id', studentId)

    if (error) {
        console.error('Error fetching attendance for courses:', error)
        return []
    }

    // Compute total schedules for each course
    const courseScheduleCounts = new Map() // Track total schedules per course
    const attendanceMap = new Map() // Track specific shedules that student attended

    data.forEach(({ schedules, schedule_id }) => {
        const courseCode = schedules.courses.course_code;

        // Count total schedules per course
        if (!courseScheduleCounts.has(courseCode)) {
            courseScheduleCounts.set(courseCode, 0);
        }
        courseScheduleCounts.set(courseCode, courseScheduleCounts.get(courseCode) + 1)

        // Track attended schedules
        if (!attendanceMap.has(courseCode)) {
            attendanceMap.set(courseCode, new Set())
        }
        attendanceMap.get(courseCode).add(schedule_id)
    });

    // Calculate attendace percentage
    const attendanceStats = []
    courseScheduleCounts.forEach((totalSchedules, courseCode) => {
        const attended = attendanceMap.get(courseCode)?.size || 0
        const percentage = (attended / totalSchedules)

        // Add the stats(courseCode, attended, totalSchedules, and attendancePercentage) to attendanceStats
        attendanceStats.push({
            courseCode,
            attended,
            totalSchedules, 
            attendancePercentage: Number((percentage * 100).toFixed(0)) // Ensures it's a number
        })
    })

    return attendanceStats || []
}