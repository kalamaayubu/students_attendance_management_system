'use server'
import { createClient } from "@/lib/supabase/server"

export async function saveSubscription(subscription) {
    const supabase = await createClient()
    const { endpoint, keys } = subscription

    const { data, error} = await supabase
        .from('push_subscriptions')
        .upsert([{ endpoint, auth: keys.auth, p256dh: keys.p256dh }], { onConflict: "endpoint" });

    if (error) {
        console.error('Error saving subscription', error)
        return { success: false, error: error.message }
    }

    return { success: true, message: 'Successfully subscribed'}
}