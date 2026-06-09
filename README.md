# 📚 CMC University - Graduation Thesis Frontend (CMC-DATN-FE)

Dự án **CMC-DATN-FE** là phân hệ Frontend của hệ thống **Giám sát giảng dạy, tương tác học tập và điểm danh thông minh sử dụng công nghệ AI Camera** phục vụ cho khóa luận tốt nghiệp tại **Đại học CMC (CMC University)**. 

Hệ thống được phát triển nhằm mục đích tự động hóa việc theo dõi chuyên cần của sinh viên, đo lường sự tương tác, độ tập trung trong lớp học của cả giảng viên và sinh viên, đồng thời cung cấp các báo cáo hiệu suất giảng dạy theo thời gian thực dựa trên các dữ liệu thu được từ hệ thống Camera AI (mô phỏng mô hình YOLOv8-Classroom).

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

Hệ thống được thiết kế theo các tiêu chuẩn lập trình hiện đại, sử dụng các công nghệ tối ưu cho hiệu năng và trải nghiệm người dùng:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) làm nền tảng ứng dụng.
- **Thư viện Core**: [React 19](https://react.dev/) tối ưu hiệu năng render và hooks.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) biên dịch CSS tốc độ cao, kết hợp CSS Variables và `@theme inline` định nghĩa hệ màu sắc, khoảng cách đồng bộ tại [globals.css](file:///Users/kallo/CMC-DATN-FE/src/app/globals.css).
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/) đảm bảo chặt chẽ kiểu dữ liệu, tránh lỗi runtime.
- **Icons**: Material Symbols Outlined làm thư viện biểu tượng chính cho toàn bộ hệ thống.
- **Biểu đồ**: [Recharts](https://recharts.org/) để trực quan hóa dữ liệu AI phân tích cảm xúc, chuyên cần và xu hướng tương tác.

---

## 📂 Cấu Trúc Thư Mục Dự Án (Directory Structure)

Thư mục nguồn `src/` được tổ chức khoa học để phục vụ việc bảo trì và nâng cấp lâu dài:

```text
src/
├── app/                  # Quản lý Routing, Layouts và Pages (Next.js App Router)
│   ├── login/            # Trang đăng nhập (Đăng nhập CMCU & Microsoft SSO)
│   ├── dashboard/        # Bảng điều khiển tổng quan hiệu suất toàn hệ thống
│   ├── cameras/          # Quản lý và giám sát Camera AI các phòng học trực tiếp
│   ├── schedule/         # Thời khóa biểu, Điểm danh chuyên cần và Báo cáo chi tiết tiết học
│   ├── teachers/         # Quản lý danh sách giảng viên & lịch dạy giảng viên
│   ├── notifications/    # Trung tâm quản lý thông báo, cảnh báo bất thường từ AI
│   ├── profile/          # Thông tin cá nhân người dùng
│   ├── globals.css       # File cấu hình style toàn cục & Tailwind v4 theme
│   ├── layout.tsx        # Root Layout chứa HTML/Body chung
│   └── page.tsx          # Điểm đầu vào chính (tự động chuyển hướng đến /login)
├── components/           # Các component React tái sử dụng
│   ├── common/           # Các component UI cơ bản (Button, Input, Modal, v.v.)
│   ├── layout/           # Bố cục chung: Sidebar, Header, Breadcrumbs, Profile
│   └── features/         # Component chuyên biệt theo chức năng (Dashboard, Cameras, Schedule, Teachers)
├── assets/               # Tài nguyên tĩnh (Logo CMC, hình ảnh giảng viên, v.v.)
├── types/                # Định nghĩa kiểu dữ liệu TypeScript
├── services/             # Xử lý gọi API và tích hợp máy chủ AI Backend
└── hooks/                # Custom React Hooks
```

---

## 🌟 Các Phân Hệ Chức Năng Chính

### 1. Hệ Thống Đăng Nhập (`/login`)
- **File đầu vào**: [page.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/login/page.tsx) & [LoginClient.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/login/LoginClient.tsx).
- **Tính năng**: Cho phép người dùng đăng nhập bằng tài khoản nội bộ CMCU hoặc liên kết xác thực thông qua Microsoft SSO.

### 2. Bảng Điều Khiển Tổng Quan (`/dashboard`)
- **File đầu vào**: [page.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/dashboard/page.tsx).
- **Tính năng**:
  - Cung cấp các chỉ số KPI động theo từng học kỳ: Lớp học đang hoạt động, Tổng số giảng viên, Điểm đánh giá AI trung bình, Trạng thái hoạt động của các Camera.
  - Sử dụng hệ thống biểu đồ [DashboardCharts.tsx](file:///Users/kallo/CMC-DATN-FE/src/components/features/dashboard/DashboardCharts.tsx) hiển thị:
    - Xuương tương tác (Interaction Trend).
    - Phân bố trạng thái camera trực tuyến/ngoại tuyến.
    - Điểm trung bình của từng khoa học thuật.
    - Phân tích các thành phần AI (Mức độ tập trung, Di chuyển, Tương tác giảng dạy).
  - Danh sách bảng giảng viên xuất sắc có điểm AI cao nhất trong học kỳ.
  - Cho phép xuất báo cáo tổng quan hiệu suất hệ thống.

### 3. Giám Sát Camera Phòng Học Trực Tiếp (`/cameras`)
- **File đầu vào**: [page.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/cameras/page.tsx).
- **Tính năng**:
  - Hiển thị danh sách camera giám sát tại tất cả phòng học ở các cơ sở (Tòa A, Tòa B, Tòa C, Hội trường, Thư viện).
  - Lọc và tìm kiếm camera theo ID, tên phòng và trạng thái kết nối (Trực tuyến, Ngoại tuyến, Cảnh báo).
  - Chi tiết Camera qua [CameraModal.tsx](file:///Users/kallo/CMC-DATN-FE/src/components/features/cameras/CameraModal.tsx):
    - Stream trực tiếp giả lập luồng ghi hình phòng học.
    - Vẽ khung nhận diện AI Bounding Box cho Giảng viên (màu xanh dương) và Sinh viên (màu xanh lá) theo thời gian thực.
    - Bảng số liệu phân tích chuyên cần thời gian thực: **Tổng số người hiện diện**, **Số lượng giảng viên**, **Số lượng sinh viên**.
    - Hiển thị thông tin hiệu suất camera (FPS, độ trễ latency, độ phân giải, độ tin cậy AI confidence).
    - Cảnh báo bất thường từ AI (ví dụ: Không phát hiện giảng viên đứng lớp, camera mất kết nối).

### 4. Thời Khóa Biểu & Báo Cáo Chuyên Cần AI (`/schedule`)
- **File đầu vào**: [page.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/schedule/page.tsx) & [ScheduleClient.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/schedule/ScheduleClient.tsx).
- **Tính năng**:
  - Giao diện lưới thời khóa biểu học tập phân chia theo các phòng học thông qua [ClassroomList.tsx](file:///Users/kallo/CMC-DATN-FE/src/components/features/schedule/ClassroomList.tsx) và [ScheduleGrid.tsx](file:///Users/kallo/CMC-DATN-FE/src/components/features/schedule/ScheduleGrid.tsx).
  - Hỗ trợ đổi ca học hiển thị linh hoạt: **Ca Sáng** (07:00 - 13:00) và **Ca Chiều** (13:00 - 19:00).
  - Tự động thay đổi lịch trình và phòng học theo Tuần chẵn/lẻ.
  - Tích hợp tính năng quét điểm danh AI (AI Scan) để cập nhật sĩ số lớp học trực tiếp qua camera.
  - **Báo cáo chi tiết tiết học (`/schedule/report/[id]`)**:
    - File đầu vào: [page.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/schedule/report/%5Bid%5D/page.tsx).
    - Hiển thị các chỉ số lớp học sau khi kết thúc: Tỷ lệ tập trung (Focus), Tỷ lệ tương tác (Active Participation), Sĩ số điểm danh (Attendance) và số lượng sinh viên ngủ trong lớp (Sleeping count).
    - Biểu đồ đường phân tích diễn biến bài học theo dòng thời gian.
    - Các khuyến nghị tự động từ hệ thống AI gửi đến giảng viên giúp điều chỉnh phương pháp giảng dạy phù hợp.
    - Hỗ trợ định dạng in ấn (`@media print`) cho phép giáo vụ xuất file báo cáo giấy chuẩn đẹp.

### 5. Quản Lý Giảng Viên (`/teachers`)
- **File đầu vào**: [page.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/teachers/page.tsx).
- **Tính năng**:
  - Danh sách giảng viên trực quan thông qua [TeacherGrid.tsx](file:///Users/kallo/CMC-DATN-FE/src/components/features/teachers/TeacherGrid.tsx).
  - Hồ sơ giảng viên chi tiết qua [TeacherDetail.tsx](file:///Users/kallo/CMC-DATN-FE/src/components/features/teachers/TeacherDetail.tsx):
    - Thông tin cá nhân, tiểu sử khoa học, chuyên môn giảng dạy và các thành tựu nghiên cứu khoa học đạt được.
    - Chỉ số AI đánh giá mức độ tương tác giảng dạy (Interaction Score) và trạng thái xếp hạng.
    - Thống kê mức độ hoạt động và di chuyển trong lớp bằng AI (năng động, năng nổ, đứng im).
    - Lịch giảng dạy chi tiết theo tuần của giảng viên đó ([Lịch giảng dạy giảng viên](file:///Users/kallo/CMC-DATN-FE/src/app/teachers/schedule/page.tsx) / [TeacherScheduleClient.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/teachers/schedule/TeacherScheduleClient.tsx)).

### 6. Trung Tâm Thông Báo (`/notifications`)
- **File đầu vào**: [page.tsx](file:///Users/kallo/CMC-DATN-FE/src/app/notifications/page.tsx).
- **Tính năng**:
  - Nơi nhận tất cả cảnh báo thời gian thực được đẩy về từ hệ thống AI (xao nhãng diện rộng, học sinh sử dụng điện thoại, thiết bị hỏng hóc, sao lưu thành công).
  - Phân loại thông báo rõ ràng theo: Lớp học, Thiết bị, Hệ thống.
  - Phân chia mức độ ưu tiên: Khẩn cấp (Error), Chú ý (Warning), Thành công (Success), Thông tin (Info).
  - Cho phép người dùng đánh dấu đã đọc hoặc xóa thông báo, đồng bộ dữ liệu thông qua `localStorage`.

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu cầu hệ thống
- **Node.js**: Phiên bản LTS 18.x trở lên.
- **Trình quản lý gói**: `npm` đi kèm.

### Các bước cài đặt và vận hành

1. **Clone dự án & Cài đặt các gói phụ thuộc:**
   ```bash
   npm install
   ```

2. **Khởi chạy môi trường phát triển (Development Mode):**
   ```bash
   npm run dev
   ```
   *Truy cập ứng dụng tại địa chỉ: [http://localhost:3000](http://localhost:3000).*

3. **Biên dịch mã nguồn cho môi trường production:**
   ```bash
   npm run build
   ```

4. **Khởi chạy server production sau khi build:**
   ```bash
   npm run start
   ```

5. **Kiểm tra và sửa lỗi cú pháp mã nguồn:**
   ```bash
   npm run lint
   ```

---

## 🤝 Hướng Dẫn Phát Triển (Development Guide)

Để duy trì chất lượng mã nguồn đồng nhất, lập trình viên cần tuân thủ các quy tắc sau:

- **Sử dụng TypeScript nghiêm ngặt**: Luôn định nghĩa rõ ràng kiểu dữ liệu (`Interface`, `Type`) cho Props, State và các hàm xử lý. Nghiêm cấm sử dụng kiểu `any`.
- **Thiết kế Component tái sử dụng**:
  - Các component UI chung như nút bấm, input, modal cần đặt trong [src/components/common/](file:///Users/kallo/CMC-DATN-FE/src/components/common).
  - Các component đi kèm các tính năng cụ thể đặt tương ứng trong [src/components/features/](file:///Users/kallo/CMC-DATN-FE/src/components/features).
- **Thiết kế Responsive & CSS**: Chỉ sử dụng các lớp tiện ích của Tailwind CSS v4. Đảm bảo toàn bộ giao diện tương thích tốt trên điện thoại di động (Mobile), máy tính bảng (Tablet) và máy tính để bàn (Desktop).
- **Quy chuẩn Git Commit**: Viết mô tả commit rõ ràng theo chuẩn Conventional Commits (ví dụ: `feat: add ai scanning trigger to schedule modal`, `fix: header notification alignment on mobile`).
