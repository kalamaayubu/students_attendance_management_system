'use server'

import { createClient } from "@/lib/supabase/server"

export default async function storeToken(req) {
    const supabase = await createClient()
    const { userId, token } = await req.json()

    const {error} = await supabase
        .from("push_subscriptions")
        .upsert({ auth: userId, endpoint: token })

    if (error) {
        console.error('Could not store token:', error)
        return { success: false, error: error.message}
    }

    return { success: true, message: 'Token stored successfully!'}
}

