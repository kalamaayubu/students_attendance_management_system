/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/OneSignalSDK.sw.js',
            destination: '/OneSignalSDKWorker.js',
          },
          {
            source: '/OneSignalSDKUpdaterWorker.js',
            destination: '/OneSignalSDKUpdaterWorker.js',
          },
        ];
      },
};

export default nextConfig;
