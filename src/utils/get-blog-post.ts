import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const BLOGS_PATH = path.join(process.cwd(), 'src/app/blogs/content');

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
	author?: string;
	tags?: string[];
	category?: string;
	coverImage?: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
	const files = fs.readdirSync(BLOGS_PATH);
	console.log(files);

	const posts = files
		.filter((file) => file.endsWith('.mdx'))
		.map((file) => {
			const filePath = path.join(BLOGS_PATH, file);
			const source = fs.readFileSync(filePath, 'utf8');
			const { data, content } = matter(source);

			return {
				id: uuidv4(),
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
		const source = fs.readFileSync(filePath, 'utf8');
		const { data, content } = matter(source);

		return {
			id: uuidv4(),
			slug,
			title: data.title,
			date: data.date,
			excerpt: data.excerpt || '',
			coverImage: data.coverImage,
			content,
			author: data.author,
			tags: data.tags,
			category: data.category,
		};
	} catch (error) {
		console.error('Error fetching post:', error);
		return null;
	}
}
