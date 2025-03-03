'use client'
export function getInstructorInitialLocation() {
    return new Promise((resolve) => {
        if (typeof window === "undefined") return; // Prevent errors in server-side execution

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    console.log(`📌 Instructor's location: Lat: ${latitude}, Lon: ${longitude}`);
                    resolve({ latitude, longitude })
                },
                (error) => {
                    console.error("Error getting instructor's location:", error);
                    resolve({ error: error.message })
                }, 
                { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
            );
        } else {
            resolve({ error: "Geolocation is not supported in your browser" });
        }
    })
}