'use server'
import { createClient } from "@/lib/supabase/server"

export async function getAttendanceRecords(studentId) {
    const supabase = await createClient()

    // Fetch attendance records for the student
    const { data: attendanceRecords, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", studentId);

    if (error) {
        console.error("Error fetching attendance records:", error);
        return []
    }

    console.log('Attendance Records:', attendanceRecords)
    return attendanceRecords || []
}
