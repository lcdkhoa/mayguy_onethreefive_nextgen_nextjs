'use client';

import { BlogPost } from '@/utils/get-blog-post';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import BlogCard from './components/BlogCard';
import BlogFilters from './components/BlogFilters';
import Breadcrumb from './components/Breadcrumb';
import Pagination from './components/Pagination';

const POSTS_PER_PAGE = 6;

export default function BlogList() {
	const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
	const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('/api/blogs');
				if (!response.ok) {
					throw new Error('Failed to fetch posts');
				}
				const posts = await response.json();
				setAllPosts(posts);
				setFilteredPosts(posts);
			} catch (error) {
				console.error('Error fetching posts:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchPosts();
	}, []);

	// Tính toán số trang
	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

	// Lấy bài viết cho trang hiện tại
	const currentPosts = filteredPosts.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE
	);

	// Lấy featured posts (3 bài viết mới nhất)
	const featuredPosts = allPosts
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);

	if (isLoading) {
		return (
			<Container maxWidth="lg" sx={{ py: 4 }}>
				<Typography>Đang tải...</Typography>
			</Container>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Breadcrumb />

			{/* Featured Posts */}
			<Box sx={{ mb: 6 }}>
				<Typography variant="h4" component="h2" gutterBottom>
					Bài viết nổi bật
				</Typography>
				<Box
					sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}
				>
					{featuredPosts.map((post) => (
						<Box key={post.slug}>
							<BlogCard post={post} featured />
						</Box>
					))}
				</Box>
			</Box>

			{/* Filters */}
			<BlogFilters posts={allPosts} onFilterChange={setFilteredPosts} />

			{/* Blog List */}
			<Typography variant="h4" component="h2" gutterBottom>
				Tất cả bài viết
			</Typography>
			<Box
				sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}
			>
				{currentPosts.map((post) => (
					<Box key={post.slug}>
						<BlogCard post={post} />
					</Box>
				))}
			</Box>

			{/* Pagination */}
			<Pagination count={totalPages} page={currentPage} onChange={(page) => setCurrentPage(page)} />
		</Container>
	);
}
