'use server'

import getAccessToken from "@/lib/firebase/firebaseAuth"

export default async function sendNotification(req) {
    const { token, title, body } = await req.json()
    const accessToken = await getAccessToken()

    const response = await fetch (
        `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                message: {
                    token,
                    notification: { title, body }
                },
            }),
        }
    );

    console.log('Notifications send:', await response.json())
    return {success: true, }
}