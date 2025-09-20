# Production Environment Setup

## Vấn đề hiện tại
Lỗi `ENOTFOUND db.kirhckovjshhmtwzqodl.supabase.co` xảy ra trong production do cấu hình database connection không đúng.

## Giải pháp

### 1. Cấu hình Environment Variables cho Production

Tạo file `.env.production` hoặc cấu hình trong hosting platform (Vercel, Netlify, etc.):

```bash
# Database Configuration
DATABASE_TYPE=postgres
DATABASE_HOST=db.kirhckovjshhmtwzqodl.supabase.co
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_supabase_password_here
DATABASE_NAME=postgres
DATABASE_LOGGING=false

# SSL Configuration for Supabase
DATABASE_SSL_CERT=your_ssl_certificate_here

# Next.js Environment
NODE_ENV=production
```

### 2. Cấu hình Supabase Connection String (Khuyến nghị)

Thay vì sử dụng các biến riêng lẻ, sử dụng connection string:

```bash
# Supabase Connection String
DATABASE_URL=postgresql://postgres:your_password@db.kirhckovjshhmtwzqodl.supabase.co:5432/postgres?sslmode=require

# Next.js Environment
NODE_ENV=production
```

### 3. Cập nhật data-source.ts để hỗ trợ connection string

```typescript
import { BlogPost } from '@/app/api/blog-posts/blog-posts.entity';
import { User } from '@/app/api/users/users.entity';
import { DataSource } from 'typeorm';

// Database configuration
export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL || undefined,
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT || '5432'),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
	entities: [User, BlogPost],
	migrations: ['src/migrations/*.ts'],
	subscribers: ['src/subscribers/*.ts'],
	ssl: process.env.NODE_ENV === 'production' ? {
		rejectUnauthorized: false,
	} : false,
});
```

### 4. Kiểm tra Supabase Settings

1. Vào Supabase Dashboard
2. Chọn project của bạn
3. Vào Settings > Database
4. Copy connection string từ "Connection string" section
5. Sử dụng connection string này làm `DATABASE_URL`

### 5. Các bước khắc phục lỗi

1. **Kiểm tra DNS resolution**: Đảm bảo hostname `db.kirhckovjshhmtwzqodl.supabase.co` có thể resolve được
2. **Kiểm tra SSL**: Supabase yêu cầu SSL connection
3. **Kiểm tra credentials**: Đảm bảo username/password đúng
4. **Kiểm tra network**: Đảm bảo hosting platform có thể kết nối đến Supabase

### 6. Debug Steps

1. Thêm logging để xem cấu hình database
2. Kiểm tra logs trong production
3. Test connection từ local với production credentials
4. Sử dụng Supabase client thay vì direct PostgreSQL connection

## Lưu ý quan trọng

- Không commit file `.env.production` vào git
- Sử dụng environment variables trong hosting platform
- Test connection trước khi deploy
- Có backup plan nếu connection string không hoạt động
