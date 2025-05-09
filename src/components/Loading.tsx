'use client';

import { Backdrop, Grid } from '@mui/material';

interface LoadingProps {
	isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
	return (
		<Backdrop open={isLoading} sx={{ zIndex: 9999, color: 'white' }}>
			<Grid className="loader"></Grid>
		</Backdrop>
	);
};

export default Loading;
