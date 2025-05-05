'use client';

import { useDevice } from '@/contexts/DeviceContext';
import { Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

export default function Home() {
	const { isMobile } = useDevice();
	const theme = useTheme();
	return (
		<Grid container justifyContent={'center'} sx={{ overflow: 'hidden' }}>
			<Grid container justifyContent={'center'} alignContent={'center'}>
				<Image
					src="/images/backgrounds/under_construction.png"
					alt="Under Construction"
					width={800}
					height={600}
					style={{
						objectFit: 'scale-down',
						maxHeight: isMobile ? '40vh' : '65vh',
					}}
					className={`zoom-in`}
				/>
			</Grid>
			<Typography variant={!isMobile ? 'h2' : 'body1'} color={theme.palette.text.primary}>
				WELCOME TO MY HOME
			</Typography>
		</Grid>
	);
}
