'use server'
import { createClient } from "@/lib/supabase/server"

export async function getInstructorLocation(scheduleId) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('schedules')
        .select('id, latitude, longitude')
        .eq('id', scheduleId)
        .single()

    if (error) {
        console.log('Error fetching instructor location', error.message)
        return { success: false, error: error.message}
    }

    return { success: true, data }
}