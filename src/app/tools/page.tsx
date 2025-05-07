'use client';

import IconButton from '@/components/Buttons/IconButton';
import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
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
					<Tab label="All" />
					<Tab label="Favorites" />
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
										boxShadow: `0 4px 6px 0 ${color[theme].card.shadow}`,
									},
								}}
							>
								<CardHeader
									title={tool.title}
									subheader={tool.version}
									action={
										<Grid container spacing={1}>
											<Grid>
												<Tooltip title="Share Link">
													<IconButton
														onClick={(e) => {
															e.stopPropagation();
															handleShare(tool.path);
														}}
													>
														<ShareIcon />
													</IconButton>
												</Tooltip>
											</Grid>
											<Grid>
												<Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
													<IconButton
														onClick={(e) => {
															e.stopPropagation();
															handleFavorite(tool.path);
														}}
													>
														{isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
													</IconButton>
												</Tooltip>
											</Grid>
										</Grid>
									}
								/>
								<Link href={tool.path} style={{ textDecoration: 'none' }} onClick={handleOpenTool}>
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

									<CardContent>
										<Typography variant="body2" color="text.secondary" textAlign={'justify'}>
											{tool.description}
										</Typography>
									</CardContent>
								</Link>
								<CardActions disableSpacing></CardActions>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}
