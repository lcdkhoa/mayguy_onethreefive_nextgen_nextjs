import { seedDatabase } from '@/utils/database-seed';
import { NextResponse } from 'next/server';

// POST /api/seed - Seed the database with sample data
export async function POST() {
	try {
		await seedDatabase();

		return NextResponse.json({
			success: true,
			message: 'Database seeded successfully with sample data',
		});
	} catch (error) {
		console.error('Error seeding database:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to seed database',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
