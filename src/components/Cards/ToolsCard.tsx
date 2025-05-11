'use client';

import IconButton from '@/components/Buttons/IconButton';
import Loading from '@/components/Loading';
import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import { ToolCardProps } from '@/types/card.types';
import { Favorite, FavoriteBorder, PlayArrow, Share } from '@mui/icons-material';
import { Card, CardActions, CardHeader, CardMedia, Grid, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import ShareDialog from './SharePopup';

export default function ToolsCard(tool: ToolCardProps) {
	const { theme } = useTheme();
	const [openShare, setOpenShare] = useState(false);
	const [url, setUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleShare = (path: string) => {
		const url = `${window.location.origin}/tools/${path.split('/').pop()}`;
		setUrl(url);
		setOpenShare(true);
	};

	const handleFavorite = (toolPath: string) => {
		let arrFavorites =
			typeof window !== 'undefined'
				? JSON.parse(localStorage.getItem('favoriteTools') || '[]')
				: [];
		if (arrFavorites.includes(toolPath)) {
			arrFavorites = arrFavorites.filter((f: string) => f !== toolPath);
		} else {
			arrFavorites.push(toolPath);
		}
		if (typeof window !== 'undefined') {
			localStorage.setItem('favoriteTools', JSON.stringify(arrFavorites));
		}
		window.dispatchEvent(new Event('storage'));
	};

	const handlePlay = () => {
		setIsLoading(true);
	};

	const isFavorite =
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('favoriteTools') || '[]').includes(tool.path)
			: false;

	return (
		<>
			<ShareDialog open={openShare} onClose={() => setOpenShare(false)} url={url} />
			<Loading isLoading={isLoading} />
			<Card
				sx={{
					'width': 500,
					'height': 420,
					'borderRadius': '20px',
					'margin': '10px',
					'overflow': 'hidden',
					'&:hover': {
						boxShadow: `${color[theme].shadow[4]}`,
					},
				}}
			>
				<CardHeader
					title={tool.title}
					subheader={tool.version}
					action={
						<Grid container spacing={1} alignItems="center">
							<Grid>
								<Tooltip
									title={
										<Typography variant="caption" color="white">
											Share Link
										</Typography>
									}
								>
									<IconButton
										onClick={(e) => {
											e.stopPropagation();
											handleShare(tool.path);
										}}
									>
										<Share color="warning" />
									</IconButton>
								</Tooltip>
							</Grid>
							<Grid>
								<Tooltip
									title={
										<Typography variant="caption" color="white">
											{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
										</Typography>
									}
								>
									<IconButton
										onClick={(e) => {
											e.stopPropagation();
											handleFavorite(tool.path);
										}}
									>
										{isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
									</IconButton>
								</Tooltip>
							</Grid>
							<Grid>
								<Tooltip
									title={
										<Typography variant="caption" color="white">
											Fun start
										</Typography>
									}
								>
									<Link href={tool.path} style={{ color: 'inherit' }} onClick={handlePlay}>
										<IconButton>
											<PlayArrow color="info" />
										</IconButton>
									</Link>
								</Tooltip>
							</Grid>
						</Grid>
					}
				/>
				<Grid style={{ height: 250, overflow: 'hidden' }}>
					<CardMedia
						component="img"
						height="250"
						image={tool.coverImage}
						alt={tool.title}
						sx={{
							'transition': 'transform 0.2s ease-in-out',
							'objectFit': 'cover',
							'width': '100%',
							'height': '100%',
							'&:hover': {
								transform: 'scale(1.1)',
								transformOrigin: 'center',
							},
						}}
					/>
				</Grid>
				<Typography variant="body2" color="text.secondary" textAlign={'justify'} p={2}>
					{tool.description}
				</Typography>
				<CardActions disableSpacing></CardActions>
			</Card>
		</>
	);
}
