'use server'
import { createClient } from "@/lib/supabase/server"
import QRCode from "qrcode"; // Import QRCode
import { revalidatePath } from "next/cache";


export async function scheduleSession({ courseId, instructorId, startTime, endTime, latitude, longitude, }) {
    const supabase = await createClient()
    console.log("USERID::", instructorId);
    console.log("COURSEID::", courseId);

    // STEP 1: Insert data into the schedules table
    const { data: insertScheduleData, error: insertScheduleError } = await supabase
        .from('schedules')
        .insert([
            { 
                course_id: courseId, 
                instructor_id: instructorId,
                start_time: startTime, 
                end_time: endTime,
                longitude, 
                latitude
            }
        ])
        .select('id') // Get the id of the newly created schedule
        .maybeSingle()

    if (insertScheduleError) {
        console.log('Error scheduling:', insertScheduleError)
        return { success: false, error: insertScheduleError.message };
    }

    const scheduleId = insertScheduleData.id
    console.log("✅ Scheduled session ID:", scheduleId);

    // STEP 2: Generate the qr-code for the scheduled session
    const qrData = `Lesson:${scheduleId}` // QR code will encode the schedule ID
    let qrCodeDataURL;
    try {
        qrCodeDataURL = await QRCode.toDataURL(qrData)
        console.log("✅ QR code generated successfully.");
    } catch (qrError) {
        console.error("Error generating QR code:", qrError);
        return { success: false, error: "Failed to generate QR code." };
    }

    // STEP 3: insert the generated qr-code into the qr_codes table
    const { error: qrInsertError } = await supabase
    .from("qr_codes")
    .insert([
        {
            schedule_id: scheduleId,
            qr_data: qrCodeDataURL,
        }
    ])

    if (qrInsertError) {
        console.error("Error saving QR code:", qrInsertError);
        // Delete the schedule for data consistency
        const { error: deleteError } = await supabase
        .from("schedules")
        .delete()
        .eq("id", scheduleId); // Assuming 'id' is the primary key in the schedules table

        if (deleteError) {
            console.error("Error rolling back schedule:", deleteError);
            return { success: false, error: "Failed to save QR code and rollback schedule." };
        }
        return { success: false, error: "Failed to save QR code." };
    }

    // STEP 4: Get the enrolled students and send notification to each
    // const { data: students, error: studentsError } = await supabase
    //     .from('enrollments')
    //     .select('student_id')
    //     .eq('course_id', courseId);

    // console.log('Course enrolled by:', students)
    
    // if (studentsError) {
    //     console.error('Error getting enrolled students:', studentsError)
    //     return { success: false, error: studentsError.message || 'Failed to get enrolled students.' }
    // }

    // // Map over the enrolled students to send them notifications
    // if (students?.length > 0) {
    //     const notificationResponse = await sendNotification(
    //         students.map((s) => s.student_id),
    //         'CSC000',
    //         startTime
    //     );

    //     if (!notificationResponse.success) {
    //         console.error('Failed to send notifications:', notificationResponse.error);
    //         return { success: false, error: "Failed to send notifications"}
    //     }

    //     console.log('Notifications sent to:', students)
    // }

    revalidatePath('/students/schedules')
    return { success: true, message: "Session scheduled successfully!" };
}