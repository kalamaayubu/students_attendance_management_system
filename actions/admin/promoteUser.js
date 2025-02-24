'use server'
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function promoteUser(userId) {
    const supabase = await createClient()
    console.log(`UserId from ACTION:${userId}`)

    // Promote the role to instructor
    const { data, error } = await supabase
        .from('profiles')
        .update({role: 'instructor'})
        .eq('id', userId)
        .select('first_name')
        .maybeSingle()

    if (error) {
        console.error('Error promoting user:', error)
        return { success: false, error: error.message }
    }

    // Insert promoted user to the instructors table
    const { data:promotedUserData, error: promotedUserError } = await supabase
        .from('instructors')
        .insert({ instructor_id: userId})

    if (promotedUserError) {
        console.error('Error inserting instructor:', promotedUserError)
        return { success: false, error: promotedUserError.message }
    }
    
    console.log('DATA:', data)
    revalidatePath('/admin/students')
    return { success: true, message: `${data.first_name} successfully promoted`}
}