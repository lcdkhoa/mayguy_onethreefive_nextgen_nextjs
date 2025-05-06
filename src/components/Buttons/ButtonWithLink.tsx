import { IconButton, IconButtonProps } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface ButtonWithLinkProps extends IconButtonProps {
	url: string;
	children: React.ReactNode;
	onTarget?: boolean;
}

export default function ButtonWithLink({
	url,
	children,
	onTarget = true,
	...props
}: ButtonWithLinkProps) {
	return (
		<IconButton
			sx={{
				background: 'transparent',
				transition: 'background 0.2s',
				'&:hover': {
					background: '#e6eefc',
				},
				borderRadius: '12px',
				p: 1.2,
			}}
			component={Link}
			href={url}
			target={onTarget ? '_blank' : undefined}
			rel="noopener noreferrer"
			{...props}
		>
			{children}
		</IconButton>
	);
}
