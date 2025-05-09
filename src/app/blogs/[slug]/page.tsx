import BlogLayout from '@/app/blogs/components/BlogLayout';
import MDXContent from '@/app/blogs/components/MDXContent';
import TableOfContents from '@/app/blogs/components/TableOfContents';
import { getAllPosts, getPostBySlug } from '@/utils/get-blog-post';
import { Box, Container, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Metadata } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';

import BreadcrumbArticle from '../components/BreadcrumbArticle';

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

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: 'article',
			publishedTime: post.date,
		},
	};
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) return notFound();

	const mdxSource = await serialize(post.content);
	const category = (post.tags && post.tags[0]) || 'uncategorized';

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
								{format(new Date(post.date), 'dd MMMM yyyy', { locale: vi })}
								{post.author && ` • ${post.author}`}
							</Typography>

							<MDXContent source={mdxSource} />
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
