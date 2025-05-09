'use client';

import { Box, Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
	count: number;
	page: number;
	onChange: (page: number) => void;
}

export default function Pagination({ count, page, onChange }: PaginationProps) {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
			<MuiPagination
				count={count}
				page={page}
				onChange={(_, value) => onChange(value)}
				color="primary"
				size="large"
			/>
		</Box>
	);
}
