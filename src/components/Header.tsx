'use client';

import { sections } from '@/configs/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { Bedtime, BrightnessHigh } from '@mui/icons-material';
import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Header = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Toolbar sx={{ gap: 2 }}>
			<Box sx={{ flexGrow: 1 }} />
			{sections.map((section) => (
				<Button
					focusRipple
					key={section.title}
					sx={{
						display: 'flex',
						gap: 2,
						width: section.width,
						borderRadius: '20px',
						border: '1px solid transparent',
						backgroundColor: 'transparent',
						borderBottomColor: 'transparent',
					}}
					component={Link}
					href={section.path}
				>
					<Typography
						component="span"
						variant="subtitle1"
						style={{
							fontWeight: 'normal',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.fontWeight = 'bold';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.fontWeight = 'normal';
						}}
					>
						{section.title}
					</Typography>
				</Button>
			))}
			<IconButton onClick={toggleTheme} color="inherit">
				{theme === 'dark' ? (
					<Bedtime color="primary" />
				) : (
					<BrightnessHigh color="primary" />
				)}{' '}
			</IconButton>
		</Toolbar>
	);
};

export default Header;
