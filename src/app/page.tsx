'use client';

import { useDevice } from '@/contexts/DeviceContext';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';

export default function Home() {
	const { isMobile } = useDevice();
	return (
		<Grid
			container
			justifyContent={'center'}
			sx={{
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				height: '100%',
			}}
		>
			<Grid alignContent={'center'}>
				<Image
					src="/images/backgrounds/under_construction.png"
					alt="Under Construction"
					width={800}
					height={600}
					style={{
						objectFit: 'scale-down',
						maxHeight: isMobile ? '40vh' : '65vh',
						width: 'auto',
					}}
					className={`zoom-in`}
				/>
			</Grid>
			<Grid alignContent={'center'}>
				<Typography variant={!isMobile ? 'h3' : 'body1'} color="primary">
					WELCOME TO MY CORNER
				</Typography>
			</Grid>
		</Grid>
	);
}
