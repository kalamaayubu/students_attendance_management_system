'use client'
import * as turf from "@turf/turf";

// Get the student's current location( latitude and longitude )
export function getStudentLocation() {
    return new Promise((resolve) => {
        if (typeof window === "undefined") {
            return resolve({error: "Geolocation not available on the server"});
        } 

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                resolve({ latitude, longitude});
            },
            (error) => {
                console.error("❌ Error getting student location:", error);
                resolve({ error: error.message});
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    });
};

//  Checks if the student is within 30m of the instructor
export async function checkStudentProximity(studentLat, studentLon, instructorLat, instructorLon) {
    // Convert coordinates into turf points
    const instructorPoint = turf.point([instructorLon, instructorLat])
    const studentPoint = turf.point([studentLon, studentLat])

    // Calculate the distance in meters
    const distance = turf.distance(instructorPoint, studentPoint, { units: 'meters'})

    console.log(`📏 Distance between student & instructor: ${distance.toFixed(2)}m`);

    return distance <= 5; // ✅ Returns true if student is within 50m(5 meter for testing)
}
