import { BlogCardList } from '@/app/blogs/configs/constants';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const BLOGS_PATH = path.join(process.cwd(), 'src/app/blogs/content');

export interface BlogPost {
	id?: string;
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
	tags?: string[];
	category?: string;
	coverImage?: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
	const files = fs.readdirSync(BLOGS_PATH);

	const posts = files
		.filter((file) => file.endsWith('.mdx'))
		.map((file) => {
			const filePath = path.join(BLOGS_PATH, file);
			const source = fs.readFileSync(filePath, 'utf8');
			const { data, content, ...blogConfig } = matter(source);

			return {
				title: data.title,
				excerpt: data.excerpt || '',
				coverImage: data.coverImage,
				slug: file.replace(/\.mdx$/, ''),
				date: data.date,
				content,
				tags: data.tags,
				category: data.category,
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	try {
		const filePath = path.join(BLOGS_PATH, `${slug}.mdx`);
		const content = fs.readFileSync(filePath, 'utf8');
		const data = BlogCardList.find((blog) => blog.slug.split('/blogs/').pop() === slug);

		if (!data) return null;

		return {
			...data,
			content,
		};
	} catch (error) {
		console.error('Error fetching post:', error);
		return null;
	}
}
