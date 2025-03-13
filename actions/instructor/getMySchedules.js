'use server'
import { createClient } from "@/lib/supabase/server"

export async function getMySchedules(instructorId) {
    const supabase = await createClient()
    
    // Get the timestamp for 2 days ago
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    const { data: sessions, error:fetchSessionsError } = await supabase
        .from('schedules')
        .select(`
            course_id,
            start_time, 
            end_time,
            courses!inner(
                course_code,
                course_name
            )
        `)
        .eq('instructor_id', instructorId)
        .gte('start_time', twoDaysAgo.toISOString()) // Convert to ISO format for PostgreSQL compatibility


    if (fetchSessionsError) {
        console.error('Error fetching instructor schedules:', fetchSessionsError)
        return { fetchSessionsSuccess: false, fetchSessionsError: fetchSessionsError.message }
    }

    console.log('Instructor schedules data:', sessions)
    return { fetchSessionsSuccess: true, sessions }
}