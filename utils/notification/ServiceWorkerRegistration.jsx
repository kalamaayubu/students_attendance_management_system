"use client";
import { useEffect } from "react";

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    // Register service worker if supported
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistration;
