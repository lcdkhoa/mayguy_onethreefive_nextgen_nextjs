import { BlogPostService } from '@/app/api/blog-posts/blog-post.service';
import { UserService } from '@/app/api/users/user.service';
import { initializeDatabase } from '@/database/data-source';

export async function seedDatabase() {
	try {
		console.log('🌱 Starting database seeding...');

		// Initialize database
		await initializeDatabase();

		const userService = new UserService();
		const blogPostService = new BlogPostService();

		// Create sample users
		const users = [
			{
				email: 'admin@example.com',
				username: 'admin',
				firstName: 'Admin',
				lastName: 'User',
				bio: 'System administrator',
				isActive: true,
			},
			{
				email: 'john.doe@example.com',
				username: 'johndoe',
				firstName: 'John',
				lastName: 'Doe',
				bio: 'Full-stack developer passionate about web technologies',
				isActive: true,
			},
			{
				email: 'jane.smith@example.com',
				username: 'janesmith',
				firstName: 'Jane',
				lastName: 'Smith',
				bio: 'UI/UX designer and content creator',
				isActive: true,
			},
		];

		const createdUsers = [];
		for (const userData of users) {
			try {
				const existingUser = await userService.getUserByEmail(userData.email);
				if (!existingUser) {
					const user = await userService.createUser(userData);
					createdUsers.push(user);
					console.log(`✅ Created user: ${user.email}`);
				} else {
					createdUsers.push(existingUser);
					console.log(`ℹ️  User already exists: ${userData.email}`);
				}
			} catch (error) {
				console.error(`❌ Error creating user ${userData.email}:`, error);
			}
		}

		// Create sample blog posts
		const blogPosts = [
			{
				title: 'Getting Started with Next.js 15',
				slug: 'getting-started-with-nextjs-15',
				excerpt: 'Learn the fundamentals of Next.js 15 and its new features',
				content: `# Getting Started with Next.js 15

Next.js 15 brings many exciting new features and improvements. In this comprehensive guide, we'll explore:

## New Features in Next.js 15

1. **Improved Performance**: Better build times and runtime performance
2. **Enhanced Developer Experience**: Better error messages and debugging tools
3. **New APIs**: Additional APIs for better control over your application

## Getting Started

To create a new Next.js 15 project, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will create a new Next.js project with all the latest features.

## Conclusion

Next.js 15 is a powerful framework that makes building React applications easier and more efficient.`,
				category: 'Web Development',
				tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
				isPublished: true,
				authorId: createdUsers[0]?.id,
			},
			{
				title: 'TypeScript Best Practices',
				slug: 'typescript-best-practices',
				excerpt: 'Essential TypeScript patterns and practices for better code quality',
				content: `# TypeScript Best Practices

TypeScript is a powerful language that adds static type checking to JavaScript. Here are some best practices:

## Type Definitions

Always define proper types for your functions and variables:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function createUser(userData: Omit<User, 'id'>): User {
  return {
    id: generateId(),
    ...userData,
  };
}
\`\`\`

## Error Handling

Use proper error handling with typed errors:

\`\`\`typescript
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
\`\`\`

## Conclusion

Following these practices will make your TypeScript code more maintainable and less error-prone.`,
				category: 'Programming',
				tags: ['TypeScript', 'JavaScript', 'Programming', 'Best Practices'],
				isPublished: true,
				authorId: createdUsers[1]?.id,
			},
			{
				title: 'Database Design with TypeORM',
				slug: 'database-design-with-typeorm',
				excerpt: 'Learn how to design and implement databases using TypeORM',
				content: `# Database Design with TypeORM

TypeORM is a powerful Object-Relational Mapping (ORM) library for TypeScript and JavaScript. Here's how to get started:

## Entity Definition

Define your entities using decorators:

\`\`\`typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @CreateDateColumn()
  createdAt: Date;
}
\`\`\`

## Relationships

Define relationships between entities:

\`\`\`typescript
@OneToMany(() => BlogPost, (blogPost) => blogPost.author)
blogPosts: BlogPost[];
\`\`\`

## Conclusion

TypeORM makes database operations much easier and more type-safe.`,
				category: 'Database',
				tags: ['TypeORM', 'Database', 'PostgreSQL', 'TypeScript'],
				isPublished: true,
				authorId: createdUsers[2]?.id,
			},
		];

		for (const blogPostData of blogPosts) {
			try {
				if (blogPostData.authorId) {
					const existingBlogPost = await blogPostService.getBlogPostBySlug(blogPostData.slug);
					if (!existingBlogPost) {
						const blogPost = await blogPostService.createBlogPost(blogPostData);
						console.log(`✅ Created blog post: ${blogPost.title}`);
					} else {
						console.log(`ℹ️  Blog post already exists: ${blogPostData.title}`);
					}
				}
			} catch (error) {
				console.error(`❌ Error creating blog post ${blogPostData.title}:`, error);
			}
		}

		console.log('🎉 Database seeding completed successfully!');
	} catch (error) {
		console.error('❌ Error during database seeding:', error);
		throw error;
	}
}

// Run seeding if this file is executed directly
if (require.main === module) {
	seedDatabase()
		.then(() => {
			console.log('Seeding completed');
			process.exit(0);
		})
		.catch((error) => {
			console.error('Seeding failed:', error);
			process.exit(1);
		});
}
