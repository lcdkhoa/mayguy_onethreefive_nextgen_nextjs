# Database Setup Guide

Hướng dẫn thiết lập và sử dụng database với TypeORM và PostgreSQL trên Supabase.

## Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc của dự án với nội dung:

```env
# Database Configuration
DATABASE_HOST=db.kirhckovjshhmtwzqodl.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Lưu ý**: Thay `your_password_here` bằng password thực tế của database Supabase.

## Cài đặt Dependencies

Các package đã được cài đặt:

```bash
npm install typeorm pg @types/pg tsx
```

## Cấu trúc Database

### Entities

1. **User** - Quản lý thông tin người dùng
   - `id`: UUID (Primary Key)
   - `email`: Email duy nhất
   - `username`: Tên người dùng
   - `firstName`, `lastName`: Tên và họ
   - `bio`: Tiểu sử
   - `isActive`: Trạng thái hoạt động
   - `createdAt`, `updatedAt`: Timestamps

2. **BlogPost** - Quản lý bài viết blog
   - `id`: UUID (Primary Key)
   - `title`: Tiêu đề bài viết
   - `slug`: URL slug
   - `excerpt`: Tóm tắt
   - `content`: Nội dung chính
   - `category`: Danh mục
   - `tags`: Mảng các tag
   - `isPublished`: Trạng thái xuất bản
   - `viewCount`, `likeCount`: Số lượt xem và like
   - `authorId`: ID tác giả (Foreign Key)

### Relationships

- `User` has many `BlogPost` (One-to-Many)
- `BlogPost` belongs to `User` (Many-to-One)

## API Endpoints

### Users API

- `GET /api/users` - Lấy danh sách tất cả users
- `GET /api/users?active=true` - Lấy danh sách users đang hoạt động
- `POST /api/users` - Tạo user mới
- `GET /api/users/[id]` - Lấy thông tin user theo ID
- `PUT /api/users/[id]` - Cập nhật user
- `DELETE /api/users/[id]` - Xóa user

### Blog Posts API

- `GET /api/blog-posts` - Lấy danh sách tất cả blog posts
- `GET /api/blog-posts?published=true` - Lấy danh sách blog posts đã xuất bản
- `GET /api/blog-posts?category=Web Development` - Lấy blog posts theo danh mục
- `GET /api/blog-posts?authorId=uuid` - Lấy blog posts theo tác giả
- `GET /api/blog-posts?search=keyword` - Tìm kiếm blog posts
- `POST /api/blog-posts` - Tạo blog post mới
- `GET /api/blog-posts/[id]` - Lấy thông tin blog post theo ID
- `PUT /api/blog-posts/[id]` - Cập nhật blog post
- `DELETE /api/blog-posts/[id]` - Xóa blog post

## Demo Page

Truy cập `/database-demo` để xem demo database connection và CRUD operations.

## Services

### UserService

Các method chính:
- `createUser(userData)` - Tạo user mới
- `getUserById(id)` - Lấy user theo ID
- `getUserByEmail(email)` - Lấy user theo email
- `getAllUsers()` - Lấy tất cả users
- `updateUser(id, userData)` - Cập nhật user
- `deleteUser(id)` - Xóa user
- `getActiveUsers()` - Lấy users đang hoạt động

### BlogPostService

Các method chính:
- `createBlogPost(blogPostData)` - Tạo blog post mới
- `getBlogPostById(id)` - Lấy blog post theo ID
- `getBlogPostBySlug(slug)` - Lấy blog post theo slug
- `getAllBlogPosts()` - Lấy tất cả blog posts
- `getPublishedBlogPosts()` - Lấy blog posts đã xuất bản
- `getBlogPostsByAuthor(authorId)` - Lấy blog posts theo tác giả
- `getBlogPostsByCategory(category)` - Lấy blog posts theo danh mục
- `searchBlogPosts(searchTerm)` - Tìm kiếm blog posts
- `updateBlogPost(id, blogPostData)` - Cập nhật blog post
- `deleteBlogPost(id)` - Xóa blog post
- `incrementViewCount(id)` - Tăng số lượt xem
- `incrementLikeCount(id)` - Tăng số lượt like
- `publishBlogPost(id)` - Xuất bản blog post
- `unpublishBlogPost(id)` - Hủy xuất bản blog post

## Lưu ý

1. Database sẽ tự động tạo tables khi chạy lần đầu (synchronize: true trong development)
2. SSL được cấu hình để kết nối với Supabase
3. Tất cả timestamps được tự động quản lý
4. UUID được sử dụng làm Primary Key
5. Relationships được cấu hình với proper foreign keys
