'use server'

import { createClient } from "@/lib/supabase/server"

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