'use client'
import { updateInstructorLocation } from '@/actions/instructor/updateLocation';
import * as turf from '@turf/turf';

// Dummy database storage (replace with actual DB calls)
let lastRecordedLocation = null;

// Checks if the instructor has moved 30m or more from the last recorded location.
export async function hasMovedEnough(newCoords, oldCoords) {
    if (!oldCoords) return true; // First-time check, always update

    // Convert coordinates to turf points
    const from = turf.point([oldCoords.longitude, oldCoords.latitude])
    const to = turf.point([newCoords.longitude, newCoords.latitude])
    const distance = turf.distance(from, to, { units: 'meters'})

    return distance >= 2; // Return true if has moved to or more than 30 meters
}

// ✅ Watches the instructor's position and updates the database if they move ≥ 30m.
export function trackInstructorPosition() {
    if (typeof window === "undefined") return; // Prevent errors in server-side execution

    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords

            if (hasMovedEnough({ latitude, longitude}, lastRecordedLocation)) {
                console.log("🚀 Instructor moved 30m away, updating database...");
                lastRecordedLocation = { latitude, longitude }
                updateInstructorLocation(latitude, longitude)
            }
        }, 
        (error) => console.error("❌ Error getting instructor location:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    )
}