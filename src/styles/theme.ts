import { ThemeOptions, createTheme } from '@mui/material/styles';

import { color } from './color';

interface TypographyVariant
	extends Record<string, string | number | undefined> {
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
	subtitle1: TypographyVariant;
	caption: TypographyVariant;
}

const PLAYFAIR_FONT_FAMILY = "'Playfair Display', serif";
const MONT_FONT_FAMILY = "'Montserrat', serif";

const typographyConfig: TypographyConfig = {
	fontFamily: PLAYFAIR_FONT_FAMILY,
	h1: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '2.5rem',
		fontWeight: 700,
	},
	h2: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '2rem',
		fontWeight: 700,
	},
	h3: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '1.75rem',
		fontWeight: 700,
	},
	h4: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '1.5rem',
		fontWeight: 700,
	},
	h5: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '1.25rem',
		fontWeight: 700,
	},
	h6: {
		fontFamily: PLAYFAIR_FONT_FAMILY,
		fontSize: '1rem',
		fontWeight: 700,
	},
	body1: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '1rem',
		lineHeight: 1.5,
		fontWeight: 400,
	},
	body2: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.875rem',
		lineHeight: 1.5,
		fontWeight: 400,
	},
	caption: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.75rem',
		fontWeight: 400,
	},
	subtitle1: {
		fontFamily: MONT_FONT_FAMILY,
		fontSize: '0.875rem',
		lineHeight: 1.5,
		fontWeight: 400,
	},
};

const createCustomTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
	palette: {
		mode,
		...(mode === 'light' ? color.light : color.dark),
	},
	typography: typographyConfig,
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontFamily: MONT_FONT_FAMILY,
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontFamily: MONT_FONT_FAMILY,
				},
			},
		},
	},
});

export const lightTheme = createTheme(createCustomTheme('light'));
export const darkTheme = createTheme(createCustomTheme('dark'));
