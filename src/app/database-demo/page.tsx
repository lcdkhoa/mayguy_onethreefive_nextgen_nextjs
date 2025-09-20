'use client';

import { Refresh as RefreshIcon } from '@mui/icons-material';
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Divider,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface User {
	id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	bio: string;
	isActive: boolean;
	createdAt: string;
}

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	category: string;
	tags: string[];
	isPublished: boolean;
	viewCount: number;
	likeCount: number;
	createdAt: string;
	author: User;
}

export default function DatabaseDemo() {
	const [users, setUsers] = useState<User[]>([]);
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch('/api/users');
			const data = await response.json();

			if (data.success) {
				setUsers(data.data);
			} else {
				setError(data.error || 'Failed to fetch users');
			}
		} catch (err) {
			setError('Network error while fetching users');
			console.error('Error fetching users:', err);
		} finally {
			setLoading(false);
		}
	};

	const fetchBlogPosts = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch('/api/blog-posts?published=true');
			const data = await response.json();

			if (data.success) {
				setBlogPosts(data.data);
			} else {
				setError(data.error || 'Failed to fetch blog posts');
			}
		} catch (err) {
			setError('Network error while fetching blog posts');
			console.error('Error fetching blog posts:', err);
		} finally {
			setLoading(false);
		}
	};

	const seedDatabase = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch('/api/seed', { method: 'POST' });
			const data = await response.json();

			if (data.success) {
				// Refresh data after seeding
				await Promise.all([fetchUsers(), fetchBlogPosts()]);
			} else {
				setError(data.error || 'Failed to seed database');
			}
		} catch (err) {
			setError('Network error while seeding database');
			console.error('Error seeding database:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
		fetchBlogPosts();
	}, []);

	return (
		<Box sx={{ p: 3 }}>
			<Box sx={{ mb: 3 }}>
				<Typography variant="h4" gutterBottom>
					Database Demo
				</Typography>
				<Typography variant="body1" color="text.secondary" paragraph>
					This page demonstrates the database connection and CRUD operations using TypeORM and
					PostgreSQL.
				</Typography>
			</Box>

			<Box sx={{ mb: 3 }}>
				<Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
					<Button
						variant="contained"
						onClick={fetchUsers}
						disabled={loading}
						startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
					>
						Refresh Users
					</Button>
					<Button
						variant="contained"
						onClick={fetchBlogPosts}
						disabled={loading}
						startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
					>
						Refresh Blog Posts
					</Button>
					<Button variant="outlined" onClick={seedDatabase} disabled={loading} color="secondary">
						Seed Database
					</Button>
				</Box>
			</Box>

			{error && (
				<Box sx={{ mb: 3 }}>
					<Alert severity="error" onClose={() => setError(null)}>
						{error}
					</Alert>
				</Box>
			)}

			<Box sx={{ mb: 3, width: '100%' }}>
				<Card>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							Users ({users.length})
						</Typography>
						<Divider sx={{ mb: 2 }} />
						{users.length === 0 ? (
							<Typography color="text.secondary">
								No users found. Click &quot;Seed Database&quot; to create sample data.
							</Typography>
						) : (
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
								{users.map((user) => (
									<Box key={user.id}>
										<Card variant="outlined">
											<CardContent sx={{ p: 2 }}>
												<Typography variant="subtitle1" fontWeight="bold">
													{user.firstName} {user.lastName}
												</Typography>
												<Typography variant="body2" color="text.secondary">
													@{user.username}
												</Typography>
												<Typography variant="body2" color="text.secondary">
													{user.email}
												</Typography>
												{user.bio && (
													<Typography variant="body2" sx={{ mt: 1 }}>
														{user.bio}
													</Typography>
												)}
												<Box sx={{ mt: 1 }}>
													<Chip
														label={user.isActive ? 'Active' : 'Inactive'}
														color={user.isActive ? 'success' : 'default'}
														size="small"
													/>
												</Box>
											</CardContent>
										</Card>
									</Box>
								))}
							</Box>
						)}
					</CardContent>
				</Card>
			</Box>

			<Box sx={{ mb: 3, width: '100%' }}>
				<Card>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							Blog Posts ({blogPosts.length})
						</Typography>
						<Divider sx={{ mb: 2 }} />
						{blogPosts.length === 0 ? (
							<Typography color="text.secondary">
								No blog posts found. Click &quot;Seed Database&quot; to create sample data.
							</Typography>
						) : (
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
								{blogPosts.map((post) => (
									<Box key={post.id}>
										<Card variant="outlined">
											<CardContent sx={{ p: 2 }}>
												<Typography variant="subtitle1" fontWeight="bold">
													{post.title}
												</Typography>
												<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
													by {post.author.firstName} {post.author.lastName}
												</Typography>
												{post.excerpt && (
													<Typography variant="body2" sx={{ mb: 1 }}>
														{post.excerpt}
													</Typography>
												)}
												<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
													<Chip label={post.category} size="small" color="primary" />
													{post.tags.map((tag) => (
														<Chip key={tag} label={tag} size="small" variant="outlined" />
													))}
												</Box>
												<Box
													sx={{
														display: 'flex',
														gap: 2,
														fontSize: '0.75rem',
														color: 'text.secondary',
													}}
												>
													<span>👁️ {post.viewCount} views</span>
													<span>❤️ {post.likeCount} likes</span>
													<span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
												</Box>
											</CardContent>
										</Card>
									</Box>
								))}
							</Box>
						)}
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
}
