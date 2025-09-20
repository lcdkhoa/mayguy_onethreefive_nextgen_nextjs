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

// GET /api/users/[id] - Get user by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await initService();

		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{
					success: false,
					error: 'User ID is required',
				},
				{ status: 400 }
			);
		}

		const user = await userService.getUserById(id);

		if (!user) {
			return NextResponse.json(
				{
					success: false,
					error: 'User not found',
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			data: user,
		});
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to fetch user',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

// PUT /api/users/[id] - Update user
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await initService();

		const { id } = await params;
		const updateData = await request.json();

		if (!id) {
			return NextResponse.json(
				{
					success: false,
					error: 'User ID is required',
				},
				{ status: 400 }
			);
		}

		// Check if user exists
		const existingUser = await userService.getUserById(id);
		if (!existingUser) {
			return NextResponse.json(
				{
					success: false,
					error: 'User not found',
				},
				{ status: 404 }
			);
		}

		const updatedUser = await userService.updateUser(id, updateData);

		return NextResponse.json({
			success: true,
			data: updatedUser,
			message: 'User updated successfully',
		});
	} catch (error) {
		console.error('Error updating user:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to update user',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await initService();

		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{
					success: false,
					error: 'User ID is required',
				},
				{ status: 400 }
			);
		}

		// Check if user exists
		const existingUser = await userService.getUserById(id);
		if (!existingUser) {
			return NextResponse.json(
				{
					success: false,
					error: 'User not found',
				},
				{ status: 404 }
			);
		}

		const deleted = await userService.deleteUser(id);

		if (!deleted) {
			return NextResponse.json(
				{
					success: false,
					error: 'Failed to delete user',
				},
				{ status: 500 }
			);
		}

		return NextResponse.json({
			success: true,
			message: 'User deleted successfully',
		});
	} catch (error) {
		console.error('Error deleting user:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to delete user',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
