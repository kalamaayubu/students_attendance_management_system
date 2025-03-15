self.addEventListener("push", async (event) => {
    console.log("🔥 Push Event Received:", event.data);

    if (!event.data) {
        console.warn("⚠️ Push event received but no data available.");
        return;
    }

    let data;
    try {
        const textData = await event.data.text();
        console.log("📩 DEBUGGING; Raw Push Data:", textData);
        data = JSON.parse(textData);
    } catch (err) {
        console.warn("⚠️ Invalid JSON. Using as plain text.");
        data = { title: "Notification", message: textData };
    }

    console.log("🔔 Attempting to Show Notification:", data);

    event.waitUntil(
        self.registration.showNotification(data.title || "Notification", {

            body: data.message || "No message provided",
            icon: data.icon || "/icons/attendMeIcon2.webp",
            data: { url: data.url || "/student/schedules" },
        }).then(() => {
            console.log("✅ Notification Displayed Successfully!");
        }).catch((err) => {
            console.error("❌ Failed to show notification:", err);
        })
    )
});

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
