import { UserService } from '@/app/api/users/user.service';
import dbConnection from '@/database/data-source';
import { NextRequest, NextResponse } from 'next/server';

// Initialize database connection
let userService: UserService;

const initService = async () => {
	if (!userService) {
		const dataSource = await dbConnection.getDataSource();
		userService = new UserService(dataSource);
	}
};

// GET /api/users - Get all users
export async function GET(request: NextRequest) {
	try {
		await initService();

		const { searchParams } = new URL(request.url);
		const activeOnly = searchParams.get('active') === 'true';

		const users = activeOnly ? await userService.getActiveUsers() : await userService.getAllUsers();

		return NextResponse.json({
			success: true,
			data: users,
			count: users.length,
		});
	} catch (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to fetch users',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
	try {
		await initService();

		const userData = await request.json();

		// Validate required fields
		if (!userData.email || !userData.username) {
			return NextResponse.json(
				{
					success: false,
					error: 'Email and username are required',
				},
				{ status: 400 }
			);
		}

		// Check if user already exists
		const existingUser = await userService.getUserByEmail(userData.email);
		if (existingUser) {
			return NextResponse.json(
				{
					success: false,
					error: 'User with this email already exists',
				},
				{ status: 409 }
			);
		}

		const newUser = await userService.createUser(userData);

		return NextResponse.json(
			{
				success: true,
				data: newUser,
				message: 'User created successfully',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to create user',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
