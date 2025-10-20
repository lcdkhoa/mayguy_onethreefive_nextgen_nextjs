import { CitdCodeService } from '@/app/api/citd-codes/citd-code.service';
import { buildScoresHtmlTable, fetchScores } from '@/utils/citd-scores';
import { sendMail } from '@/utils/mailing';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/cron/citd-scores
export async function POST() {
	try {
		const scores = await fetchScores();
		const citdCodeService = new CitdCodeService();

		// Get new scores that are not in database yet
		const availableScores = await citdCodeService.getNewScores(scores);

		if (availableScores.length > 0) {
			// Send email notification
			await sendMail('📬 Báo cáo điểm CITD tự động', buildScoresHtmlTable(availableScores));

			// Save new codes to database
			await citdCodeService.saveCodes(availableScores);

			console.log(`✅ Saved ${availableScores.length} new CITD codes to database`);
		} else {
			console.log('ℹ️ No new CITD scores found');
		}

		return NextResponse.json({
			success: true,
			totalScores: scores.length,
			newScores: availableScores.length,
			storedCodes: await citdCodeService.getCodeCount(),
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('⚠️ Cron fetch failed:', message);
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}
