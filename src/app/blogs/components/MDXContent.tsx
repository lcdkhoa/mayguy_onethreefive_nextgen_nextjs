'use client';

import { Box } from '@mui/material';
import { MDXRemote } from 'next-mdx-remote';

interface MDXContentProps {
	source: any;
}

export default function MDXContent({ source }: MDXContentProps) {
	return (
		<Box sx={{ mt: 4 }}>
			<MDXRemote {...source} />
		</Box>
	);
}
