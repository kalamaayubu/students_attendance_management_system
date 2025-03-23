// Purpose: Request notification permission & retrieve FCM token
import { getUserId } from "@/utils/getUserId";
import { getToken, messaging, } from "./firebaseConfig";
import { saveFcmToken } from "@/actions/notification/firebase/saveFcmToken";

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission()

        if (permission !== "granted") {
            console.warn("❌ Notification permission denied.");
            return;
        }

        // Register the service worker
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
        console.log("✅ Service Worker registered:", registration);

        // Get FCM token & link to service worker
        const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration // Link to service worker
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
        
        console.log('✅ FCM Token saved successfully')
    } catch (error) {
        console.error('Error requesting permission:', error)
    }
}
