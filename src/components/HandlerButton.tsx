import { Button, styled } from '@mui/material';

interface HandlerButtonProps {
	onClick: () => void;
	children: React.ReactNode;
}

const HandlerButton = styled(Button)<HandlerButtonProps>(({ theme }) => ({
	width: 'auto',
	borderRadius: 50,
	border: '1px solid',
	color: theme.palette.primary.main,
	fontWeight: 'bold',
	transition: 'transform 0.3s ease, border-color 0.3s ease',
	marginRight: 10,
	marginLeft: 10,
	'&:hover': {
		transform: 'scale(1.1)',
	},
}));

export default HandlerButton;
