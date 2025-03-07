'use server'

import { createClient } from "@/lib/supabase/server"

export async function getUserBio(userId) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('first_name, second_name, email')
        .eq('id', userId)
        .single()

    if (error) {
        console.error('Error fetching user bio:', error)
        return { data: {first_name: 'Username', second_name: 'Username', email: 'Email'}}
    }

    console.log('USER BIO:', data)
    return { data }
}