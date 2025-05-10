'use client';

import BlogCard from '@/components/Cards/BlogCard';
import Loading from '@/components/Loading';
import { BlogPost } from '@/utils/get-blog-post';
import { Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Breadcrumb from './components/Breadcrumb';
import Pagination from './components/Pagination';
import { BlogCardList } from './configs/constants';

const POSTS_PER_PAGE = 6;

export default function BlogList({ blogParam }: { blogParam?: string }) {
	const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [tab, setTab] = useState(0);
	const [favorites, setFavorites] = useState<string[]>([]);
	const router = useRouter();

	const updateFavorites = () => {
		const fav = localStorage.getItem('favoriteTools');
		if (fav) setFavorites(JSON.parse(fav));
	};

	const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
		setTab(newValue);
	};

	useEffect(() => {
		setIsLoading(false);
	}, [blogParam]);

	const totalPages = Math.ceil(BlogCardList.length / POSTS_PER_PAGE);

	const currentPosts = filteredPosts.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE
	);

	// get featured posts (3 latest posts)
	const featuredPosts = BlogCardList.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	).slice(0, 3);

	useEffect(() => {
		updateFavorites();
		window.addEventListener('storage', updateFavorites);
		return () => {
			window.removeEventListener('storage', updateFavorites);
		};
	}, []);

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Breadcrumb />
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
					? BlogCardList
					: BlogCardList.filter((blog) => favorites.includes(blog.id))
				).map((blog) => {
					return (
						<Grid key={blog.id}>
							<BlogCard {...blog} />
						</Grid>
					);
				})}
			</Grid>

			{/* Pagination */}
			<Pagination count={totalPages} page={currentPage} onChange={(page) => setCurrentPage(page)} />
		</Container>
	);
}
