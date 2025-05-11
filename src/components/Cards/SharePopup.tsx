import IconButton from '@/components/Buttons/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Box, Dialog, DialogContent, DialogTitle, Grid, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';

import ButtonWithLink from '../Buttons/ButtonWithLink';

interface ShareDialogProps {
	open: boolean;
	onClose: () => void;
	url: string;
}

export default function SharePopup({ open, onClose, url }: ShareDialogProps) {
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(url);
		setSnackbarOpen(true);
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				maxWidth="xs"
				fullWidth
				slotProps={{
					paper: {
						sx: {
							borderRadius: 4,
							p: 0,
						},
					},
				}}
			>
				<DialogTitle sx={{ pb: 0 }}>
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<Typography variant="body1" fontWeight={700}>
							I know you love this stuff 😘
						</Typography>
						<IconButton onClick={onClose} size="small">
							<CloseIcon />
						</IconButton>
					</Box>
				</DialogTitle>
				<DialogContent sx={{ pt: 1 }}>
					<Typography variant="body2" mb={2}>
						Share it with your friends 😉
					</Typography>
					<Box
						display="flex"
						alignItems="center"
						bgcolor={(theme) => theme.palette.background.paper}
						borderRadius={2}
						px={2}
						py={1}
						mb={2}
						sx={{
							border: '1px solid',
							borderColor: 'divider',
						}}
					>
						<Typography
							variant="body2"
							color={`linear-gradient(to right, #ff0000, #ff7500, #ffd700, #00ff00, #0000ff, #8b00ff)`}
							sx={{ fontWeight: 600, flex: 1, wordBreak: 'break-all' }}
						>
							{url}
						</Typography>
					</Box>
					<Grid container spacing={2} justifyContent="center" alignItems="center" mt={1}>
						<Grid>
							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton
									onClick={handleCopy}
									sx={{
										mb: 0.5,
									}}
								>
									<ContentCopyIcon />
								</IconButton>
								<Typography variant="caption">Copy link</Typography>
							</Box>
						</Grid>
						<Grid>
							<Box display="flex" flexDirection="column" alignItems="center">
								<ButtonWithLink
									url={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
									sx={{
										mb: 0.5,
									}}
								>
									<FacebookIcon color="primary" />
								</ButtonWithLink>
								<Typography variant="caption">Facebook</Typography>
							</Box>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={10000}
				onClose={() => setSnackbarOpen(false)}
				message="Copied to clipboard successfully!"
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			/>
		</>
	);
}
