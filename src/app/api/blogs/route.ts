import { getAllPosts } from '@/utils/get-blog-post';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const posts = await getAllPosts();
		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
	}
}
