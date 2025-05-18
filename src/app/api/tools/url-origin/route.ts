import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const { url } = await request.json();

		if (!url) {
			return NextResponse.json({ error: 'URL is required' }, { status: 400 });
		}

		const response = await fetch(url, {
			method: 'HEAD',
			redirect: 'manual',
		});

		const location = response.headers.get('Location');

		if (location) {
			return NextResponse.json({ originalUrl: location });
		}

		// Nếu không có Location header, thử GET request để xem có redirect không
		const getResponse = await fetch(url, {
			method: 'GET',
			redirect: 'manual',
		});

		const getLocation = getResponse.headers.get('Location');

		if (getLocation) {
			return NextResponse.json({ originalUrl: getLocation });
		}

		return NextResponse.json(
			{ error: 'Cannot find the original URL. It might not be a shortened URL.' },
			{ status: 404 }
		);
	} catch (error) {
		console.error('Error checking URL:', error);
		return NextResponse.json({ error: 'Error checking URL' }, { status: 500 });
	}
}
