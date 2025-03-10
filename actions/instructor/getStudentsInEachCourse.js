'use server'

import { createClient } from "@/lib/supabase/server"

export async function getStudentsInEachCourse(instructorId) {
    const supabase = await createClient()

    // Fetch the course code and the number of students enrolled in each course
    const { data, error } = await supabase
        .from('instructor_courses')
        .select(`
            course_id,
            courses!inner(
                course_code,
                enrollments(count)
            )
        `)
        .eq('instructor_id', instructorId)

    if (error) {
        console.error('Error fetching students in each course', error)
        return []
    }

    // Get the course code and the number of students enrolled in each course
    const refinedData = data.map(({ courses }) => {
        return { 
            course: courses.course_code,
            students: courses.enrollments[0].count 
        }
    })

    return refinedData
}