'use client';

import IconButton from '@/components/Buttons/IconButton';
import Loading from '@/components/Loading';
import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import { BlogCardProps } from '@/types/card.types';
import { Book, Favorite, FavoriteBorder, Share } from '@mui/icons-material';
import { Card, CardActions, CardHeader, CardMedia, Grid, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function BlogCard(blog: BlogCardProps) {
	const { theme } = useTheme();

	const [isLoading, setIsLoading] = useState(false);

	const handleShare = (path: string) => {
		const url = `${window.location.origin}/blogs/${path.split('/').pop()}`;
		navigator.clipboard.writeText(url);
		alert('Copied link!');
	};

	const handleFavorite = (blogId: string) => {
		let arrFavorites =
			typeof window !== 'undefined'
				? JSON.parse(localStorage.getItem('favoriteBlogs') || '[]')
				: [];
		if (arrFavorites.includes(blogId)) {
			arrFavorites = arrFavorites.filter((f: string) => f !== blogId);
		} else {
			arrFavorites.push(blogId);
		}
		if (typeof window !== 'undefined') {
			localStorage.setItem('favoriteBlogs', JSON.stringify(arrFavorites));
		}
		window.dispatchEvent(new Event('storage'));
	};

	const handlePlay = () => {
		setIsLoading(true);
	};

	const isFavorite =
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('favoriteBlogs') || '[]').includes(blog.slug)
			: false;

	return (
		<>
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
					title={blog.title}
					subheader={blog.date}
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
											handleShare(blog.slug);
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
											handleFavorite(blog.slug);
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
											Read more ...
										</Typography>
									}
								>
									<Link href={blog.slug} style={{ color: 'inherit' }} onClick={handlePlay}>
										<IconButton>
											<Book color="info" />
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
						image={blog.coverImage}
						alt={blog.title}
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
					{blog.excerpt}
				</Typography>
				<CardActions disableSpacing></CardActions>
			</Card>
		</>
	);
}
