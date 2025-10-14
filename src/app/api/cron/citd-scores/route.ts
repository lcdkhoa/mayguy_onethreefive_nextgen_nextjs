import { buildScoresHtmlTable, fetchScores } from '@/utils/citd-scores';
import { sendMail } from '@/utils/mailing';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/cron/citd-scores
export async function POST() {
	try {
		const scores = await fetchScores();
		const html = buildScoresHtmlTable(scores);

		if (scores.length > 5) {
			await sendMail('📬 Báo cáo điểm CITD tự động', html);
		}

		return NextResponse.json({ ok: true, count: scores.length });
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('⚠️ Cron fetch failed:', message);
		return NextResponse.json({ ok: false, error: message }, { status: 500 });
	}
}
