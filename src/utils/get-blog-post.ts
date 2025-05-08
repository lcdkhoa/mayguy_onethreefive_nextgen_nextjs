import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const BLOGS_PATH = path.join(process.cwd(), 'src/app/blogs/content');

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
	author?: string;
	tags?: string[];
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
				slug: file.replace(/\.mdx$/, ''),
				title: data.title,
				date: data.date,
				excerpt: data.excerpt || '',
				content,
				author: data.author,
				tags: data.tags,
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
			slug,
			title: data.title,
			date: data.date,
			excerpt: data.excerpt || '',
			content,
			author: data.author,
			tags: data.tags,
		};
	} catch (error) {
		return null;
	}
}
