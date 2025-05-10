'use client';

import BlogCard from '@/components/Cards/BlogCard';
import Loading from '@/components/Loading';
import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Pagination from './components/Pagination';
import { BlogCardList } from './configs/constants';

const POSTS_PER_PAGE = 6;

export default function BlogList({ blogParam }: { blogParam?: string }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [tab, setTab] = useState(0);
	const [favorites, setFavorites] = useState<string[]>([]);

	const updateFavorites = () => {
		const fav = localStorage.getItem('favoriteBlogs');
		if (fav) setFavorites(JSON.parse(fav));
	};

	const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
		setTab(newValue);
	};

	useEffect(() => {
		setIsLoading(false);
	}, [blogParam]);

	const totalPages = Math.ceil(BlogCardList.length / POSTS_PER_PAGE);
	const currentPostPerPage = BlogCardList.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE
	);

	useEffect(() => {
		updateFavorites();
		window.addEventListener('storage', updateFavorites);
		return () => {
			window.removeEventListener('storage', updateFavorites);
		};
	}, []);

	return (
		<Box sx={{ minHeight: 'calc(100vh - 64px - 50px)', display: 'flex', flexDirection: 'column' }}>
			<Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
				<Loading isLoading={isLoading} />
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
						? currentPostPerPage
						: BlogCardList.filter((blog) => favorites.includes(blog.id))
					).map((blog) => {
						return (
							<Grid key={blog.id}>
								<BlogCard {...blog} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', mb: 1 }}>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={(page) => setCurrentPage(page)}
				/>
			</Box>
		</Box>
	);
}
