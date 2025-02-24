'use server';
import { createClient } from "@/lib/supabase/server";

export async function enrollCourse(studentId, regNo, courseId, courseCode) {
  const supabase = await createClient();
  console.log(`ENROLLMENT DATA: ${studentId}-${regNo}-${courseId}`)

  try {
    // Step 1: Insert into students table (ignore if exists(usage of upsert))
    const { data: studentData, error: studentError } = await supabase
      .from("students")
      .upsert([{ student_id: studentId, reg_no: regNo }], {onConflict: 'student_id, reg_no'}
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
  
    console.log(`STUDENT(FROM TABLE): ${studentData.id}`);

    // Step 2: Insert into enrollments table
    const { error: enrollmentError } = await supabase
      .from("enrollments")
      .upsert([{ student_id: studentData.id, course_id: courseId }], {
        onConflict: "student_id, course_id",
      })
      .maybeSingle();

    if (enrollmentError) {
      console.error("Enrollment error:", enrollmentError.message);

      // Rollback: Delete student if enrollment fails
      await supabase.from("students").delete().eq("student_id", studentId);

      return { success: false, error: "Enrollment failed. Rolled back student record." };
    }

    return {
      success: true,
      message: `${courseCode} enrolled successfully`,
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Unexpected server error occurred." };
  }
}
