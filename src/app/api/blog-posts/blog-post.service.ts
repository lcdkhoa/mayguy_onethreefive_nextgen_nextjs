import { BlogPost } from '@/app/api/blog-posts/blog-posts.entity';
import { DataSource, Repository } from 'typeorm';

export class BlogPostService {
	private blogPostRepository: Repository<BlogPost>;

	constructor(dataSource: DataSource) {
		this.blogPostRepository = dataSource.getRepository(BlogPost);
	}

	// Create a new blog post
	async createBlogPost(blogPostData: Partial<BlogPost>): Promise<BlogPost> {
		const blogPost = this.blogPostRepository.create(blogPostData);
		return await this.blogPostRepository.save(blogPost);
	}

	// Get blog post by ID
	async getBlogPostById(id: string): Promise<BlogPost | null> {
		return await this.blogPostRepository.findOne({
			where: { id },
			relations: ['author'],
		});
	}

	// Get blog post by slug
	async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
		return await this.blogPostRepository.findOne({
			where: { slug },
			relations: ['author'],
		});
	}

	// Get all blog posts
	async getAllBlogPosts(): Promise<BlogPost[]> {
		return await this.blogPostRepository.find({
			order: { createdAt: 'DESC' },
		});
	}

	// Get published blog posts
	async getPublishedBlogPosts(): Promise<BlogPost[]> {
		return await this.blogPostRepository.find({
			where: { isPublished: true },
			order: { publishedAt: 'DESC' },
		});
	}

	// Get blog posts by author
	async getBlogPostsByAuthor(authorId: string): Promise<BlogPost[]> {
		return await this.blogPostRepository.find({
			where: { authorId },
			order: { createdAt: 'DESC' },
		});
	}

	// Get blog posts by category
	async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
		return await this.blogPostRepository.find({
			where: { category },
			order: { createdAt: 'DESC' },
		});
	}

	// Search blog posts
	async searchBlogPosts(searchTerm: string): Promise<BlogPost[]> {
		return await this.blogPostRepository
			.createQueryBuilder('blogPost')
			.leftJoinAndSelect('blogPost.author', 'author')
			.where(
				'blogPost.title ILIKE :searchTerm OR blogPost.content ILIKE :searchTerm OR blogPost.excerpt ILIKE :searchTerm',
				{ searchTerm: `%${searchTerm}%` }
			)
			.orderBy('blogPost.createdAt', 'DESC')
			.getMany();
	}

	// Update blog post
	async updateBlogPost(id: string, blogPostData: Partial<BlogPost>): Promise<BlogPost | null> {
		await this.blogPostRepository.update(id, blogPostData);
		return await this.getBlogPostById(id);
	}

	// Delete blog post
	async deleteBlogPost(id: string): Promise<boolean> {
		const result = await this.blogPostRepository.delete(id);
		return result.affected !== 0;
	}

	// Increment view count
	async incrementViewCount(id: string): Promise<void> {
		await this.blogPostRepository.increment({ id }, 'viewCount', 1);
	}

	// Increment like count
	async incrementLikeCount(id: string): Promise<void> {
		await this.blogPostRepository.increment({ id }, 'likeCount', 1);
	}

	// Publish blog post
	async publishBlogPost(id: string): Promise<BlogPost | null> {
		await this.blogPostRepository.update(id, {
			isPublished: true,
			publishedAt: new Date(),
		});
		return await this.getBlogPostById(id);
	}

	// Unpublish blog post
	async unpublishBlogPost(id: string): Promise<BlogPost | null> {
		await this.blogPostRepository.update(id, {
			isPublished: false,
			publishedAt: undefined,
		});
		return await this.getBlogPostById(id);
	}
}
