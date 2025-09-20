// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 👇 이 부분을 추가해주세요.
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.google.com',
            },
            {
                protocol: 'https',
                hostname: '**.daumcdn.net',
            },
            {
                protocol: 'https',
                hostname: '**.hankyung.com',
            },
            {
                protocol: 'https',
                hostname: 'img.khan.co.kr',
            },
            {
                protocol: 'https',
                hostname: '**.cloudfront.net',
            },
            {
                protocol: 'https',
                hostname: '**.ohmynews.com',
            },
            {
                protocol: 'https',
                hostname: '**.venturesquare.net',
            },
        ],
    },
};

export default nextConfig;