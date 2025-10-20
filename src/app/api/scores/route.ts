import { fetchScores } from '@/utils/citd-scores';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const data = await fetchScores();
		return NextResponse.json({ success: true, data });
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		console.error('❌ Fetch failed', e);
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json().catch(() => ({}));
		const cookie = typeof body?.cookie === 'string' ? body.cookie : undefined;
		const csrfToken = typeof body?.csrfToken === 'string' ? body.csrfToken : undefined;

		const data = await fetchScores({ cookie, csrfToken });
		return NextResponse.json({ success: true, data });
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		console.error('❌ Fetch failed (POST)', e);
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}
