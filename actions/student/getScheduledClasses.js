'use server'

import { createClient } from "@/lib/supabase/server"

export async function getScheduledClasses(studentId) {
    const supabase = await createClient()

    // A JOIN OPERATION: Get the courses and instructors data of the schedules
    const {data: scheduleData, error: scheduleDataError } = await supabase
        .from('schedules')
        .select(`
            course_id, 
            courses(course_code, course_name), 
            instructor_id, 
            profiles(first_name, second_name),
            enrollments!inner(student_id),
            start_time, 
            end_time
        `)
        .eq('enrollments.student_id', studentId)

        console.log('SCHEDULEDATA:', scheduleData)

        if (scheduleDataError) {
            console.error('Error fetching upcomming classes:', scheduleDataError)
            return []
        }

    console.log('Sheduled class fetched successfully:', scheduleData)
    return scheduleData || []    
}