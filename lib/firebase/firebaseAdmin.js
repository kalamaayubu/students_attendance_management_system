// Purpose: Initialize Firebase Admin SDK for the backend (Server-Side)
import admin from 'firebase-admin'

const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')  // Fix newline issue
        : undefined, 
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
}

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