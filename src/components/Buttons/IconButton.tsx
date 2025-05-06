import { IconButton, IconButtonProps } from '@mui/material';
import React from 'react';

interface IconButtonWrapperProps extends Omit<IconButtonProps, 'children'> {
	children: React.ReactNode;
}

export default function IconButtonWrapper({ children, ...props }: IconButtonWrapperProps) {
	return (
		<IconButton
			sx={{
				background: 'transparent',
				transition: 'background 0.2s',
				'&:hover': {
					background: '#e6eefc',
				},
				borderRadius: '12px',
				p: 1.5,
			}}
			{...props}
		>
			{children}
		</IconButton>
	);
}
