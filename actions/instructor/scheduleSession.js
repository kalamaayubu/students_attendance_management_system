'use server'
import { createClient } from "@/lib/supabase/server"
import QRCode from "qrcode"; // Import QRCode


export async function scheduleSession({ courseId, instructorId, startTime, endTime }) {
    const supabase = await createClient()
    console.log("USERID::", instructorId);
    console.log("COURSEID::", courseId);

    // Step 1: Insert data into the schedules table
    const { data: insertScheduleData, error: insertScheduleError } = await supabase
        .from('schedules')
        .insert([
            { 
                course_id: courseId, 
                instructor_id: instructorId,
                start_time: startTime, 
                end_time: endTime 
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

    // Step 2: Generate the qr-code for the scheduled session
    const qrData = `Lesson:${scheduleId}` // QR code will encode the schedule ID
    let qrCodeDataURL;
    try {
        qrCodeDataURL = await QRCode.toDataURL(qrData)
        console.log("✅ QR code generated successfully.");
    } catch (qrError) {
        console.error("Error generating QR code:", qrError);
        return { success: false, error: "Failed to generate QR code." };
    }

    // Step 3: insert the generated qr-code into the qr_codes table
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
        .eq("id", data[0]?.id); // Assuming 'id' is the primary key in the schedules table

        if (deleteError) {
            console.error("Error rolling back schedule:", deleteError);
            return { success: false, error: "Failed to save QR code and rollback schedule." };
        }
        return { success: false, error: "Failed to save QR code." };
    }

    return { success: true, message: "Session scheduled successfully!" };
}