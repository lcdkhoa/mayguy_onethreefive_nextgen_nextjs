'use client';

import { useTheme } from '@/contexts/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const { theme } = useTheme();
	const muiTheme = createTheme({
		palette: {
			mode: theme,
		},
	});

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
