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
};

export default withMDXConfig(nextConfig);
