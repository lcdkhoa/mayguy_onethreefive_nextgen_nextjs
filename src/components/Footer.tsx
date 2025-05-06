import { color } from '@/styles/color';
import { Grid, Typography } from '@mui/material';

const FOOTER_TEXT = ` ${new Date().getFullYear()} | lcdkhoa. Powered by "Cơm"`;

const Footer = () => {
	return (
		<Grid
			sx={{
				py: 1,
				px: 2,
				backgroundColor: (theme) =>
					theme.palette.mode === 'light' ? color.light.background.footer : color.dark.background.footer,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography variant="body1" color="text.secondary">
				{FOOTER_TEXT}
			</Typography>
		</Grid>
	);
};

export default Footer;
