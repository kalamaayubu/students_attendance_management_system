self.addEventListener('push', async (event) => {
    console.log("Push Event Received:", event.data);

    if (!event.data) {
        console.warn("Push event received but no data available.");
        return;
    }

    let data;
    try {
        const textData = await event.data.text(); // ✅ Extract text from event.data
        console.log("Raw Push Data:", textData); // ✅ Log the raw data
        const data = JSON.parse(textData); // ✅ Parse JSON

        // ✅ Show notification
        self.registration.showNotification(data.title || "Notification", {
            body: data.message || "No message provided",
            icon: data.icon || "/icons/attendMeIcon2.webp",
            data: { url: data.url || "/student/schedules" }, // Store the target URL in notification data
        });
    } catch (err) {
        console.warn("Received invalid JSON. Using as plain text.");
        data = { title: "Notification", message: textData }; // Handle raw text case
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close() // Close notification on click

    const targetUrl = event.notification.data?.url || "/student/schedules"; // Get URL from notification

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }) // Get all open windows (including the ones not controlled by the service worker)
        .then((clientList) => {
            for (const client of clientList) { // Loop through all open client windows
                if (client.url.includes(targetUrl) && "focus" in client) { // Check if the targe url is already open
                    return client.focus(); // Bring the existing tab into focus instead of opening a new one
                }
            }

            // If not open, open a new window/tab with the target URL
            return clients.openWindow(targetUrl) 
        })
    )
})