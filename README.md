# 🌡 Ứng dụng Chuyển Đổi Nhiệt Độ

Ứng dụng này cho phép chuyển đổi nhiệt độ từ độ C sang độ F, hiển thị thông báo cục bộ, chia sẻ kết quả và lấy vị trí người dùng.

## 📌 Yêu cầu
- Node.js >= 14
- NPM hoặc Yarn
- Capacitor CLI
- Android Studio (nếu chạy trên Android)
- Xcode (nếu chạy trên iOS)

## 🚀 Cách chạy ứng dụng

### 1️⃣ Cài đặt các phụ thuộc
```sh
npm install
```

### 2️⃣ Thêm nền tảng Android/iOS
```sh
npx cap add android  # Thêm Android
npx cap add ios      # Thêm iOS (Chạy trên macOS)
```

### 3️⃣ Build ứng dụng
```sh
npm run build
npx cap sync
```

### 4️⃣ Chạy trên thiết bị hoặc giả lập
#### 👉 Android
```sh
npx cap open android
```
(Mở Android Studio, chạy ứng dụng trên máy thật hoặc giả lập)

#### 👉 iOS
```sh
npx cap open ios
```
(Mở Xcode, chạy ứng dụng trên iPhone thật hoặc giả lập)

## 📱 Tính năng chính
- 🔄 Chuyển đổi nhiệt độ từ °C sang °F
- 📤 Chia sẻ kết quả với bạn bè
- 🔔 Hiển thị thông báo sau khi chuyển đổi
- 📍 Lấy vị trí hiện tại của người dùng

## ❓ Ghi chú
- Nếu không thấy thông báo, hãy kiểm tra cài đặt quyền thông báo trên điện thoại.
- Nếu không lấy được vị trí, hãy cấp quyền truy cập GPS.

📌 **Liên hệ**: Nếu gặp vấn đề khi chạy ứng dụng, hãy mở issue hoặc liên hệ! 🚀