# GeminiShop 🛍️

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)

GeminiShop là một dự án website thương mại điện tử đơn giản, được xây dựng hoàn toàn bằng HTML, CSS và JavaScript thuần (vanilla JS). Dự án mô phỏng một cửa hàng quần áo trực tuyến với đầy đủ các tính năng cơ bản từ xem sản phẩm, quản lý giỏ hàng đến đặt hàng, tích hợp lưu trữ đơn hàng trên Google Sheet.

## ✨ Tính Năng Nổi Bật

- **Giao diện Sáng/Tối:** Tự động chuyển đổi giao diện theo sở thích người dùng.
- **Thiết kế Responsive:** Tương thích tốt trên cả máy tính và thiết bị di động.
- **Quản lý Sản phẩm:**
  - Hiển thị danh sách sản phẩm.
  - Lọc sản phẩm theo danh mục (Áo, Quần, Váy).
  - Tìm kiếm sản phẩm theo tên.
  - Phân trang cho danh sách sản phẩm.
- **Giỏ hàng động:**
  - Thêm sản phẩm vào giỏ hàng với hiệu ứng "bay" mượt mà.
  - Thay đổi số lượng, size sản phẩm ngay trong giỏ hàng.
  - Xóa từng sản phẩm hoặc xóa toàn bộ giỏ hàng.
  - Dữ liệu giỏ hàng được lưu lại trên trình duyệt (`localStorage`).
- **Quy trình Thanh toán:**
  - Form nhập thông tin khách hàng với xác thực số điện thoại.
  - Tự động tính toán tổng tiền dựa trên sản phẩm và phí vận chuyển.
- **Tích hợp Backend (miễn phí):**
  - Sử dụng **Google Apps Script** để tự động lưu thông tin đơn hàng vào Google Sheet.
  - Tự động gửi email HTML xác nhận đơn hàng cho khách.

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** HTML5, CSS3, JavaScript (ES6+).
- **Backend (Order Processing):** Google Apps Script.
- **Lưu trữ phía Client:** `localStorage` để lưu giỏ hàng và giao diện đã chọn.

## 📂 Cấu Trúc Thư Mục

```
webGemini/
├── css/
│   └── style.css         # File CSS chính cho toàn bộ trang web
├── js/
│   └── script.js         # File JavaScript chứa toàn bộ logic
├── about.html            # Trang giới thiệu
├── cart.html             # Trang giỏ hàng
├── checkout.html         # Trang thanh toán
├── contact.html          # Trang liên hệ
├── faq.html              # Trang câu hỏi thường gặp
├── how-to-buy.html       # Trang hướng dẫn mua hàng
├── index.html            # Trang chủ
├── order-success.html    # Trang thông báo đặt hàng thành công
├── policy.html           # Trang chính sách
├── product-detail.html   # Trang chi tiết sản phẩm
├── products.html         # Trang danh sách tất cả sản phẩm
└── shipping-methods.html # Trang phương thức vận chuyển
```

## 🚀 Hướng Dẫn Cài Đặt và Chạy Dự Án

Để chạy dự án này trên máy của bạn, hãy làm theo các bước sau:

### Bước 1: Tải mã nguồn

Tải và giải nén toàn bộ thư mục dự án vào một vị trí trên máy tính của bạn.

### Bước 2: Cài đặt Backend với Google Apps Script

Đây là bước quan trọng để chức năng đặt hàng hoạt động.

1.  **Tạo Google Sheet:** Truy cập sheets.new để tạo một bảng tính mới và đặt tên cho nó (ví dụ: "Đơn Hàng GeminiShop").
2.  **Tạo các cột:** Tại trang tính đầu tiên, tạo các cột tiêu đề sau ở hàng 1: `Mã Đơn Hàng`, `Ngày Đặt`, `Tên Khách Hàng`, `Email`, `Số Điện Thoại`, `Địa Chỉ`, `Ghi Chú`, `Sản Phẩm`, `Tạm Tính`, `Phí Vận Chuyển`, `Tổng Cộng`, `Tình Trạng`.
3.  **Mở Apps Script:** Vào menu **Tiện ích mở rộng (Extensions) > Apps Script**.
4.  **Dán mã kịch bản:** Xóa mã mặc định và dán mã kịch bản dùng để xử lý đơn hàng (có thể tìm thấy trong các cuộc trò chuyện trước đó hoặc yêu cầu lại).
5.  **Triển khai:**
    - Nhấn **Triển khai (Deploy) > Lần triển khai mới (New deployment)**.
    - Chọn loại là **Ứng dụng web (Web app)**.
    - Trong phần **Ai có quyền truy cập (Who has access)**, chọn **Bất kỳ ai (Anyone)**.
    - Nhấn **Triển khai (Deploy)** và cấp quyền cho kịch bản.
    - **Sao chép URL ứng dụng web** sau khi triển khai thành công.

### Bước 3: Cấu hình tệp JavaScript

1.  Mở tệp `js/script.js`.
2.  Tìm đến dòng `const SCRIPT_URL = "..."`.
3.  Dán **URL ứng dụng web** bạn đã sao chép ở Bước 2 vào trong dấu ngoặc kép.

### Bước 4: Chạy trang web

Mở tệp `index.html` bằng trình duyệt của bạn. Để có trải nghiệm tốt nhất và tránh các lỗi liên quan đến CORS, bạn nên sử dụng một máy chủ ảo cục bộ. Tiện ích **Live Server** trên Visual Studio Code là một lựa chọn tuyệt vời.

---

## ❓ FAQ - Câu Hỏi Thường Gặp

**1. Làm thế nào để thêm/sửa/xóa sản phẩm?**

> Toàn bộ danh sách sản phẩm được lưu trữ trong một mảng tên là `allProducts` ở đầu tệp `js/script.js`. Bạn có thể chỉnh sửa trực tiếp mảng này để quản lý sản phẩm.

**2. Tại sao chức năng đặt hàng không hoạt động?**

> Có một vài lý do phổ biến:
> - Bạn chưa dán đúng URL của Google Apps Script vào tệp `js/script.js`.
> - Khi triển khai Apps Script, bạn chưa chọn quyền truy cập là "Bất kỳ ai (Anyone)".
> - Bạn đã thay đổi mã Apps Script nhưng chưa **triển khai lại phiên bản mới**.

**3. Tôi có thể sử dụng trang web này cho mục đích thương mại không?**

> Dự án này được thiết kế chủ yếu cho mục đích học tập và làm portfolio. Việc sử dụng Google Sheet làm cơ sở dữ liệu có những giới hạn về hiệu suất và số lượng yêu cầu mỗi ngày từ Google. Đối với một cửa hàng có quy mô nhỏ, nó có thể hoạt động tốt. Tuy nhiên, với quy mô lớn hơn, bạn nên cân nhắc xây dựng một hệ thống backend chuyên dụng.
