# TU TIÊN KỲ – Tách giao diện và tích hợp tài khoản

## Yêu cầu
- Node.js 20 trở lên
- npm

## Chạy local
1. Giải nén thư mục dự án.
2. Mở terminal tại thư mục này.
3. Cài thư viện: `npm install`
4. Đặt secret phiên đăng nhập:
   - Windows PowerShell: `$env:SESSION_SECRET="chuoi-bi-mat-dai-va-ngau-nhien"`
   - macOS/Linux: `export SESSION_SECRET="chuoi-bi-mat-dai-va-ngau-nhien"`
5. Chạy: `npm start`
6. Mở `http://localhost:3000`

SQLite tự tạo tại `data/tutien.sqlite`; bảng được khởi tạo từ `schema.sql`.
Tài khoản đăng ký mới được lưu bằng bcrypt hash, không lưu mật khẩu thô.
Mỗi tài khoản có một bản lưu nhân vật riêng, tự đồng bộ khoảng mỗi 15 giây.

## Cấu trúc
- `index.html`: giao diện
- `style.css`: CSS được tách từ file gốc
- `game.js`: logic game được tách từ file gốc, tích hợp API lưu/tải
- `server.js`: API đăng ký, đăng nhập, lưu và tải nhân vật
- `schema.sql`: cấu trúc SQLite
- `package.json`: dependencies và lệnh chạy

## Lưu ý triển khai Internet
- Bắt buộc đặt `SESSION_SECRET` mạnh, duy nhất.
- Bật HTTPS khi chạy production (cookie secure được bật khi `NODE_ENV=production`).
- Nên dùng reverse proxy HTTPS, giới hạn tốc độ đăng nhập, sao lưu thư mục `data/`.
- Đây là bản tích hợp nền tảng cho game hiện tại. Các quyền ADMIN và luật gameplay hiện vẫn nằm ở client; không được xem là chống gian lận cho game PvP/kinh tế nhiều người. Muốn vận hành multiplayer công bằng, cần chuyển thao tác quan trọng (giao dịch, đấu giá, PvP, vật phẩm, admin) sang xác thực và xử lý phía server.
- Chức năng "Quên mật khẩu" trong giao diện gốc chỉ có mã bảo mật, chưa có luồng đặt mật khẩu mới an toàn; bản này thông báo cần cấu hình riêng thay vì giả vờ khôi phục mật khẩu.

## Trang ADMIN quản lý tài khoản

1. Sao chép `.env.example` thành `.env` trong thư mục dự án.
2. Mở `.env` bằng Notepad và tự đặt `ADMIN_USERNAME`, `ADMIN_PASSWORD` (mật khẩu ADMIN tối thiểu 12 ký tự) cùng `SESSION_SECRET` dài/ngẫu nhiên. Không chia sẻ file `.env`.
3. Cài thư viện (sau khi cập nhật dự án): `npm install`.
4. Chạy máy chủ: `npm start`.
5. Mở `http://localhost:3000`, đăng nhập bằng tài khoản ADMIN đã cấu hình.
6. Mở `http://localhost:3000/admin.html` để quản lý người chơi.

Nếu đã có database cũ, máy chủ tự thêm cột quyền ADMIN và trạng thái khóa khi khởi động, không xóa tài khoản/dữ liệu hiện có. Tài khoản ADMIN có sẵn trùng `ADMIN_USERNAME` sẽ được nâng quyền. Trang quản trị hỗ trợ xem danh sách, tìm kiếm, khóa/mở khóa, đặt lại mật khẩu và xóa tài khoản người chơi. Tài khoản ADMIN không thể bị khóa/xóa qua trang này.

Lưu ý: đổi mật khẩu người chơi là thao tác không thể hoàn tác; hãy gửi mật khẩu mới cho người chơi qua kênh riêng. Bản này là công cụ quản trị cơ bản cho server riêng; trước khi mở Internet cần bổ sung HTTPS, giới hạn tốc độ đăng nhập, sao lưu DB và quy trình phục hồi tài khoản.
