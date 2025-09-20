import { BlogPost } from '@/app/api/blog-posts/blog-posts.entity';
import { User } from '@/app/api/users/users.entity';
import { DataSource } from 'typeorm';

// Database configuration
export const AppDataSource = new DataSource({
	type: 'postgres',
	// Use connection string if available (recommended for Supabase)
	url: process.env.DATABASE_URL,
	// Fallback to individual parameters
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT || '5432'),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
	entities: [User, BlogPost],
	migrations: ['src/migrations/*.ts'],
	subscribers: ['src/subscribers/*.ts'],
	ssl:
		process.env.NODE_ENV === 'production'
			? {
					rejectUnauthorized: false,
				}
			: false,
});

export const initializeDatabase = async (): Promise<DataSource> => {
	try {
		if (!AppDataSource.isInitialized) {
			// Log database configuration for debugging
			console.log('🔍 Database configuration:', {
				type: process.env.DATABASE_TYPE,
				host: process.env.DATABASE_HOST,
				port: process.env.DATABASE_PORT,
				database: process.env.DATABASE_NAME,
				ssl: process.env.NODE_ENV === 'production' ? 'enabled' : 'disabled',
			});

			await AppDataSource.initialize();
			console.log('✅ Database connection established successfully');
		}
		return AppDataSource;
	} catch (error) {
		console.error('❌ Error during database initialization:', error);
		console.error('❌ Database config:', {
			host: process.env.DATABASE_HOST,
			port: process.env.DATABASE_PORT,
			database: process.env.DATABASE_NAME,
			ssl: process.env.NODE_ENV === 'production' ? 'enabled' : 'disabled',
		});
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
