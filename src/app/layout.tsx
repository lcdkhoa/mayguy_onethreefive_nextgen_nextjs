'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry';
import { DeviceProvider } from '@/contexts/DeviceContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/css/fonts.css';
import '@/styles/css/index.css';
import { Grid } from '@mui/material';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider>
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
								<Grid key="content-container" sx={{ flex: 1 }}>
									{children}
								</Grid>
								<Grid key="footer-container">
									<Footer />
								</Grid>
							</Grid>
						</DeviceProvider>
					</ThemeRegistry>
				</ThemeProvider>
			</body>
		</html>
	);
}
