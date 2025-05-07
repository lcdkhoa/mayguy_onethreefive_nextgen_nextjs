'use client';

import { HOME, sections } from '@/configs/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import { Bedtime, BrightnessHigh } from '@mui/icons-material';
import { Box, Fade, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import ButtonWithLink from './Buttons/ButtonWithLink';
import IconButtonWrapper from './Buttons/IconButton';

const INITIAL_SECTIONS = sections.map((section) => ({
	...section,
	isSelected: false,
}));

const INITIAL_INDICATOR_STYLE = { left: 0, width: 0 };

const Header = () => {
	const { theme, toggleTheme } = useTheme();
	const [sectionList, setSectionList] = useState(INITIAL_SECTIONS);
	const pathname = usePathname();
	const [indicatorStyle, setIndicatorStyle] = useState(INITIAL_INDICATOR_STYLE);
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		if (pathname === HOME) {
			setIndicatorStyle(INITIAL_INDICATOR_STYLE);
			setSectionList(INITIAL_SECTIONS);
			buttonRefs.current = [];
			return;
		}

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

	useEffect(() => {
		const activeIndex = sectionList.findIndex((section) => section.isSelected);
		if (activeIndex !== -1 && buttonRefs.current[activeIndex]) {
			const rect = buttonRefs.current[activeIndex]!.getBoundingClientRect();
			const parentRect = buttonRefs.current[0]!.parentElement!.getBoundingClientRect();
			setIndicatorStyle({
				left: rect.left - parentRect.left,
				width: rect.width,
			});
		}
	}, [sectionList]);

	return (
		<Toolbar
			sx={{
				gap: 3,
				backgroundColor: color[theme].background.header,
				position: 'relative',
				minHeight: 64,
			}}
		>
			<Fade in={pathname !== HOME} timeout={500}>
				<Box
					sx={{
						opacity: pathname === HOME ? 0 : 1,
					}}
				>
					<Link
						href={HOME}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer',
						}}
					>
						<Image
							src="/icon.ico"
							alt="Logo"
							width={40}
							height={40}
							style={{ objectFit: 'contain' }}
						/>
					</Link>
				</Box>
			</Fade>
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
				<Box
					sx={{
						position: 'absolute',
						left: `calc(${indicatorStyle.left}px + 25px)`,
						bottom: 4,
						width: `calc(${indicatorStyle.width}px - 50px)`,
						height: 6,
						borderRadius: 3,
						background: '#e6eefc',
						transition: 'left 0.3s cubic-bezier(.4,1.6,.6,1), width 0.3s cubic-bezier(.4,1.6,.6,1)',
						zIndex: 0,
					}}
				/>
				{sectionList.map((section, index) => (
					<ButtonWithLink
						focusRipple
						key={section.title}
						url={section.path}
						onTarget={false}
						ref={(el) => {
							buttonRefs.current[index] = el;
						}}
						sx={{
							zIndex: 1,
							background: section.isSelected ? 'transparent' : 'none',
							borderRadius: '12px',
							p: 1.2,
						}}
					>
						<Typography
							variant="body1"
							color="primary"
							sx={{
								minWidth: 100,
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
			</Box>
			<IconButtonWrapper onClick={toggleTheme} color="inherit" aria-label={'mode-button'}>
				{theme === 'dark' ? <Bedtime color="primary" /> : <BrightnessHigh color="primary" />}
			</IconButtonWrapper>
		</Toolbar>
	);
};

export default Header;
