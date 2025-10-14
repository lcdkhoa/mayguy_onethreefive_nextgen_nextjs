import { fetchScores } from '@/utils/citd-scores';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const data = await fetchScores();
		return NextResponse.json({ ok: true, data });
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		console.error('❌ Fetch failed', e);
		return NextResponse.json({ ok: false, error: message }, { status: 500 });
	}
}
