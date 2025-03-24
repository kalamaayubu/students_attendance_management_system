// Purpose: Handle incoming push notifications with firebase

importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js");

// Initialize Firebase with your project credentials
firebase.initializeApp({
    apiKey: "push-notification-app-7323c",
    authDomain: "push-notification-app-7323c.firebaseapp.com",
    projectId: "push-notification-app-7323c",
    storageBucket: "push-notification-app-7323c.appspot.app",
    appId: "1:694447797040:web:f7ee77a9dcbb896283cef5",
    messagingSenderId: "694447797040"
})

const messaging = firebase.messaging()

// Listen for incoming push events and display notifications
self.addEventListener("push", async (event) => {
    console.log("🔥 Push Event Received:", event.data);

    if (!event.data) {
        console.warn("⚠️ Push event received but no data available.");
        return;
    }

    let data;
    try {
        // Extract raw text data from the push event
        const textData = await event.data.text();
        console.log("📩 DEBUGGING: Raw Push Data:", textData);
        data = JSON.parse(textData);
    } catch (err) {
        console.warn("⚠️ Invalid JSON. Using as plain text.");
        data = { title: "AttendMe", message: textData };
    }

    console.log("🔔 Attempting to Show Notification:", data);

    event.waitUntil(
        self.registration.showNotification(data.title || "AttendMe", {
            body: data.message || "You have a new message. Check it out.",
            icon: data.icon || "/icons/attendMeIcon2.webp",
            data: { url: data.url || "/student/schedules" },
        }).then(() => {
            console.log("✅ Notification Displayed Successfully!");
        }).catch((err) => {
            console.error("❌ Failed to show notification:", err);
        })
    );
});

// Handle background messages when the app is not in the foreground
messaging.onBackgroundMessage((payload) => {
    console.log("🔥 Background message received:", payload);

    const notificationTitle = payload.notification?.title || "Notification";
    const notificationOptions = {
        body: payload.notification?.body || "No message provided",
        icon: payload.notification?.icon || "/icons/attendMeIcon2.webp",
        data: { url: payload.fcmOptions?.link || "/student/schedules" },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
    console.log("🖱️ Notification Clicked!", event.notification);
    event.notification.close();

    const targetUrl = event.notification.data?.url || "/student/schedules";

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(targetUrl) && "focus" in client) {
                    console.log("🔄 Focusing Existing Tab:", client.url);
                    return client.focus();
                }
            }
            console.log("🌍 Opening New Tab:", targetUrl);
            return clients.openWindow(targetUrl);
        })
    );
});
