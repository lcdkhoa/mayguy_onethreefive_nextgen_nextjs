import { ThemeOptions, createTheme } from '@mui/material/styles';

import { color } from './color';

interface TypographyVariant extends Record<string, string | number | undefined> {
	fontFamily: string;
	fontSize: string;
	fontWeight: number;
	lineHeight?: number;
}

interface TypographyConfig {
	fontFamily: string;
	h1: TypographyVariant;
	h2: TypographyVariant;
	h3: TypographyVariant;
	h4: TypographyVariant;
	h5: TypographyVariant;
	h6: TypographyVariant;
	body1: TypographyVariant;
	body2: TypographyVariant;
	body3: TypographyVariant;
	subtitle1: TypographyVariant;
	caption: TypographyVariant;
	caption1: TypographyVariant;
	caption2: TypographyVariant;
	caption3: TypographyVariant;
}

const PLAYFAIR_FONT_FAMILY = "'Playfair Display', Georgia, 'Times New Roman', serif";
const MONT_FONT_FAMILY = "'Montserrat', Georgia, 'Times New Roman' ,serif";

const typographyConfig: TypographyConfig = {
	fontFamily: PLAYFAIR_FONT_FAMILY,

	h1: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '3rem', // ~48px
		fontWeight: 700,
		lineHeight: 1.2,
	},
	h2: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '2.5rem', // ~40px
		fontWeight: 700,
		lineHeight: 1.3,
	},
	h3: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '2rem', // ~32px
		fontWeight: 600,
		lineHeight: 1.3,
	},
	h4: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '1.75rem', // ~28px
		fontWeight: 600,
		lineHeight: 1.4,
	},
	h5: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '1.5rem', // ~24px
		fontWeight: 600,
		lineHeight: 1.4,
	},
	h6: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '1.25rem', // ~20px
		fontWeight: 600,
		lineHeight: 1.5,
	},

	body1: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '1rem', // 16px
		fontWeight: 400,
		lineHeight: 1.6,
	},
	body2: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.875rem', // 14px
		fontWeight: 400,
		lineHeight: 1.6,
	},
	body3: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.75rem', // 12px
		fontWeight: 400,
		lineHeight: 1.6,
	},

	caption: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.75rem',
		fontWeight: 400,
		lineHeight: 1.4,
	},
	caption1: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.75rem',
		fontWeight: 500,
		lineHeight: 1.4,
	},
	caption2: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.6875rem', // ~11px
		fontWeight: 400,
		lineHeight: 1.4,
	},
	caption3: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.625rem', // ~10px
		fontWeight: 400,
		lineHeight: 1.4,
	},

	subtitle1: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.9375rem', // 15px
		fontWeight: 500,
		lineHeight: 1.5,
	},
};

const createCustomTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
	palette: {
		mode,
		...(mode === 'light' ? color.light : color.dark),
	},
	typography: typographyConfig,
});

export const lightTheme = createTheme(createCustomTheme('light'));
export const darkTheme = createTheme(createCustomTheme('dark'));
