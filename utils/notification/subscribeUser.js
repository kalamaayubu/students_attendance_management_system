import { saveSubscription } from "@/actions/notification/saveSubscription";

// Helper function to convert a Base64 URL-encoded VAPID public key to a Uint8Array
function urlBase64ToUint8Array(base64String) {
    // Add necessary padding if the base64 string length is not a multiple of 4
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

    // Replace Base64 URL-specific characters with standard Base64 characters
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = atob(base64); // Decode the Base64 string into a raw binary string

    // Convert the binary string into a Uint8Array
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray; // Return the Uint8Array representation of the key
}


export async function subscribeUser() {
    // Check if service worker is supported
    if (!("serviceWorker" in navigator)) {
        console.error("Service worker is not supported")
        return
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
        alert("User denied push notification permissions.");
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready

        if (!registration) {
            alert("Service Worker is not ready yet");
            return;
        }

        // Request the user's permission to subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
        });

        console.log("User subscribed:", subscription);

        // Convert `PushSubscription` into a plain object
        const subscriptionData = {
            endpoint: subscription.endpoint,
            keys: subscription.toJSON().keys // Extract keys as a plain object
        }

       await saveSubscription(subscriptionData) // Save subscription data to database
    } catch (error) {
        console.error("Failed to subscribe:", error);
    }
}