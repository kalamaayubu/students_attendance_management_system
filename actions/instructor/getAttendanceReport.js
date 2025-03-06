'use server'
import { createClient } from "@/lib/supabase/server"

export async function getAttendanceReport(courseId) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('enrollments')
        .select(`
            student_id,
            attendance(
                student_id, 
                schedule_id,
                schedules(start_time)
            ),
            courses!inner(
                course_code, 
                course_name,
                instructor_courses!inner(
                    instructors!inner(
                        profiles!inner(
                            first_name,
                            second_name
                        )
                    )
                )
            ),
            students(
                reg_no,
                id,
                profiles(first_name, second_name)
            )
        `)
        .eq('course_id', courseId)

    if (error) {
        console.log('Error getting attendance report:', error)
        return { success: false, error: error.message }
    }

    console.log('✅ Raw Attendance Report:', JSON.stringify(data, null, 2)); // Pretty print JSON
    return { success: true, data }
}
