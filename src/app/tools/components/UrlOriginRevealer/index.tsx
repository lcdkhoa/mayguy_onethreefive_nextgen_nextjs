'use client';

import ButtonWrapper from '@/components/Buttons/Button';
import ButtonWithLink from '@/components/Buttons/ButtonWithLink';
import { Dialog, DialogContent, Divider, Grid, TextField, Typography, styled } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import { securityServices } from './constant';

interface UrlOriginRevealerProps {
	open: boolean;
	close: () => void;
}

const RoundBorderTextField = styled(TextField)(() => ({
	'& .MuiOutlinedInput-root': {
		borderRadius: 50,
	},
}));

export default function UrlOriginRevealer({ ...props }: UrlOriginRevealerProps) {
	const { open, close } = props;
	const [shortUrl, setShortUrl] = useState('');
	const [originalUrl, setOriginalUrl] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showSecurityForInput, setShowSecurityForInput] = useState(false);

	const handleClose = () => {
		close();
		setShortUrl('');
		setOriginalUrl('');
		setError('');
	};

	const handleCheck = async () => {
		if (!shortUrl) return;

		setLoading(true);
		setOriginalUrl('');
		setError('');
		setShowSecurityForInput(false);

		try {
			const response = await fetch('/api/tools/url-origin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url: shortUrl }),
			});

			const data = await response.json();

			if (!response.ok) {
				if (response.status === 404) {
					setError('');
					setShowSecurityForInput(true);
				} else {
					throw new Error(data.error || 'Failed to check URL');
				}
				return;
			}

			if (data.originalUrl) {
				setOriginalUrl(data.originalUrl);
			} else {
				setError('Cannot find the original URL. It might not be a shortened URL.');
				setShowSecurityForInput(true);
			}
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error';
			setError('Error checking link: ' + errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={open}
			fullWidth={true}
			maxWidth="md"
			keepMounted
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogContent>
				<Typography variant="h6" component="h2" gutterBottom>
					Reveal the original URL of a shortened URL
				</Typography>
				<RoundBorderTextField
					fullWidth
					value={shortUrl}
					onChange={(e) => setShortUrl(e.target.value)}
					placeholder="Paste the shortened URL here (e.g. https://tinyurl.com/...)"
					margin="normal"
				/>
				{(originalUrl || showSecurityForInput) && (
					<Grid sx={{ width: 'auto' }}>
						{originalUrl && (
							<Typography
								variant="body1"
								color="success.main"
								sx={{
									mt: 2,
									width: '100%',
									wordBreak: 'break-word',
									whiteSpace: 'pre-wrap',
								}}
							>
								<strong>Original URL:</strong>{' '}
								<a href={originalUrl} target="_blank" rel="noopener noreferrer">
									{originalUrl}
								</a>
							</Typography>
						)}
						{showSecurityForInput && (
							<Typography variant="body1" color="warning.main" sx={{ mt: 2 }}>
								This link may not be shortened. You can still check its security below.
							</Typography>
						)}
						<Grid
							container
							spacing={2}
							sx={{ mt: 3, mb: 2 }}
							justifyContent="flex-start"
							alignItems="center"
						>
							{securityServices.map((service) => (
								<Grid key={service.name} sx={{ minWidth: 0 }}>
									<Tooltip
										title={
											<Typography variant="body2" sx={{ color: 'white' }}>
												{service.tooltip}
											</Typography>
										}
										arrow
									>
										<ButtonWithLink
											url={
												typeof service.url === 'string'
													? service.url
													: service.url(originalUrl || shortUrl)
											}
											sx={{
												'backgroundColor': service.color,
												'&:hover': { backgroundColor: service.color },
											}}
										>
											<service.icon fontSize="small" sx={{ color: 'white' }} />
											<Typography variant="body2" sx={{ color: 'white' }}>
												{service.buttonText}
											</Typography>
										</ButtonWithLink>
									</Tooltip>
								</Grid>
							))}
						</Grid>
					</Grid>
				)}
				{error && (
					<Typography variant="body1" color="error" sx={{ mt: 2 }}>
						{error}
					</Typography>
				)}
			</DialogContent>
			<Divider />
			<Grid container justifyContent="center" paddingBottom={2} paddingTop={2}>
				<ButtonWrapper onClick={handleCheck} disabled={loading}>
					{loading ? 'Checking...' : 'Get Original URL'}
				</ButtonWrapper>
				<ButtonWrapper onClick={handleClose}>Close</ButtonWrapper>
			</Grid>
		</Dialog>
	);
}
