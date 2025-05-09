'use client';

import { BlogPost } from '@/utils/get-blog-post';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	Stack,
	Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
	post: BlogPost;
	featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
	return (
		<Card
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				transition: 'transform 0.2s',
				'&:hover': {
					transform: 'translateY(-4px)',
				},
			}}
		>
			<CardActionArea component={Link} href={`/blogs/${post.slug}`}>
				<CardMedia
					component="img"
					height={featured ? 240 : 200}
					image="/images/blog-placeholder.jpg"
					alt={post.title}
					sx={{ objectFit: 'cover' }}
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography
						variant={featured ? 'h5' : 'h6'}
						component="h2"
						gutterBottom
						sx={{
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
						}}
					>
						{post.title}
					</Typography>

					<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						{format(new Date(post.date), 'dd MMMM yyyy', { locale: vi })}
						{post.author && ` • ${post.author}`}
					</Typography>

					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							mb: 2,
						}}
					>
						{post.excerpt}
					</Typography>

					{post.tags && post.tags.length > 0 && (
						<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
							{post.tags.map((tag) => (
								<Chip key={tag} label={tag} size="small" sx={{ m: 0.5 }} />
							))}
						</Stack>
					)}
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
