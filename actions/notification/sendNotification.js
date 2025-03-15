'use server'

import { createClient } from "@/lib/supabase/server";
import webpush from "web-push";

webpush.setVapidDetails(
    "mailto:kalamayeng@gmail.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export async function sendNotification(title, message) {
    const supabase = await createClient();

    // Fetch all push subscriptions
    const { data: subscriptions, error } = await supabase.from("push_subscriptions").select("*");
    if (error) {
        console.error("Failed to fetch subscriptions:", error);
        return { success: false, error: "Failed to retrieve subscriptions" };
    }
    console.log("Fetched Subscriptions:", subscriptions);

    if (!subscriptions.length) {
        return { success: false, error: "No active subscriptions found" };
    }

    const payload = JSON.stringify({
        title,
        message,
        url: "/student/schedules",
    });

    console.log("PUSH PAYLOAD:", payload);

    let successes = 0;
    let failures = 0;
    let expiredSubs = 0;

    for (const sub of subscriptions) {
        try {
            await webpush.sendNotification(
                {
                    endpoint: sub.endpoint,
                    keys: {
                        auth: sub.auth,
                        p256dh: sub.p256dh,
                    },
                },
                payload,
                {
                    headers: {
                        TTL: "60", // Time to live
                        urgency: "high",
                    }
                }
            );
            successes++; // ✅ Track successful notifications
        } catch (err) {
            console.error("❌ Push notification failed:", {
                statusCode: err.statusCode,
                message: err.message,
                body: err.body, // Include full response body
                stack: err.stack // Log full error stack
            });
        
            if (err.statusCode === 410) {
                console.warn("Subscription expired, removing from DB:", sub.endpoint);
                await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
                expiredSubs++;
                return {success: false, error: 'Something went wrong. Please try again'}
            } else {
                console.error("Push send failed:", err.statusCode, err.body || err);
                failures++;
            }
        }
    }

    // 📌 Return structured response based on outcomes
    if (successes > 0 && failures === 0) {
        return { success: true, message: `Notifications sent successfully to ${successes} subscribers` };
    } else if (successes > 0 && failures > 0) {
        return { 
            success: false, 
            message: `Partial success: ${successes} notifications sent, ${failures} failed` 
        };
    } else if (failures > 0 && successes === 0) {
        return { 
            success: false, 
            message: `All notifications failed. No notifications were sent.` 
        };
    } else if (expiredSubs > 0 && successes === 0) {
        return { 
            success: false, 
            message: `No active subscriptions left. ${expiredSubs} expired and were removed.` 
        };
    }

    return { success: false, message: "Unknown error occurred" };
}
