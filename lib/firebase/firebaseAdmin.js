// Purpose: Initialize Firebase Admin SDK for the backend (Server-Side)
import admin from 'firebase-admin'

const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // ".replace()" Converts escaped "\n" back into actual newlines for proper parsing
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
}

// Ensure that firebase is initialized once
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('✅ Firebase Admin Initialized Successfully');
    } catch (error) {
        console.error('❌ Firebase Admin Initialization Failed:', error);
    }
}

export default admin;