# Environment Variables Setup

## Vấn đề hiện tại
Các biến môi trường database đang trả về `undefined` vì thiếu file cấu hình môi trường.

## Giải pháp

### 1. Tạo file `.env.local` trong thư mục gốc của project:

```bash
# Database Configuration
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password_here
DATABASE_NAME=your_database_name
DATABASE_LOGGING=true

# Next.js Environment
NODE_ENV=development
```

### 2. Cập nhật các giá trị phù hợp với database của bạn:

- `DATABASE_HOST`: Địa chỉ host của database (thường là `localhost` hoặc IP của server)
- `DATABASE_PORT`: Port của database (PostgreSQL mặc định là `5432`)
- `DATABASE_USER`: Tên user database
- `DATABASE_PASSWORD`: Mật khẩu database
- `DATABASE_NAME`: Tên database
- `DATABASE_LOGGING`: `true` để bật logging, `false` để tắt

### 3. Khởi động lại development server:

```bash
npm run dev
```

## Lưu ý quan trọng

- File `.env.local` sẽ được Next.js tự động load
- Không commit file `.env.local` vào git (đã có trong .gitignore)
- Để chia sẻ cấu hình với team, tạo file `.env.example` với các giá trị mẫu
- Các biến môi trường sẽ được log ra console để debug

## Kiểm tra

Sau khi tạo file `.env.local` và khởi động lại server, bạn sẽ thấy các biến môi trường được log ra console thay vì `undefined`.
