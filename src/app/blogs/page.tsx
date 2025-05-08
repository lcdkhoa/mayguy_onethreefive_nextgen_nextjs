import BlogCard from '@/app/blogs/components/BlogCard';
import { getAllPosts } from '@/utils/get-blog-post';
import { Container, Grid, Typography } from '@mui/material';

export const metadata = {
	title: 'Blog',
	description: 'Danh sách các bài viết blog',
};

export default async function BlogsPage() {
	const posts = await getAllPosts();

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h1" component="h1" gutterBottom>
				Blog
			</Typography>

			<Grid container spacing={4}>
				{posts.map((post) => (
					<Grid key={post.slug}>
						<BlogCard post={post} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
