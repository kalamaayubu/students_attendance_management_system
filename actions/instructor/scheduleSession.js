'use server'
import { createClient } from "@/lib/supabase/server"
import QRCode from "qrcode"; // Import QRCode
import { revalidatePath } from "next/cache";
import { sendNotification } from "../notification/sendNotification";


export async function scheduleSession({ courseId, instructorId, startTime, endTime, latitude, longitude, }) {
    const supabase = await createClient()

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
    const { data: students, error: studentsError } = await supabase
        .from('enrollments')
        .select('student_id')
        .eq('course_id', courseId);
    
    if (studentsError) {
        console.error('Error getting enrolled students:', studentsError)
        return { success: false, error: studentsError.message || 'Failed to get enrolled students.' }
    }

    // STEP 5: Get notification subscriptions for enrolled students
    const studentIds = students.map(s => s.student_id)
    const { data: userEndPoints, error: pushError } = await supabase
        .from("push_subscriptions")
        .select("endpoint, auth, p256dh")
        .in("id", studentIds)

        console.log('Sessions enrolled students:', studentIds)
        console.log('User Endpoints:', userEndPoints)

    if (pushError) {
        console.log('Error pushing notifications', pushError)
        return { success: false, error: 'Failed to send messages to students.'}
    }

    // Send push notifications
    console.log('💻 Session scheduled successfully')
    await sendNotification("New schedule", "A new class has been scheduled. Please check it out", userEndPoints)

    revalidatePath('/students/schedules')
    return { success: true, message: "Session scheduled successfully!" };
}