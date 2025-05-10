'use client';

import ButtonWithLink from '@/components/Buttons/ButtonWithLink';
import { useDevice } from '@/contexts/DeviceContext';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';

export default function NotFound() {
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
					src="/images/backgrounds/not-found.png"
					alt="Under Construction"
					width={800}
					height={600}
					style={{
						objectFit: 'scale-down',
						maxHeight: isMobile ? '40vh' : '65vh',
						width: 'auto',
					}}
				/>
			</Grid>
			<Grid alignContent={'center'}>
				<Typography variant={!isMobile ? 'body1' : 'body1'} color="text.primary">
					You are lost ...
				</Typography>
				<ButtonWithLink url={'/'} onTarget={false}>
					<Typography variant="body1" color="text.primary">
						Click here to Go back Home
					</Typography>
				</ButtonWithLink>
			</Grid>
		</Grid>
	);
}
