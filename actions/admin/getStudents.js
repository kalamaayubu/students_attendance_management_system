'use server'
import { createClient } from "@/lib/supabase/server"

export async function getStudents() {
    const supabase = await createClient()

    const { data, error } = await supabase.from('profiles').select('*').eq('role', 'student')
    if (error) {
        console.error('Error fetching students', error.message)
        return []
    }

    return data || []
}