'use client';

import { BlogPost } from '@/lib/blog';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';

interface BlogCardProps {
	post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
	return (
		<Link href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
			<Paper
				elevation={0}
				sx={{
					p: 3,
					height: '100%',
					transition: 'all 0.2s',
					'&:hover': {
						transform: 'translateY(-4px)',
						boxShadow: 2,
					},
				}}
			>
				<Typography variant="h5" component="h2" gutterBottom>
					{post.title}
				</Typography>

				<Typography variant="subtitle2" color="text.secondary" gutterBottom>
					{format(new Date(post.date), 'dd MMMM yyyy', { locale: vi })}
					{post.author && ` • ${post.author}`}
				</Typography>

				<Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
					{post.excerpt}
				</Typography>

				{post.tags && post.tags.length > 0 && (
					<Stack direction="row" spacing={1}>
						{post.tags.map((tag) => (
							<Chip
								key={tag}
								label={tag}
								size="small"
								sx={{
									bgcolor: 'primary.light',
									color: 'primary.contrastText',
									'&:hover': {
										bgcolor: 'primary.main',
									},
								}}
							/>
						))}
					</Stack>
				)}
			</Paper>
		</Link>
	);
}
