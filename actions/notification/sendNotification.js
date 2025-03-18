"use server";
import { createClient } from "@/lib/supabase/server";
import webpush from "web-push";

webpush.setVapidDetails(
    "mailto:kalamayeng@gmail.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export async function sendNotification(title, message, subscriptions) {
    const supabase = await createClient();
    
    if (!subscriptions || subscriptions.length === 0) {
        return { success: false, error: "No active subscriptions found" };
    }

    // Notification payload
    const payload = JSON.stringify({ title, message, url: "/students/schedules" });

    console.log("🔔 PUSH PAYLOAD:", payload);

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
                payload
            );
            successes++; // ✅ Success counter
        } catch (err) {
            console.error("❌ Push notification failed:", {
                statusCode: err.statusCode,
                message: err.message,
                body: err.body,
                stack: err.stack
            });

            if (err.statusCode === 410) {
                console.warn("Subscription expired, removing from DB:", sub.endpoint);
                await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
                expiredSubs++;
            } else {
                failures++;
            }
        }
    }

    // 📌 Response handling
    if (successes > 0 && failures === 0) {
        return { success: true, message: `✅ Notifications sent to ${successes} subscribers` };
    } else if (successes > 0 && failures > 0) {
        return { success: false, message: `⚠️ Partial success: ${successes} sent, ${failures} failed` };
    } else if (failures > 0 && successes === 0) {
        return { success: false, message: `❌ All notifications failed.` };
    } else if (expiredSubs > 0 && successes === 0) {
        return { success: false, message: `🔄 No active subscriptions left. Removed ${expiredSubs} expired ones.` };
    }

    return { success: false, message: "Unknown error occurred" };
}
