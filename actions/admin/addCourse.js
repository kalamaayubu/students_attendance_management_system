'use server'
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";


export async function addCourse(courseCode, courseName) {
    const supabase = await createClient()

    // Insert course into the database
    const { data, error } = await supabase
        .from('courses')
        .insert([{ course_code: courseCode, course_name: courseName }])

    if (error) {
        console.error('Error adding a course:', error.message)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/courses_operations')
    revalidatePath('/student/courses')
    return { success: true, message: 'Course registerd successfully.'}
}