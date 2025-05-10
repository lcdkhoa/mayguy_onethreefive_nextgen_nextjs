'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';

interface MDXContentProps {
	content: string;
}

type MDXSource = Parameters<typeof MDXRemote>[0];

export default function MDXContent({ content }: MDXContentProps) {
	const [mdxSource, setMdxSource] = useState<MDXSource | null>(null);

	useEffect(() => {
		const processContent = async () => {
			const serialized = await serialize(content);
			setMdxSource(serialized);
		};
		processContent();
	}, [content]);

	if (!mdxSource) return null;

	return <MDXRemote {...mdxSource} />;
}
