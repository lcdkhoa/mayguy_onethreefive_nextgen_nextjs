import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
	reactStrictMode: true,
	compiler: {
		emotion: true,
	},
};

export default nextConfig;
