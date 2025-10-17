import { buildScoresHtmlTable, fetchScores } from '@/utils/citd-scores';
import { sendMail } from '@/utils/mailing';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/cron/citd-scores
export async function POST() {
	try {
		const scores = await fetchScores();
		const currentCodes = JSON.parse(process.env.CURRENT_CITD_CODE ?? '[]') as string[];
		const availableScores = scores.filter((score) => !currentCodes.includes(String(score.code)));
		if (availableScores.length > 0) {
			await sendMail('📬 Báo cáo điểm CITD tự động', buildScoresHtmlTable(availableScores));
		}

		return NextResponse.json({ success: true, count: scores.length });
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('⚠️ Cron fetch failed:', message);
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}
