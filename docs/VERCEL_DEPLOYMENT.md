# Hướng dẫn Deploy lên Vercel

## Vấn đề đã được giải quyết

✅ **SQLite không tương thích với Vercel** - Đã chuyển đổi hoàn toàn sang PostgreSQL
✅ **Database connection** - Sử dụng Supabase PostgreSQL
✅ **Dependencies** - Loại bỏ sqlite3, chỉ giữ lại pg và typeorm

## Cấu hình Environment Variables trên Vercel

Thêm các biến môi trường sau trong Vercel Dashboard:

```env
# PostgreSQL Database (Supabase)
DATABASE_URL=postgresql://username:password@host:port/database

# Optional
DATABASE_LOGGING=false
NODE_ENV=production
```

## Các bước Deploy

### 1. Chuẩn bị Database
- Đảm bảo Supabase project đang hoạt động
- Copy connection string từ Supabase Dashboard
- Test connection string trong development

### 2. Deploy lên Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Hoặc push code lên GitHub và connect với Vercel
```

### 3. Cấu hình Environment Variables
- Vào Vercel Dashboard → Project → Settings → Environment Variables
- Thêm `DATABASE_URL` với connection string từ Supabase
- Set cho tất cả environments (Production, Preview, Development)

### 4. Test API Endpoints
Sau khi deploy, test các endpoints:

```bash
# Test CITD codes API
curl https://your-app.vercel.app/api/citd-codes

# Test scores API
curl https://your-app.vercel.app/api/scores

# Test cron job (nếu có)
curl -X POST https://your-app.vercel.app/api/cron/citd-scores
```

## Troubleshooting

### Lỗi Database Connection
- Kiểm tra `DATABASE_URL` có đúng format không
- Đảm bảo Supabase project không bị pause
- Kiểm tra SSL settings trong Supabase

### Lỗi Build
- Kiểm tra TypeScript errors: `npm run lint`
- Đảm bảo tất cả imports đúng
- Kiểm tra dependencies trong package.json

### Lỗi Runtime
- Kiểm tra Vercel Function logs
- Đảm bảo environment variables được set đúng
- Test API endpoints từng cái một

## Database Schema

Table `citd_codes` sẽ được tự động tạo với schema:

```sql
CREATE TABLE citd_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255),
  credits DECIMAL(5,2),
  average DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Monitoring

- Sử dụng Vercel Analytics để monitor performance
- Kiểm tra Function logs trong Vercel Dashboard
- Monitor Supabase database usage và performance

## Kết luận

Sau khi migrate từ SQLite sang PostgreSQL, ứng dụng sẽ hoạt động tốt trên Vercel với:
- ✅ Persistent database storage
- ✅ Scalable cloud infrastructure  
- ✅ Serverless function compatibility
- ✅ Real-time data synchronization
