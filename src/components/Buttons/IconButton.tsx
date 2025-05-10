import { IconButton, IconButtonProps, SxProps, Theme } from '@mui/material';
import React from 'react';

interface IconButtonWrapperProps extends Omit<IconButtonProps, 'children'> {
	children: React.ReactNode;
	sx?: SxProps<Theme>;
}

export default function IconButtonWrapper({ children, sx, ...props }: IconButtonWrapperProps) {
	return (
		<IconButton
			{...props}
			sx={{
				'background': 'transparent',
				'transition': 'background 0.2s',
				'&:hover': {
					background: '#e6eefc',
				},
				'borderRadius': '12px',
				'p': 1.5,
				...sx,
			}}
		>
			{children}
		</IconButton>
	);
}
