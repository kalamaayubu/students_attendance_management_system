// Usage: This file is used to define the manifest of the PWA
export default function manifest() {
    return {
        name: 'AttendMe',
        short_name: 'AttendMe',
        description: 'Manage pysical class attendance for students',
        start_url: '/',
        display: 'standalone',
        background_color: '#f5f5f5',
        theme_color: '#000000',
        icons: [
            {
                src: '/icons/attendMeDesktop.webp',
                sizes: '512x512',
                type: 'image/webp',
                purpose: 'any',
                form_factor: 'wide'  // ✅ Required for desktop
            },
            {
                src: '/icons/attendMeMobile.webp',
                sizes: '192x192',
                type: 'image/webp',
                purpose: 'any',
                form_factor: 'narrow'
            },
        ],
        screenshots: [
            {
                src: '/icons/dashboardScreenshort.png',
                sizes: '1280x620',
                type: 'image/png',
                form_factor: 'wide'  
            },
            {
                src: '/icons/mobileDashboardScreenshort.png',
                sizes: '193x420',
                type: 'image/png'
            }
        ]
    }
}