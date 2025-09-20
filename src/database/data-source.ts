import { BlogPost } from '@/app/api/blog-posts/blog-posts.entity';
import { User } from '@/app/api/users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

// Database configuration
export const dataSourceOptions = (): DataSourceOptions => {
	return {
		type: 'postgres',
		url: process.env.DATABASE_URL,
		logging: process.env.DATABASE_LOGGING === 'true',
		entities: [User, BlogPost],
		ssl: { rejectUnauthorized: false },
		synchronize: process.env.NODE_ENV === 'development', // Auto create tables in development
		migrations: ['src/database/migrations/*.ts'],
		migrationsRun: false, // Set to true if you want to run migrations automatically
	};
};

// Singleton pattern for database connection
class DatabaseConnection {
	private static instance: DatabaseConnection;
	private dataSource: DataSource | null = null;

	private constructor() {}

	public static getInstance(): DatabaseConnection {
		if (!DatabaseConnection.instance) {
			DatabaseConnection.instance = new DatabaseConnection();
		}
		return DatabaseConnection.instance;
	}

	public async getDataSource(): Promise<DataSource> {
		if (!this.dataSource) {
			this.dataSource = new DataSource(dataSourceOptions());
			await this.dataSource.initialize();
		}
		return this.dataSource;
	}

	public async closeConnection(): Promise<void> {
		if (this.dataSource && this.dataSource.isInitialized) {
			await this.dataSource.destroy();
			this.dataSource = null;
		}
	}
}

// Export singleton instance
const dbConnection = DatabaseConnection.getInstance();
export default dbConnection;
