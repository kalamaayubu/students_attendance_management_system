// Purpose: Send push notification when an event occurs in Supabase
export const sendNotification = async (title, body, recipients) => {
    try {
        const messages = recipients.map(recipient => ({
            token: recipient.endpoint,
            notification: { title, body }
        }));

        await admin.messaging().sendEach(messages);
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notifications:', error)
    }
}
