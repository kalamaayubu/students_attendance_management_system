'use server'
import webpush from 'web-push'

webpush.setVapidDetails(
    'kalamayeng@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

let subscription = null;

export async function subscribeUser(sub) {
    subscription = sub;
    return { success: true }
}

export async function unsubscribeUser() {
    subscription(null)
    return { success: true }
}

export async function sendNotification(message) {
    if (!subscription) {
        throw new Error ('No subscription available')
    }

    try {
        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: 'Test Notification',
                body: message,
                icon: '/attendMeIcon2.webp',
            })
        );
    } catch (error) {
        console.error('Error sending push notification:', error);
        return { success: false, error: 'Failed to send notification'}
    }
}