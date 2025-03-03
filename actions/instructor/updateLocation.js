'use server'
import { createClient } from "@/lib/supabase/server"

export async function updateInstructorLocation(latitude, longitude, instructorId) {
    const supabase = await createClient()

    // Update the instructors location
    const { data, error } = await supabase
        .from('schedules')
        .update({ longitude, latitude })
        .eq("instructor_id", instructorId)
        .select('longitude, latitude')
    
    if (error) {
        console.log('Error updating instructor location:', error)
        return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
        console.log('Could not get insctructor location:')
        return { success: false, error: "Could not get insctructor location" }
    }

    console.log('Instructor location:', data)
    return { success: true, message: "Instructor location update successfully" }
}