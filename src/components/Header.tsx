'use client';

import { sections } from '@/configs/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import { Bedtime, BrightnessHigh } from '@mui/icons-material';
import { Box, Toolbar, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ButtonWithLink from './Buttons/ButtonWithLink';
import IconButtonWrapper from './Buttons/IconButton';

const Header = () => {
	const { theme, toggleTheme } = useTheme();
	const [sectionList, setSectionList] = useState(sections);
	const pathname = usePathname();

	useEffect(() => {
		const matched = sections.find((section) => section.path === pathname);
		if (matched) {
			matched.isSelected = true;
			setSectionList((prevSections) =>
				prevSections.map((section) => ({
					...section,
					isSelected: section.path === matched.path,
				}))
			);
		}
	}, [pathname]);

	return (
		<Toolbar
			sx={{ gap: 3, backgroundColor: theme === 'light' ? color.light.background.header : color.dark.background.header }}
		>
			<Box sx={{ flexGrow: 1 }} />
			{sectionList.map((section) => (
				<ButtonWithLink
					focusRipple
					key={section.title}
					url={section.path}
					onTarget={false}
					{...(section.isSelected && {
						sx: {
							background: '#e6eefc',
							borderRadius: '12px',
							p: 1.2,
						},
					})}
				>
					<Typography
						variant="body1"
						color="primary"
						sx={{
							minWidth: 60,
							transition: 'font-weight 0.2s',
							fontWeight: section.isSelected ? 700 : 400,
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
