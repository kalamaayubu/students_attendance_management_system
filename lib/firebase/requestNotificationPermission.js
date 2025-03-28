// Purpose: Request notification permission & retrieve FCM token
import { getUserId } from "@/utils/getUserId";
import { getToken, messaging, } from "./firebaseConfig";
import { saveFcmToken } from "@/actions/notification/firebase/saveFcmToken";

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission() // Request notification permission

        if (permission !== "granted") {
            console.warn("❌ Notification permission denied.");
            return;
        }

        // Register the service worker from firebase-messaging-sw.js
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
        console.log("✅ Service Worker registered:", registration);

        // Request FCM token for the browser/device & link to the service worker
        const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration // Link to service worker, allowing FCM to deliver notifications properly
        })

        if (!token) {
            console.warn("❌ Failed to retrieve FCM token.");
            return;
        }

        // Get user ID
        const userId = await getUserId()

        // Save the token to supabase
        const res = await saveFcmToken(userId, token)
        if (!res.success) {
            console.error("❌ Error saving token:", res.error);
            return
        }
    } catch (error) {
        console.error('Error requesting permission:', error)
    }
}
