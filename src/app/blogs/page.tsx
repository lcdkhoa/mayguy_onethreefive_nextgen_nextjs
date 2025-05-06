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
			<Typography variant="h2" color="primary" textAlign={'center'} gutterBottom>
				Building Blog Section
			</Typography>
			<Typography variant="h5" color="secondary" textAlign={'center'}>
				Coming soon
			</Typography>
		</Grid>
	);
}
