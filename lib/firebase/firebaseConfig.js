// Initialize Firebase for the frontend (Client-Side)
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9nRN13-RnGYjUCBI8K_DIl5h_mEA2gTA",
  authDomain: "push-notification-app-7323c.firebaseapp.com",
  projectId: "push-notification-app-7323c",
  storageBucket: "push-notification-app-7323c.firebasestorage.app",
  messagingSenderId: "694447797040",
  appId: "1:694447797040:web:f7ee77a9dcbb896283cef5"
};

// Initialize Firebase only when in the client-side
let messaging;
if (typeof window !== "undefined" && "navigator" in window) {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export {messaging, getToken, onMessage }
