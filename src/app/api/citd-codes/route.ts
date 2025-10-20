import { NextResponse } from 'next/server';

import { CitdCodeService } from './citd-code.service';

export const dynamic = 'force-dynamic';

// GET /api/citd-codes - Get all stored CITD codes
export async function GET() {
	try {
		const citdCodeService = new CitdCodeService();
		const codes = await citdCodeService.getAllCodes();
		const count = await citdCodeService.getCodeCount();

		return NextResponse.json({
			success: true,
			codes,
			count,
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('❌ Failed to get CITD codes:', message);
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}

// DELETE /api/citd-codes - Clear all stored CITD codes
export async function DELETE() {
	try {
		const citdCodeService = new CitdCodeService();
		await citdCodeService.clearAllCodes();

		return NextResponse.json({
			success: true,
			message: 'All CITD codes cleared successfully',
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('❌ Failed to clear CITD codes:', message);
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}
