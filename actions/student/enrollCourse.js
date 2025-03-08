'use server';
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function enrollCourse(studentId, regNo, courseId, courseCode) {
  const supabase = await createClient();

  try {
    // Step 1: Insert into students table (ignore if exists(usage of upsert))
    const { data: studentData, error: studentError } = await supabase
      .from("students")
      .upsert([{ id: studentId, reg_no: regNo }], {
        onConflict: 'id'
      }
    )
      .select('id')
      .maybeSingle()

    if (studentError) {
      console.error("Error adding/upserting student:", studentError);
      return { success: false, error: studentError.message };
    }

    if (!studentData) {
        console.error("Student insert/upsert did not return data.");
        return { success: false, error: "Failed to retrieve student record after insert." };
    }
  
    // Step 2: Try enrolling the student
    const { count, error: enrollmentError } = await supabase
      .from("enrollments")
      .upsert([{ student_id: studentData.id, course_id: courseId }], {
        onConflict: ["student_id, course_id"],
        ignoreDuplicates: true,
        count: "exact",  // This tells us if a row was inserted/updated
      })
      .maybeSingle()

      console.log("Enrollment count:", count);

    if (enrollmentError) {
      console.error("Enrollment error:", enrollmentError.message);
      return { success: false, error: "Enrollment failed. Please try again later." };
    }

    // If count is 0, that means the row already existed (no new insert happened)
    if (count === null) {
      return { success: false, error: `${courseCode} already enrolled.` };
    }

    // Revalidate student dashboard
    revalidatePath('/student/dashboard');
    return {
      success: true,
      message: `${courseCode} enrolled successfully`,
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Unexpected server error occurred." };
  }
}
