import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import { Grid, Typography } from '@mui/material';

const FOOTER_TEXT = ` ${new Date().getFullYear()} | lcdkhoa. Powered by "Cơm"`;

const Footer = () => {
	const { theme } = useTheme();
	return (
		<Grid
			sx={{
				py: 1,
				px: 2,
				backgroundColor: color[theme].background.body,
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
