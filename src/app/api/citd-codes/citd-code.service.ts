import { sqliteConnection } from '@/database/data-source';
import { CitdScoreRow } from '@/utils/citd-scores';
import { Repository } from 'typeorm';

import { CitdCode } from './citd-codes.entity';

export class CitdCodeService {
	private repository: Repository<CitdCode> | null = null;

	private async getRepository(): Promise<Repository<CitdCode>> {
		if (!this.repository) {
			const dataSource = await sqliteConnection.getDataSource();
			this.repository = dataSource.getRepository(CitdCode);
		}
		return this.repository;
	}

	/**
	 * Get all stored CITD codes
	 */
	async getAllCodes(): Promise<string[]> {
		const repo = await this.getRepository();
		const codes = await repo.find({
			select: ['code'],
		});
		return codes.map((c) => c.code);
	}

	/**
	 * Check if a code exists in the database
	 */
	async codeExists(code: string): Promise<boolean> {
		const repo = await this.getRepository();
		const count = await repo.count({ where: { code } });
		return count > 0;
	}

	/**
	 * Save new CITD codes to database
	 */
	async saveCodes(scores: CitdScoreRow[]): Promise<void> {
		const repo = await this.getRepository();

		// Convert scores to CitdCode entities
		const citdCodes = scores.map((score) => {
			const citdCode = new CitdCode();
			citdCode.code = String(score.code ?? '');
			citdCode.name = String(score.name ?? '');
			citdCode.credits = score.credits ? Number(score.credits) : undefined;
			citdCode.average = score.avg ? Number(score.avg) : undefined;
			return citdCode;
		});

		// Save all codes (ignore duplicates)
		for (const citdCode of citdCodes) {
			await repo.upsert(citdCode, ['code']);
		}
	}

	/**
	 * Get filtered scores that are not in the database yet
	 */
	async getNewScores(allScores: CitdScoreRow[]): Promise<CitdScoreRow[]> {
		const existingCodes = await this.getAllCodes();
		return allScores.filter((score) => !existingCodes.includes(String(score.code)));
	}

	/**
	 * Clear all stored codes (useful for testing)
	 */
	async clearAllCodes(): Promise<void> {
		const repo = await this.getRepository();
		await repo.clear();
	}

	/**
	 * Get count of stored codes
	 */
	async getCodeCount(): Promise<number> {
		const repo = await this.getRepository();
		return await repo.count();
	}
}
