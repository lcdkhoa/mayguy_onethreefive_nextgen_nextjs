import { IconButton, IconButtonProps, SxProps, Theme } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface ButtonWithLinkProps extends IconButtonProps {
	url: string;
	children: React.ReactNode;
	onTarget?: boolean;
	sx?: SxProps<Theme>;
}

export default function ButtonWithLink({
	url,
	children,
	onTarget = true,
	sx,
	...props
}: ButtonWithLinkProps) {
	return (
		<IconButton
			sx={{
				'background': 'transparent',
				'transition': 'background 0.2s',
				'&:hover': {
					background: '#e6eefc',
				},
				'borderRadius': '12px',
				'p': 1.2,
				...sx,
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
