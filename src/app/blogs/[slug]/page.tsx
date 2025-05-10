import BlogLayout from '@/app/blogs/components/BlogLayout';
import TableOfContents from '@/app/blogs/components/TableOfContents';
import { getAllPosts, getPostBySlug } from '@/utils/get-blog-post';
import { Box, Container, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BreadcrumbArticle from '../components/BreadcrumbArticle';
import MDXContent from '../components/MDXContent';

interface BlogPostProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return {
			title: 'Not found',
		};
	}

	return post;
}

export default async function BlogPost({ params }: BlogPostProps) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	console.log('post', post);

	if (!post) return notFound();

	const category = post.tags?.[0] || 'uncategorized';

	return (
		<BlogLayout>
			<Container maxWidth="lg">
				<BreadcrumbArticle
					category={category}
					date={post.date}
					title={post.title}
					slug={post.slug}
				/>
				<Box sx={{ display: 'flex', gap: 4, py: 4 }}>
					<Box sx={{ flex: 1 }}>
						<Paper elevation={0} sx={{ p: 4 }}>
							<Typography variant="h1" component="h1" gutterBottom>
								{post.title}
							</Typography>

							<Typography variant="subtitle1" color="text.secondary" gutterBottom>
								{post.date
									? format(new Date(post.date), 'dd MMMM yyyy', { locale: vi })
									: 'No date'}
							</Typography>

							<MDXContent content={post.content} />
						</Paper>
					</Box>

					<Box sx={{ width: 300, display: { xs: 'none', md: 'block' } }}>
						<TableOfContents content={post.content} />
					</Box>
				</Box>
			</Container>
		</BlogLayout>
	);
}
