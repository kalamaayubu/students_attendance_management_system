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
    const { data: subscribers, error: tokensError } = await supabase
        .from('push_subscriptions')
        .select('endpoint')

    if (tokensError) {
        console.log('Error getting subscribers:', tokensError)
        return { success: false, error: tokensError.message}
    }

    if (!subscribers || subscribers.length === 0) {
        console.log('No subscriber was found')
        return { success: false, error: 'No subscriber was found'}
    } 

    // const tokens = subscribers.map(subscriber => subscriber.endpoint)
    console.log('TOKENS:::', subscribers)
    // Notify users of the deleted schedule
    await sendNotification("Schedule removed", "Schedule removed. Check your remaining schedules", subscribers)

    revalidatePath('/instructor/schedules')
    console.log(`✅ ${course_code} schedule deleted successfully`)
    return { success: true, message: `${course_code} schedule deleted.`}
}