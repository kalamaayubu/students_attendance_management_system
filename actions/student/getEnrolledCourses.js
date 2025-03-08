'use server'
import { createClient } from "@/lib/supabase/server"

export async function getEnrolledCourses(studentId) {
    const supabase = await createClient()

    // Ensure that studentId exist
    if (!studentId) {
        console.error('User id not found. please log in again after logging out')
        return []
    }

    // Perform a join operation to get the courses of the specified student
    const { data, error } = await supabase
        .from('enrollments')
        .select(`
            course_id,
            courses(course_code, course_name)
        `)
        .eq('student_id', studentId)

    if (error) {
        console.error("Error fetching enrolled courses:", error);
        return [];
    }

    // Return the data of the join operation
    return data || [];
}