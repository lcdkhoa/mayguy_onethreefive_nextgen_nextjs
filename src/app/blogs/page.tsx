'use client';

import { Grid, Typography } from '@mui/material';

// import Link from 'next/link';

// const blogPosts = [
// 	{
// 		id: 1,
// 		title: 'Bài viết đầu tiên',
// 		excerpt: 'Đây là đoạn trích của bài viết đầu tiên...',
// 		date: '2024-03-20',
// 		slug: 'bai-viet-dau-tien',
// 	},
// 	{
// 		id: 2,
// 		title: 'Bài viết thứ hai',
// 		excerpt: 'Đây là đoạn trích của bài viết thứ hai...',
// 		date: '2024-03-21',
// 		slug: 'bai-viet-thu-hai',
// 	},
// ];

export default function Blog() {
	return (
		<Grid
			justifyContent={'center'}
			alignContent={'center'}
			sx={{ display: 'flex', height: '100%' }}
			mt={10}
		>
			<Typography variant="h2" component="h1" gutterBottom>
				Building Blog Section
			</Typography>
			{/* <Grid container spacing={3}>
				{blogPosts.map((post) => (
					<Grid key={post.id}>
						<Card>
							<CardContent>
								<Typography variant="h5" component="h2" gutterBottom>
									{post.title}
								</Typography>
								<Typography variant="body2" color="text.secondary" gutterBottom>
									{post.date}
								</Typography>
								<Typography variant="body1">{post.excerpt}</Typography>
							</CardContent>
							<CardActions>
								<Button component={Link} href={`/blogs/${post.slug}`} size="small">
									Đọc thêm
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid> */}
		</Grid>
	);
}
