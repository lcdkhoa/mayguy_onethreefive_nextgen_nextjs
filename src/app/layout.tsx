'use client';

import ClientWrapper from '@/components/ClientWrapper';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry';
import { DeviceProvider } from '@/contexts/DeviceContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import '@/styles/css/fonts.css';
import '@/styles/css/index.css';
import { Grid } from '@mui/material';

function RootLayoutContent({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/icon.ico" />
			</head>
			<body
				style={{
					backgroundColor: color[theme].background.body,
				}}
			>
				<ThemeRegistry>
					<DeviceProvider>
						<Grid
							key="main-container"
							sx={{
								height: '100vh',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<Grid key="header-container">
								<Header />
							</Grid>
							<Grid key="content-container" sx={{ flex: 1, overflow: 'auto' }}>
								<ClientWrapper>{children}</ClientWrapper>
							</Grid>
							<Grid key="footer-container">
								<Footer />
							</Grid>
						</Grid>
					</DeviceProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<RootLayoutContent>{children}</RootLayoutContent>
		</ThemeProvider>
	);
}
