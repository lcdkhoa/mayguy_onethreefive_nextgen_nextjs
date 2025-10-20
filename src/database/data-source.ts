import { BlogPost } from '@/app/api/blog-posts/blog-posts.entity';
import { CitdCode } from '@/app/api/citd-codes/citd-codes.entity';
import { User } from '@/app/api/users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

// PostgreSQL Database configuration
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

// SQLite Database configuration for CITD codes
export const sqliteDataSourceOptions = (): DataSourceOptions => {
	return {
		type: 'sqlite',
		database: process.env.SQLITE_DATABASE_PATH || './database.sqlite',
		logging: process.env.DATABASE_LOGGING === 'true',
		entities: [CitdCode],
		synchronize: process.env.NODE_ENV === 'development',
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

// SQLite Singleton pattern for CITD codes
class SQLiteConnection {
	private static instance: SQLiteConnection;
	private dataSource: DataSource | null = null;

	private constructor() {}

	public static getInstance(): SQLiteConnection {
		if (!SQLiteConnection.instance) {
			SQLiteConnection.instance = new SQLiteConnection();
		}
		return SQLiteConnection.instance;
	}

	public async getDataSource(): Promise<DataSource> {
		if (!this.dataSource) {
			this.dataSource = new DataSource(sqliteDataSourceOptions());
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

// Export singleton instances
const dbConnection = DatabaseConnection.getInstance();
const sqliteConnection = SQLiteConnection.getInstance();
export default dbConnection;
export { sqliteConnection };
