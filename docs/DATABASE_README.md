# Database Integration với TypeORM và PostgreSQL

## Tổng quan

Dự án đã được tích hợp hoàn chỉnh với TypeORM và PostgreSQL trên Supabase, bao gồm:

- ✅ **TypeORM** - ORM cho TypeScript/JavaScript
- ✅ **PostgreSQL** - Database trên Supabase
- ✅ **Entities** - User và BlogPost với relationships
- ✅ **Services** - UserService và BlogPostService
- ✅ **API Routes** - RESTful APIs cho CRUD operations
- ✅ **Demo Page** - Giao diện test database
- ✅ **Database Seeding** - Tạo dữ liệu mẫu

## Cấu trúc Files

```
src/
├── configs/
│   └── database.ts          # Cấu hình TypeORM DataSource
├── entities/
│   ├── User.ts             # User entity
│   ├── BlogPost.ts         # BlogPost entity
│   └── index.ts            # Export entities
├── services/
│   ├── UserService.ts      # User business logic
│   ├── BlogPostService.ts  # BlogPost business logic
│   └── index.ts            # Export services
├── app/api/
│   ├── users/
│   │   ├── route.ts        # GET, POST /api/users
│   │   └── [id]/route.ts   # GET, PUT, DELETE /api/users/[id]
│   ├── blog-posts/
│   │   ├── route.ts        # GET, POST /api/blog-posts
│   │   └── [id]/route.ts   # GET, PUT, DELETE /api/blog-posts/[id]
│   └── seed/
│       └── route.ts        # POST /api/seed
├── app/database-demo/
│   └── page.tsx            # Demo page
└── utils/
    └── database-seed.ts    # Seeding utility
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(100) UNIQUE NOT NULL,
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar VARCHAR(500),
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Blog Posts Table
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(500),
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);
```

## API Endpoints

### Users
- `GET /api/users` - Lấy danh sách users
- `GET /api/users?active=true` - Lấy users đang hoạt động
- `POST /api/users` - Tạo user mới
- `GET /api/users/[id]` - Lấy user theo ID
- `PUT /api/users/[id]` - Cập nhật user
- `DELETE /api/users/[id]` - Xóa user

### Blog Posts
- `GET /api/blog-posts` - Lấy danh sách blog posts
- `GET /api/blog-posts?published=true` - Lấy blog posts đã xuất bản
- `GET /api/blog-posts?category=Web Development` - Lấy theo danh mục
- `GET /api/blog-posts?authorId=uuid` - Lấy theo tác giả
- `GET /api/blog-posts?search=keyword` - Tìm kiếm
- `POST /api/blog-posts` - Tạo blog post mới
- `GET /api/blog-posts/[id]` - Lấy blog post theo ID
- `PUT /api/blog-posts/[id]` - Cập nhật blog post
- `DELETE /api/blog-posts/[id]` - Xóa blog post

### Seed
- `POST /api/seed` - Tạo dữ liệu mẫu

## Cách sử dụng

### 1. Cấu hình Environment
Tạo file `.env.local`:
```env
DATABASE_HOST=db.kirhckovjshhmtwzqodl.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password_here
```

### 2. Chạy dự án
```bash
npm run dev
```

### 3. Seed Database
Truy cập `http://localhost:3000/database-demo` và nhấn "Seed Database"

### 4. Test APIs
Sử dụng Postman hoặc curl để test các API endpoints.

## Scripts

```bash
# Chạy seeding database
npm run db:seed

# Tạo migration mới
npm run db:generate

# Chạy migrations
npm run db:run
```

## Features

### UserService
- Tạo, đọc, cập nhật, xóa users
- Tìm kiếm theo email
- Lọc users đang hoạt động
- Quản lý relationships với blog posts

### BlogPostService
- CRUD operations cho blog posts
- Tìm kiếm theo slug, category, author
- Tìm kiếm full-text
- Quản lý trạng thái xuất bản
- Đếm lượt xem và like

### Demo Page
- Giao diện Material-UI đẹp mắt
- Hiển thị danh sách users và blog posts
- Nút refresh data
- Nút seed database
- Error handling

## Lưu ý kỹ thuật

1. **TypeScript Configuration**: Đã cấu hình `experimentalDecorators` và `emitDecoratorMetadata`
2. **Circular Imports**: Sử dụng string references để tránh circular imports
3. **SSL**: Cấu hình SSL cho Supabase connection
4. **UUID**: Sử dụng UUID làm Primary Key
5. **Timestamps**: Tự động quản lý createdAt và updatedAt
6. **Relationships**: One-to-Many giữa User và BlogPost

## Troubleshooting

### Lỗi kết nối database
- Kiểm tra credentials trong `.env.local`
- Đảm bảo Supabase project đang hoạt động
- Kiểm tra network connection

### Lỗi TypeScript
- Chạy `npm run lint` để kiểm tra lỗi
- Đảm bảo đã cài đặt đầy đủ dependencies
- Restart TypeScript server

### Lỗi seeding
- Kiểm tra database connection
- Xem console logs để debug
- Đảm bảo tables đã được tạo

## Mở rộng

Để thêm entity mới:

1. Tạo file entity trong `src/entities/`
2. Tạo service trong `src/services/`
3. Tạo API routes trong `src/app/api/`
4. Cập nhật `src/configs/database.ts`
5. Thêm vào demo page nếu cần

## Kết luận

Hệ thống database đã được tích hợp hoàn chỉnh và sẵn sàng sử dụng. Tất cả các tính năng CRUD cơ bản đã được implement với error handling và validation phù hợp.
