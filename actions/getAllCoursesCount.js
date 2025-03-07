'use server'

import { createClient } from "@/lib/supabase/server"

export async function getAllCoursesCount() {
    const supabase = await createClient()

    const { count, error } = await supabase
        .from('courses')
        .select('id', { count: 'exact', head: true })

    if (error) {
        console.log('Error fetching all courses:', error)
        return 0
    }

    return count;
}