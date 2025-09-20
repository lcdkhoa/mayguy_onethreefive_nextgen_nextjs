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

// GET /api/blog-posts/[id] - Get blog post by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await initService();

		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{
					success: false,
					error: 'Blog post ID is required',
				},
				{ status: 400 }
			);
		}

		const blogPost = await blogPostService.getBlogPostById(id);

		if (!blogPost) {
			return NextResponse.json(
				{
					success: false,
					error: 'Blog post not found',
				},
				{ status: 404 }
			);
		}

		// Increment view count
		await blogPostService.incrementViewCount(id);

		return NextResponse.json({
			success: true,
			data: blogPost,
		});
	} catch (error) {
		console.error('Error fetching blog post:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to fetch blog post',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

// PUT /api/blog-posts/[id] - Update blog post
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await initService();

		const { id } = await params;
		const updateData = await request.json();

		if (!id) {
			return NextResponse.json(
				{
					success: false,
					error: 'Blog post ID is required',
				},
				{ status: 400 }
			);
		}

		// Check if blog post exists
		const existingBlogPost = await blogPostService.getBlogPostById(id);
		if (!existingBlogPost) {
			return NextResponse.json(
				{
					success: false,
					error: 'Blog post not found',
				},
				{ status: 404 }
			);
		}

		const updatedBlogPost = await blogPostService.updateBlogPost(id, updateData);

		return NextResponse.json({
			success: true,
			data: updatedBlogPost,
			message: 'Blog post updated successfully',
		});
	} catch (error) {
		console.error('Error updating blog post:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to update blog post',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

// DELETE /api/blog-posts/[id] - Delete blog post
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await initService();

		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{
					success: false,
					error: 'Blog post ID is required',
				},
				{ status: 400 }
			);
		}

		// Check if blog post exists
		const existingBlogPost = await blogPostService.getBlogPostById(id);
		if (!existingBlogPost) {
			return NextResponse.json(
				{
					success: false,
					error: 'Blog post not found',
				},
				{ status: 404 }
			);
		}

		const deleted = await blogPostService.deleteBlogPost(id);

		if (!deleted) {
			return NextResponse.json(
				{
					success: false,
					error: 'Failed to delete blog post',
				},
				{ status: 500 }
			);
		}

		return NextResponse.json({
			success: true,
			message: 'Blog post deleted successfully',
		});
	} catch (error) {
		console.error('Error deleting blog post:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to delete blog post',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
