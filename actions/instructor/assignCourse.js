'use server'
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function assignCourse(courseId, instructorId) {
    const supabase = await createClient()

    console.log('instructorId:', instructorId)
    console.log('CourseId:', courseId)

    if (!courseId || !instructorId) {
        return { error: "Missing course or instructor ID" };
    }

    // Add lecturers and their course of choice
    const { data, error } = await supabase
        .from('instructor_courses')
        .insert([{ instructor_id: instructorId, course_id: courseId }]);

    if (error) {
        console.error('Error inserting lecturers course', error.message)
        return { success: false, error: error.message }
    }
    
    revalidatePath('/instructor/my_lectures')
    return { success: true, message: 'Course assigned successfully', data}
}