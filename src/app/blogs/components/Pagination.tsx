'use client';

import IconButton from '@/components/Buttons/IconButton';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography } from '@mui/material';

interface PaginationProps {
	count: number;
	page: number;
	onChange: (page: number) => void;
}

export default function Pagination({ count, page, onChange }: PaginationProps) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 4, gap: 10 }}>
			<IconButton onClick={() => onChange(page - 1)} disabled={page === 1}>
				<ArrowBackIos fontSize="small" color={page === 1 ? 'disabled' : 'primary'} />
				<Typography variant="body1" color={page === 1 ? 'disabled' : 'primary'}>
					Newer
				</Typography>
			</IconButton>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
				<IconButton
					sx={{
						'background': (theme) => theme.palette.primary.main,
						'color': (theme) => theme.palette.primary.contrastText,
						'&:hover': {
							background: (theme) => theme.palette.primary.main,
						},
					}}
				>
					<Typography variant="body1">{page}</Typography>
				</IconButton>
			</Box>
			<IconButton onClick={() => onChange(page + 1)} disabled={page === count}>
				<Typography variant="body1" color={page === count ? 'disabled' : 'primary'}>
					Older
				</Typography>
				<ArrowForwardIos fontSize="small" color={page === count ? 'disabled' : 'primary'} />
			</IconButton>
		</Box>
	);
}
