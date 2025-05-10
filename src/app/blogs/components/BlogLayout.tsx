'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface BlogLayoutProps {
	children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
	return (
		<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Box component="main" sx={{ flex: 1 }}>
				{children}
			</Box>
		</Box>
	);
}
