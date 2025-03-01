'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function markAttendance(scheduleId, studentId, qrCodeId) {
    const supabase = await createClient()
    // console.log('SCHEDULEID:', scheduleId)

    // Mark attendance(Insert into the attendance table)
    const { data, error } = await supabase
        .from('attendance')
        .insert([
            {
                schedule_id: scheduleId,
                student_id: studentId,
                qr_id: qrCodeId
            }
        ])
        .select('*')
    
    if (error) {
        console.error('Error marking attendance:', error)
        if (error.code === '23505') {  // Unique constraint violation
            return { success: false, error: "Attendance already marked." };
        }
        return { success: false, error: error.message }
    }

    revalidatePath('/student/schedules')
    console.log('Attendance marked successfully:', data)
    return { success: true, data, message: 'Attendance marked successfully.'}
}