'use server'

import { createClient } from "@/lib/supabase/server"

export async function removeInvalidToken(token) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('push_subscriptions')
        .delete()
        .eq('token', token)

    if (error) {
        console.log('Error deleting invalid token', error)
        return { success: false, error: error.message}
    }

    console.log('Invalid token deleted successfuly')
    return { success: true, message: 'Invalid token(s) deleted successfuly'}
}