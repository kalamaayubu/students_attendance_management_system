'use server'

import { createClient } from "@/lib/supabase/server"
import { sendNotification } from "../notification/firebase/sendNotification"
import { revalidatePath } from "next/cache"

export async function updateSchedule(scheduleId, startTime, endTime, longitude, latitude, courseId, courseCode) {
    const supabase = await createClient()

    console.log('CHECK UPDATES:', `${scheduleId}:${courseId}:${courseCode}:${longitude}`)

    // Update the schedule, retaining original values if any field is missing
    const { error: updateError } = await supabase
        .from('schedules')
        .update({
            course_id: courseId ?? undefined,
            start_time: startTime ?? undefined,
            end_time: endTime ?? undefined,
            longitude: longitude ?? undefined,
            latitude: latitude ?? undefined
        })
        .eq("id", scheduleId)

    if (updateError) {
        console.log('Error updating schedule:', updateError)
        return { success: false, error: updateError.message }
    }

    // Fetch the subscribers
    const { data: tokens, error: tokensError } = await supabase
        .from("push_subscriptions")
        .select('endpoint')

    if (tokensError) {
        console.log('Error getting subscribers:', tokensError)
        return { success: false, error: tokensError.message }
    }

    if (!tokens || tokens.length === 0) {
        console.log('Tokens not found')
        return { success: false, error: 'Subscription tokens not found.'}
    }

    // Send the notifications
    await sendNotification('Schedule Updated', 'A schedule has been updated. Review your current schedules.', tokens);

    // Revalidate UI paths
    revalidatePath('/student/schedules')
    revalidatePath('/instructor/schedules')

    console.log(`✅ ${courseCode} schedule updates successfully`)
    return { success: true, message: `${courseCode} schedule updated.`}
}