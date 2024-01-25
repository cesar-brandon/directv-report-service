/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/*',
            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com',
                port: '',
                pathname: '/f/*',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
                port: '',
                pathname: '/564x/42/dc/3d/*',
            }
        ]
    },

    webpack: (config, { isServer }) => {
        // Solo en el lado del cliente
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        return config;
    },

}

module.exports = nextConfig
