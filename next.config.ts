import type { NextConfig } from 'next';

import withMDX from '@next/mdx';

const withMDXConfig = withMDX({
	extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	reactStrictMode: true,
	compiler: {
		emotion: true,
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	// Ensure environment variables are available at build time
	env: {
		DATABASE_TYPE: process.env.DATABASE_TYPE,
		DATABASE_HOST: process.env.DATABASE_HOST,
		DATABASE_PORT: process.env.DATABASE_PORT,
		DATABASE_USER: process.env.DATABASE_USER,
		DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
		DATABASE_NAME: process.env.DATABASE_NAME,
		DATABASE_LOGGING: process.env.DATABASE_LOGGING,
	},
};

export default withMDXConfig(nextConfig);
