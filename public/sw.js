self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json()
        const options = {
            body: data.body,
            icon: data.icon || '/attendMeIcon2.webp',
            badge: '/attendMeIcon2.webp',
            vibrate: [100, 50, 100],
            data: {
                dataOfArrival: Date.now(),
                primaryKey: '2'
            },
        }

        event.waitUntil(self.registration.showNotification(data.title, options))
    }
})

self.addEventListener('notificationClick', function (event) {
    console.log('Notification click received.')
    event.notification.close()
    event.waitUntil(clients.openWindow('<http://localhost:3000>'))
})