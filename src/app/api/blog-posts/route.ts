import { BlogPostService } from '@/app/api/blog-posts/blog-post.service';
import dbConnection from '@/database/data-source';
import { NextRequest, NextResponse } from 'next/server';

// Initialize database connection
let blogPostService: BlogPostService;

const initService = async () => {
	if (!blogPostService) {
		const dataSource = await dbConnection.getDataSource();
		blogPostService = new BlogPostService(dataSource);
	}
};

// GET /api/blog-posts - Get all blog posts
export async function GET(request: NextRequest) {
	try {
		await initService();

		const { searchParams } = new URL(request.url);
		const published = searchParams.get('published');
		const category = searchParams.get('category');
		const authorId = searchParams.get('authorId');
		const search = searchParams.get('search');

		let blogPosts;

		if (search) {
			blogPosts = await blogPostService.searchBlogPosts(search);
		} else if (published === 'true') {
			blogPosts = await blogPostService.getPublishedBlogPosts();
		} else if (category) {
			blogPosts = await blogPostService.getBlogPostsByCategory(category);
		} else if (authorId) {
			blogPosts = await blogPostService.getBlogPostsByAuthor(authorId);
		} else {
			blogPosts = await blogPostService.getAllBlogPosts();
		}

		return NextResponse.json({
			success: true,
			data: blogPosts,
			count: blogPosts.length,
		});
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to fetch blog posts',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

// POST /api/blog-posts - Create new blog post
export async function POST(request: NextRequest) {
	try {
		await initService();

		const blogPostData = await request.json();

		// Validate required fields
		if (!blogPostData.title || !blogPostData.content || !blogPostData.authorId) {
			return NextResponse.json(
				{
					success: false,
					error: 'Title, content, and authorId are required',
				},
				{ status: 400 }
			);
		}

		// Generate slug if not provided
		if (!blogPostData.slug) {
			blogPostData.slug = blogPostData.title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');
		}

		const newBlogPost = await blogPostService.createBlogPost(blogPostData);

		return NextResponse.json(
			{
				success: true,
				data: newBlogPost,
				message: 'Blog post created successfully',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error creating blog post:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to create blog post',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
