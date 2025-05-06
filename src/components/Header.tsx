'use client';

import { sections } from '@/configs/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import { Bedtime, BrightnessHigh } from '@mui/icons-material';
import { Box, Toolbar, Typography } from '@mui/material';

import ButtonWithLink from './Buttons/ButtonWithLink';
import IconButtonWrapper from './Buttons/IconButton';

const Header = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Toolbar
			sx={{ gap: 3, backgroundColor: theme === 'light' ? color.light.background.header : color.dark.background.header }}
		>
			<Box sx={{ flexGrow: 1 }} />
			{sections.map((section) => (
				<ButtonWithLink focusRipple key={section.title} url={section.path} onTarget={false}>
					<Typography
						variant="body1"
						color="primary"
						sx={{
							minWidth: 60,
							transition: 'font-weight 0.2s',
							fontWeight: 400,
							'&:hover': {
								fontWeight: 700,
							},
						}}
					>
						{section.title}
					</Typography>
				</ButtonWithLink>
			))}
			<IconButtonWrapper onClick={toggleTheme} color="inherit">
				{theme === 'dark' ? <Bedtime color="primary" /> : <BrightnessHigh color="primary" />}{' '}
			</IconButtonWrapper>
		</Toolbar>
	);
};

export default Header;
