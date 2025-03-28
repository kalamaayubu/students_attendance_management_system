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

// Initialize FCM to enable this(sw) to receive push notifications from firebase servers
const messaging = firebase.messaging()

// Listen to background messages from firebase servers
messaging.onBackgroundMessage((payload) => {
    // Extract the required details from the payload
    const notificationTitle = payload.notification?.title || "AttendMe";
    const notificationOptions = {
        body: payload.notification?.body || "You have a new message. Please check it out",
        icon: "/icons/attendMeIcon2.webp" || payload.notification?.icon ,
        data: { url: payload.fcmOptions?.link || "/student/schedules" },
    };

    // Display push notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || "/student/schedules";

    event.waitUntil( 
        clients.matchAll({ type: "window", includeUncontrolled: true }) /* Get all open browser tabs controlled by this service worker */
        .then((clientList) => {
            // Loop through each open tab/window
            for (const client of clientList) {
                if (client.url.includes(targetUrl) && "focus" in client) {
                    return client.focus(); // If a matching tab exists, bring it to the front
                }
            }
            // If no matching tab is found, open a new one
            return clients.openWindow(targetUrl);
        })
    );
});
