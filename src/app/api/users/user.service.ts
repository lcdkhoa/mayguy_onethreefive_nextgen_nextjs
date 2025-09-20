import { User } from '@/app/api/users/users.entity';
import { AppDataSource } from '@/database/data-source';
import { Repository } from 'typeorm';

export class UserService {
	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
	}

	// Create a new user
	async createUser(userData: Partial<User>): Promise<User> {
		const user = this.userRepository.create(userData);
		return await this.userRepository.save(user);
	}

	// Get user by ID
	async getUserById(id: string): Promise<User | null> {
		return await this.userRepository.findOne({
			where: { id },
			relations: ['blogPosts'],
		});
	}

	// Get user by email
	async getUserByEmail(email: string): Promise<User | null> {
		return await this.userRepository.findOne({
			where: { email },
			relations: ['blogPosts'],
		});
	}

	// Get all users
	async getAllUsers(): Promise<User[]> {
		return await this.userRepository.find({
			relations: ['blogPosts'],
			order: { createdAt: 'DESC' },
		});
	}

	// Update user
	async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
		await this.userRepository.update(id, userData);
		return await this.getUserById(id);
	}

	// Delete user
	async deleteUser(id: string): Promise<boolean> {
		const result = await this.userRepository.delete(id);
		return result.affected !== 0;
	}

	// Get active users
	async getActiveUsers(): Promise<User[]> {
		return await this.userRepository.find({
			where: { isActive: true },
			relations: ['blogPosts'],
			order: { createdAt: 'DESC' },
		});
	}
}
