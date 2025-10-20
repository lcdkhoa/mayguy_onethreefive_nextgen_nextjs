# CITD Codes Database Setup

## Tổng quan

Hệ thống đã được cập nhật để sử dụng PostgreSQL database (thông qua Supabase) để lưu trữ các mã CITD đã xử lý thay vì SQLite hoặc environment variable `CURRENT_CITD_CODE`.

## Cấu trúc Database

### Entity: CitdCode
- `id`: UUID primary key
- `code`: Mã học phần (unique)
- `name`: Tên học phần
- `credits`: Số tín chỉ
- `average`: Điểm trung bình
- `createdAt`: Thời gian tạo
- `updatedAt`: Thời gian cập nhật

## Environment Variables

Thêm các biến môi trường sau vào file `.env`:

```env
# PostgreSQL Database Configuration (Supabase)
DATABASE_URL=postgresql://username:password@host:port/database
DATABASE_LOGGING=false
```

## API Endpoints

### 1. Cron Job - Tự động kiểm tra điểm mới
```
POST /api/cron/citd-scores
```

**Chức năng:**
- Lấy danh sách điểm từ CITD
- So sánh với database để tìm điểm mới
- Gửi email thông báo nếu có điểm mới
- Lưu các mã mới vào database

**Response:**
```json
{
  "success": true,
  "totalScores": 25,
  "newScores": 3,
  "storedCodes": 22
}
```

### 2. Quản lý CITD Codes
```
GET /api/citd-codes
```

**Chức năng:** Lấy danh sách tất cả mã đã lưu

**Response:**
```json
{
  "success": true,
  "codes": ["CS101", "CS102", "CS103"],
  "count": 3
}
```

```
DELETE /api/citd-codes
```

**Chức năng:** Xóa tất cả mã đã lưu (dùng cho testing)

**Response:**
```json
{
  "success": true,
  "message": "All CITD codes cleared successfully"
}
```

## Service: CitdCodeService

### Các phương thức chính:

- `getAllCodes()`: Lấy danh sách tất cả mã
- `codeExists(code)`: Kiểm tra mã có tồn tại không
- `saveCodes(scores)`: Lưu danh sách điểm mới
- `getNewScores(allScores)`: Lọc ra các điểm chưa có trong DB
- `clearAllCodes()`: Xóa tất cả mã
- `getCodeCount()`: Đếm số mã đã lưu

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Database sẽ tự động tạo khi chạy lần đầu (development mode)

3. Table `citd_codes` sẽ được tạo trong PostgreSQL database

## Lợi ích

1. **Cloud Storage**: Dữ liệu được lưu trữ trên Supabase cloud
2. **Scalable**: Có thể lưu trữ nhiều thông tin hơn (tên, tín chỉ, điểm)
3. **Queryable**: Có thể truy vấn và phân tích dữ liệu
4. **Reliable**: Không phụ thuộc vào environment variables
5. **Audit Trail**: Có timestamp để theo dõi lịch sử
6. **Vercel Compatible**: Hoạt động tốt với Vercel deployment

## Migration từ Environment Variable

Nếu bạn đã có dữ liệu trong `CURRENT_CITD_CODE`, có thể migrate bằng cách:

1. Lấy danh sách mã từ environment variable
2. Sử dụng API để lưu vào database
3. Xóa environment variable sau khi đã migrate xong
