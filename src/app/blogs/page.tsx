'use client';

import { Grid, Typography } from '@mui/material';

export default function Blog() {
	return (
		<Grid
			justifyContent={'center'}
			alignContent={'center'}
			sx={{ display: 'flex', flexDirection: 'column' }}
			mt={10}
		>
			<Typography variant="h1" color="text.primary" textAlign={'center'} gutterBottom>
				Building Blog Section
			</Typography>
			<Typography variant="h5" color="text.secondary" textAlign={'center'}>
				Coming soon
			</Typography>
		</Grid>
	);
}
