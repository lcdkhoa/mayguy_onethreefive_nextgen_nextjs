import { BlogPost } from '@/app/api/blog-posts/blog-posts.entity';
import { User } from '@/app/api/users/users.entity';
import { DataSource } from 'typeorm';

// Database configuration
export const AppDataSource = new DataSource({
	type: 'postgres',
	// Use connection string if available (recommended for Supabase)
	url: process.env.DATABASE_URL,
	logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
	entities: [User, BlogPost],
	migrations: ['src/migrations/*.ts'],
	subscribers: ['src/subscribers/*.ts'],
	ssl: {
		rejectUnauthorized: false,
	},
});

export const initializeDatabase = async (): Promise<DataSource> => {
	try {
		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize();
			console.log('✅ Database connection established successfully');
		}
		return AppDataSource;
	} catch (error) {
		console.error('❌ Error during database initialization:', error);
		throw error;
	}
};

export const closeDatabase = async (): Promise<void> => {
	try {
		if (AppDataSource.isInitialized) {
			await AppDataSource.destroy();
			console.log('✅ Database connection closed successfully');
		}
	} catch (error) {
		console.error('❌ Error closing database connection:', error);
		throw error;
	}
};
