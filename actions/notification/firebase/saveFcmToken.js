'use server'

import { createClient } from "@/lib/supabase/server"

// Purpose: Save the retrieved FCM token into Supabase database
export const saveFcmToken = async (userId, token) => {
    const supabase = await createClient()
    console.log('Token data:', `${userId}; ${token};`)

    const { error } = await supabase
        .from('push_subscriptions')
        .upsert({ id: userId, endpoint: token});

    if (error) {
        console.log('Error saving FCM token:', error)
        return { success: false, error: error.message}
    } 
    
    console.log("✅ FCM Token saved successfully:");
    return{ success: true, message: '✅ FCM Token saved successfully' }
}