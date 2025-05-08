import { Button, ButtonProps, Typography } from '@mui/material';

interface ButtonWrapperProps extends ButtonProps {
	children: React.ReactNode;
}

export default function ButtonWrapper({ children, ...props }: ButtonWrapperProps) {
	return (
		<Button
			sx={{
				width: 'auto',
				borderRadius: 12,
				border: '1px solid',
				borderColor: 'text.primary',
				marginRight: 10,
				marginLeft: 10,
				'&:hover': {
					transition: 'transform 0.2s ease',
					transform: 'scale(1.05)',
				},
			}}
			{...props}
		>
			<Typography variant="caption" color="text.primary" fontWeight="bold">
				{children}
			</Typography>
		</Button>
	);
}
