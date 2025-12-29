# xink-ivy-english-fe (React + Vite + Tailwind)

Landing page giới thiệu trung tâm tiếng Anh Ivy English center, xây dựng bằng React (Vite) và Tailwind CSS. Dự án tập trung vào hiệu năng, đa ngôn ngữ và dễ tuỳ biến giao diện.

## 🚀 Chạy dự án

Yêu cầu: Node.js 18+ (khuyến nghị LTS), npm 9+

```bash
# Cài đặt phụ thuộc
npm install

# Chạy môi trường phát triển (http://localhost:5173)
npm run dev

# Build sản phẩm (tạo thư mục dist/)
npm run build

# (Tuỳ chọn) Preview bản build
npm run preview
```

## 🗂️ Cấu trúc chính

```
src/
	App.jsx                 # Router, trỏ về trang Landing
	main.jsx                # Entry Vite + BrowserRouter
	pages/
		LangdingPage.jsx      # Trang landing tổng hợp các section
		landing/              # Các section: Header, Hero, Features, Pricing, FAQ, CTA, Contact, Footer
	components/
		LanguageSwitcher.jsx  # Chuyển đổi ngôn ngữ
		LoginForm.jsx         # Modal đăng nhập (nếu dùng)
	contexts/
		AuthContext.jsx
		LanguageContext.jsx   # Ngữ cảnh đa ngôn ngữ
	hooks/
		useScrollReveal.js    # Animation xuất hiện
	styles/
		langdingpage.css      # CSS cho landing (biến màu, hiệu ứng)
		tailwind.css
		legacy.css
		tokens.css
	translations/
		vi.js, en.js, ...     # Nội dung dịch; trỏ bằng getTranslation()
```

## 🌐 Đa ngôn ngữ (i18n)

- File dịch nằm trong `src/translations/` (vi, en, ko, ja, zh).
- Sử dụng `LanguageContext` + `LanguageSwitcher` để đổi ngôn ngữ.
- Quy ước key đã được sắp xếp theo thứ tự hiển thị của landing (từ trên xuống dưới) để dễ bảo trì.

## 🎨 Tuỳ biến giao diện

- Màu thương hiệu (brand) cấu hình trong `tailwind.config.js` và biến CSS tại `styles/langdingpage.css`.
- Các gradient/nhấn màu dùng biến brand (tránh hard-code) để đổi theme nhanh chóng.

## ✉️ Form liên hệ

- Endpoint gửi form được cấu hình trong `src/pages/LangdingPage.jsx` (axios POST).
- Nếu cần thay đổi API, chỉnh URL trong file này và kiểm thử lại.

## 🐳 (Tuỳ chọn) Deploy bằng Docker

Repo có sẵn `Dockerfile`, `DockerfileProd` và `nginx.conf` để deploy tĩnh.

Quy trình tham khảo:

1. Build ứng dụng: `npm run build`
2. Build image từ `DockerfileProd`
3. Chạy container Nginx phục vụ thư mục `dist/`

## ⚙️ Scripts npm

- `dev`: chạy Vite dev server
- `build`: build production
- `preview`: xem trước bản build

## 🧰 Troubleshooting nhanh

- Port mặc định: 5173 (Vite). Nếu bận, Vite sẽ tự chọn port khác và in ra terminal.
- Nếu thay đổi Tailwind config, cần restart dev server để áp dụng đầy đủ.
- Kiểm tra console nếu form liên hệ không hoạt động (CORS/URL/API).

---

Made by XinK AI — Landing page tối ưu hiệu năng, gọn nhẹ và dễ mở rộng.
