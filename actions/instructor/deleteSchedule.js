'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendNotification } from "../notification/firebase/sendNotification"

export async function deleteSchedule(scheduleId, course_code) {
    const supabase = await createClient()

    // Delete the schedule
    const { error } = await supabase.from("schedules").delete().eq('id', scheduleId)

    if (error) {
        console.log('Error deleting schedule:', error)
        return { success: false, error: error.message}
    }

    // Get the subscribers to push notifications to
    const { data: subscribers, error: subscribersError } = await supabase
        .from('push_subscriptions')
        .select('endpoint')

    if (subscribersError) {
        console.log('Error getting subscribers:', subscribersError)
        return { success: false, error: subscribersError.message}
    }

    if (!subscribers || subscribers.length === 0) {
        console.log('No subscriber was found')
        return { success: false, error: 'No subscriber was found'}
    } 

    // Notify users of the deleted schedule
    await sendNotification('Schedule Removed', 'A schedule has been removed. Check your remaining schedules.', subscribers);

    revalidatePath('/instructor/schedules')
    revalidatePath('/student/schedules')
    console.log(`✅ ${course_code} schedule deleted successfully`)
    return { success: true, message: `${course_code} schedule deleted.`}
}