'use client';

import ButtonWithLink from '@/components/Buttons/ButtonWithLink';
import IconButton from '@/components/Buttons/IconButton';
import Loading from '@/components/Loading';
import { ToolCardProps } from '@/types/card.types';
import { Favorite, FavoriteBorder, Launch, MoreVert, PlayArrow, Share } from '@mui/icons-material';
import {
	Box,
	Card,
	CardMedia,
	Chip,
	Fade,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
	useTheme as useMuiTheme,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import ShareDialog from './SharePopup';

export default function ToolsCard(tool: ToolCardProps) {
	const muiTheme = useMuiTheme();
	const [openShare, setOpenShare] = useState(false);
	const [url, setUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isHovered, setIsHovered] = useState(false);

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

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const isFavorite =
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('favoriteTools') || '[]').includes(tool.path)
			: false;

	const isExternalLink = tool.path.startsWith('http');

	return (
		<>
			<ShareDialog open={openShare} onClose={() => setOpenShare(false)} url={url} />
			<Loading isLoading={isLoading} />

			<Card
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				sx={{
					'height': '100%',
					'width': '100%',
					'borderRadius': 3,
					'overflow': 'hidden',
					'position': 'relative',
					'maxWidth': '100%',
					'background': `linear-gradient(145deg, 
						${muiTheme.palette.background.paper} 0%, 
						${muiTheme.palette.background.default} 100%)`,
					'boxShadow':
						muiTheme.palette.mode === 'light'
							? '0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.1)'
							: '0 4px 20px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.4)',
					'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
					'&:hover': {
						boxShadow:
							muiTheme.palette.mode === 'light'
								? '0 10px 15px rgba(0,0,0,0.15), 0 8px 10px rgba(0,0,0,0.1)'
								: '0 10px 15px rgba(0,0,0,0.5), 0 8px 10px rgba(0,0,0,0.3)',
					},
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: 4,
						background: `linear-gradient(90deg, 
							${muiTheme.palette.primary.main} 0%, 
							${muiTheme.palette.secondary.main} 100%)`,
						zIndex: 1,
					},
				}}
			>
				{/* Header with gradient overlay */}
				<Box
					sx={{
						'position': 'relative',
						'height': 200,
						'overflow': 'hidden',
						'&::after': {
							content: '""',
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: `linear-gradient(135deg, 
								rgba(0,0,0,0.1) 0%, 
								rgba(0,0,0,0.3) 100%)`,
							zIndex: 1,
						},
					}}
				>
					<CardMedia
						component="img"
						height="200"
						image={tool.coverImage}
						alt={tool.title}
						sx={{
							'transition': 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
							'objectFit': 'cover',
							'width': '100%',
							'height': '100%',
							'&:hover': {
								transform: isHovered ? 'scale(1.05)' : 'scale(1)',
							},
						}}
					/>

					{/* Action buttons overlay */}
					<Box
						sx={{
							position: 'absolute',
							top: 12,
							right: 12,
							zIndex: 2,
							display: 'flex',
							gap: 0.5,
							opacity: isHovered ? 1 : 0.7,
							transition: 'opacity 0.3s ease',
						}}
					>
						<Tooltip title="More options">
							<IconButton
								size="small"
								onClick={(e) => {
									e.stopPropagation();
									handleMenuOpen(e);
								}}
								sx={{
									'backgroundColor': 'rgba(255,255,255,0.9)',
									'backdropFilter': 'blur(10px)',
									'&:hover': {
										backgroundColor: 'rgba(255,255,255,1)',
									},
								}}
							>
								<MoreVert fontSize="small" />
							</IconButton>
						</Tooltip>
					</Box>

					{/* Version badge */}
					<Box
						sx={{
							position: 'absolute',
							bottom: 12,
							left: 12,
							zIndex: 2,
						}}
					>
						<Chip
							label={tool.version}
							size="small"
							sx={{
								backgroundColor: 'rgba(255,255,255,0.9)',
								backdropFilter: 'blur(10px)',
								fontWeight: 600,
								fontSize: '0.75rem',
							}}
						/>
					</Box>
				</Box>

				{/* Content */}
				<Box sx={{ p: 2.5, width: '100%', boxSizing: 'border-box' }}>
					<Typography
						variant="h6"
						component="h3"
						sx={{
							fontWeight: 600,
							fontSize: '1.1rem',
							mb: 1,
							lineHeight: 1.3,
							color: muiTheme.palette.text.primary,
							wordBreak: 'break-word',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{tool.title}
					</Typography>

					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							lineHeight: 1.5,
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							mb: 2,
							wordBreak: 'break-word',
							hyphens: 'auto',
						}}
					>
						{tool.description}
					</Typography>

					{/* Action button */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%',
							minWidth: 0,
						}}
					>
						<Chip
							label={tool.category}
							size="small"
							variant="outlined"
							sx={{
								'fontSize': '0.75rem',
								'height': 24,
								'maxWidth': '60%',
								'& .MuiChip-label': {
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								},
							}}
						/>

						{isExternalLink ? (
							<ButtonWithLink
								url={tool.path}
								onTarget={false}
								onClick={handlePlay}
								sx={{
									'backgroundColor': muiTheme.palette.primary.main,
									'color': 'white',
									'flexShrink': 0,
									'&:hover': {
										backgroundColor: muiTheme.palette.primary.dark,
										transform: 'scale(1.05)',
									},
									'transition': 'all 0.2s ease',
								}}
							>
								<Launch fontSize="small" />
							</ButtonWithLink>
						) : (
							<ButtonWithLink
								url={tool.path}
								onTarget={false}
								onClick={handlePlay}
								sx={{
									'backgroundColor': muiTheme.palette.primary.main,
									'color': 'white',
									'flexShrink': 0,
									'&:hover': {
										backgroundColor: muiTheme.palette.primary.dark,
										transform: 'scale(1.05)',
									},
									'transition': 'all 0.2s ease',
								}}
							>
								<PlayArrow fontSize="small" />
							</ButtonWithLink>
						)}
					</Box>
				</Box>

				{/* Context Menu */}
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					TransitionComponent={Fade}
					PaperProps={{
						sx: {
							borderRadius: 2,
							boxShadow:
								muiTheme.palette.mode === 'light'
									? '0 8px 32px rgba(0,0,0,0.12)'
									: '0 8px 32px rgba(0,0,0,0.4)',
						},
					}}
				>
					<MenuItem
						onClick={() => {
							handleShare(tool.path);
							handleMenuClose();
						}}
					>
						<Share fontSize="small" sx={{ mr: 1 }} />
						Share
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleFavorite(tool.path);
							handleMenuClose();
						}}
					>
						{isFavorite ? (
							<Favorite fontSize="small" color="error" sx={{ mr: 1 }} />
						) : (
							<FavoriteBorder fontSize="small" sx={{ mr: 1 }} />
						)}
						{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
					</MenuItem>
				</Menu>
			</Card>
		</>
	);
}
