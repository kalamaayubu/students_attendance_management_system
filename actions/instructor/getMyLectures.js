'use server'
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/utils/getUserId";

export async function getCourses() {
    const supabase = await createClient()

    // STEP 1: Retrieve instructor ID from cookies
    const instructorId = await getUserId();
    if (!instructorId) {
        return { success: false, error: "User not authenticated" };
    }

    // STEP 2: Get IDs of instructor's courses from instructor_courses table
    const { data: instructorCourses, error: instructorCourseError } = await supabase
        .from('instructor_courses')
        .select('course_id')
        .eq('instructor_id', instructorId);

    if (instructorCourseError) {
        console.error("Error fetching instructor courses:", instructorCourseError);
        return { success: false, error: instructorCourseError.message };
    }
    const courseIds = instructorCourses.map(course => course.course_id);
    console.log('Courses IDs:', courseIds)

    if (courseIds.length === 0) {
        return { success: true, courses: [], message: "No courses found" };
    }

    // STEP 3: Get instructor's courses details from the courses table
    const { data: courses, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds);

    if (courseError) {
        console.error("Error fetching courses:", courseError);
        return { success: false, error: courseError.message };
    }

    console.log('COURSES:', courses)
    return { success: true, courses, message: "Courses retrieved successfully" };
}