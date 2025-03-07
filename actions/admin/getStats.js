'use server'
import { createClient } from "@/lib/supabase/server"

// Get the total number of students
export async function getStudentsCount() {
    const supabase = await createClient()

    const { count, error} = await supabase
        .from('students')
        .select('id', {count: 'exact', head: true})

    if (error) {
        console.error('Error fetching students count:', error)
        return 0
    }
    return count
}

// Get the total number of instructors
export async function getInstructorsCount() {
    const supabase = await createClient()

    const { count, error} = await supabase
        .from('instructors')
        .select('id', {count: 'exact', head: true})

    if (error) {
        console.error('Error fetching instructors count:', error)
        return 0
    }

    return count
}
