import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('citd_codes')
export class CitdCode {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 50, unique: true })
	code!: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	name?: string;

	@Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
	credits?: number;

	@Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
	average?: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
