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
		DATABASE_URL: process.env.DATABASE_URL,
	},
	// Webpack configuration for TypeORM
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.externals.push('typeorm');
		}
		return config;
	},
};

export default withMDXConfig(nextConfig);
