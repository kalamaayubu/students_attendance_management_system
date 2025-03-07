'use server'

import { createClient } from "@/lib/supabase/server"

export async function getCoursesCount(instructorId) {
    const supabase = await createClient()

    const { count, error} = await supabase
        .from('instructor_courses')
        .select('id', {count: 'exact', head: true})
        .eq('instructor_id', instructorId)

    if (error) {
        console.error('Error fetching instructor courses:', error)
        return 0
    }

    return count
}