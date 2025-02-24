'use server'
import { createClient } from "@/lib/supabase/server"

export async function getCourses() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('courses')
        .select('*')
        
    console.log("Supabase Response:", { data, error }); // ✅ Debugging

    if (error) {
        console.error('Error fetching courses', error.message)
        return []
    }

    return data || []
}