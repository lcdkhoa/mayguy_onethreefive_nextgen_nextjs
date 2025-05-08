'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { darkTheme, lightTheme } from '@/styles/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();

	return (
		<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
