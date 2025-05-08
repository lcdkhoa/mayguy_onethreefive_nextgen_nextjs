'use client';

import IconButton from '@/components/Buttons/IconButton';
import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import { Favorite, FavoriteBorder, PlayArrow, Share } from '@mui/icons-material';
import {
	Backdrop,
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	Grid,
	Tab,
	Tabs,
	Tooltip,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

import { ToolCardList } from './configs/constants';

export default function Tools({ toolParam }: { toolParam?: string }) {
	const { theme } = useTheme();
	const [isLoading, setIsLoading] = useState(false);
	const [tab, setTab] = useState(0);
	const [favorites, setFavorites] = useState<string[]>([]);
	const router = useRouter();

	const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
		setTab(newValue);
	};

	const handleClose = () => {
		setIsLoading(true);
		router.push('/tools');
	};

	const handleOpenTool = () => {
		setIsLoading(true);
	};

	const handleFavorite = (toolPath: string) => {
		let newFavs = [...favorites];
		if (favorites.includes(toolPath)) {
			newFavs = newFavs.filter((f) => f !== toolPath);
		} else {
			newFavs.push(toolPath);
		}
		setFavorites(newFavs);
		localStorage.setItem('favoriteTools', JSON.stringify(newFavs));
	};

	const handleShare = (toolPath: string) => {
		const url = `${window.location.origin}/tools/${toolPath.split('/').pop()}`;
		navigator.clipboard.writeText(url);
		alert('Copied link!');
	};

	useEffect(() => {
		setIsLoading(false);
	}, [toolParam]);

	useEffect(() => {
		ReactGA.send({
			hitType: 'pageview',
			page: location.pathname,
			title: 'Tools',
		});
	}, []);

	useEffect(() => {
		ReactGA.event({
			category: 'Tools',
			action: 'Click on Object Handler',
		});
	}, [toolParam]);

	useEffect(() => {
		const fav = localStorage.getItem('favoriteTools');
		if (fav) setFavorites(JSON.parse(fav));
	}, []);

	return (
		<>
			<Backdrop open={isLoading} sx={{ zIndex: 9999, color: 'white' }}>
				<Grid className="loader"></Grid>
			</Backdrop>
			<Grid container justifyContent="center" mt={5}>
				<Tabs value={tab} onChange={handleTabChange}>
					<Tab
						label={
							<Typography variant="subtitle1" color="text.primary">
								All
							</Typography>
						}
					/>
					<Tab
						label={
							<Typography variant="subtitle1" color="text.primary">
								Favorites
							</Typography>
						}
					/>
				</Tabs>
			</Grid>
			<Grid
				container
				alignContent={'center'}
				justifyContent={'center'}
				sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'row' }}
				mt={2}
			>
				{(tab === 0
					? ToolCardList
					: ToolCardList.filter((tool) => favorites.includes(tool.path))
				).map((tool) => {
					const isSelected = tool.path.split('/').pop() === toolParam;
					const isFavorite = favorites.includes(tool.path);
					return (
						<Grid key={tool.path}>
							{isSelected && (
								<tool.component open={isSelected} close={handleClose} index={tool.id} />
							)}
							<Card
								sx={{
									width: 500,
									height: 420,
									borderRadius: '20px',
									margin: '10px',
									overflow: 'hidden',
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
													<Link
														href={tool.path}
														style={{ color: 'inherit' }}
														onClick={handleOpenTool}
													>
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
										image={tool.imageUrl}
										alt={tool.title}
										sx={{
											transition: 'transform 0.2s ease-in-out',
											objectFit: 'cover',
											width: '100%',
											height: '100%',
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
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}
