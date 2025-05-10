import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Articles list',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
	return children;
}
