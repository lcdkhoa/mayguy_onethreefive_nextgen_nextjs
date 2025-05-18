import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const { url } = await request.json();

		if (!url) {
			return NextResponse.json({ error: 'URL is required' }, { status: 400 });
		}

		const getResponse = await axios.get(url, {
			maxRedirects: 0,
			validateStatus: (status) => status < 400,
		});
		console.log('getResponse', getResponse.headers);

		const getLocation = getResponse.headers.location;

		if (getLocation) {
			return NextResponse.json({ originalUrl: getLocation });
		}

		return NextResponse.json(
			{ error: 'Cannot find the original URL. It might not be a shortened URL.' },
			{ status: 404 }
		);
	} catch (error) {
		console.error('Error checking URL:', error);
		return NextResponse.json({ error: 'Link is not available' }, { status: 500 });
	}
}
