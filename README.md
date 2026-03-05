# BÁO CÁO TIẾN ĐỘ CÔNG VIỆC TUẦN THỨ 4

**Dự án:** SmartHome Web Application
**Tên repository:** SmartHomeWebAppVersion2
**Trạng thái:** Đang phát triển – Chưa tích hợp AI và MQTT

---

# 1. Tổng quan công việc đã thực hiện

Trong tuần này, nhóm đã phát triển các chức năng chính của hệ thống web quản lý nhà thông minh. Hệ thống bao gồm các trang giao diện chính phục vụ việc đăng ký, đăng nhập, quản lý thiết bị, xem thông tin thời tiết, trò chuyện với AI và quản lý thông tin cá nhân.

Các dữ liệu người dùng hiện tại được lưu trữ bằng **Local Storage** để phục vụ việc kiểm thử giao diện và chức năng.

---

# 2. Các chức năng đã hoàn thành

## 2.1 Trang đăng ký tài khoản (Signup)

Trang đăng ký cho phép người dùng tạo tài khoản mới bằng cách nhập:

* Email
* Mật khẩu
* Xác nhận mật khẩu

Sau khi đăng ký thành công:

* Thông tin người dùng được lưu vào **Local Storage**
* Thông tin sẽ được hiển thị trên **Navigation Menu** và **Profile Page**

<img width="1860" height="877" alt="Signup Page" src="https://github.com/user-attachments/assets/99cd32e7-8c98-41b8-beb2-7017127c59b3" />

---

## 2.2 Trang đăng nhập (Login)

Trang đăng nhập cho phép người dùng truy cập hệ thống bằng tài khoản đã đăng ký.

Chức năng bao gồm:

* Kiểm tra email và mật khẩu
* Nếu tài khoản hợp lệ, người dùng sẽ được chuyển đến giao diện chính của hệ thống.

<img width="1852" height="877" alt="Login Page" src="https://github.com/user-attachments/assets/155085d8-4099-461c-8728-68182016b24c" />

---

## 2.3 Trang Chat AI SmartHome

Trang chat được thiết kế để người dùng có thể giao tiếp với hệ thống SmartHome thông qua AI.

Các chức năng hiện có:

* Gửi và nhận tin nhắn
* Menu tùy chọn gồm:

  * Làm mới đoạn chat
  * Xóa lịch sử chat
  * Đăng xuất khỏi hệ thống

<img width="1863" height="873" alt="Chat Page" src="https://github.com/user-attachments/assets/6feb3acf-719d-4245-a8dc-e344d6a763b4" />

(Lưu ý: AI hiện tại **chưa được tích hợp**)

---

## 2.4 Trang Dashboard (Điều khiển nhà thông minh)

Trang Dashboard dùng để hiển thị và điều khiển các thiết bị trong nhà.

Các chức năng hiện tại:

* Hiển thị nhiệt độ
* Hiển thị độ ẩm
* Điều khiển các thiết bị điện trong nhà (giao diện mô phỏng)

<img width="1830" height="870" alt="Dashboard Page" src="https://github.com/user-attachments/assets/80d461ea-f66f-4cf1-8600-7711008b596b" />

---

## 2.5 Trang thời tiết (Weather)

Trang thời tiết hiển thị thông tin dự báo thời tiết của các thành phố lớn tại Việt Nam trong vòng **7 ngày**.

Thông tin hiển thị gồm:

* Nhiệt độ
* Tình trạng thời tiết
* Dự báo theo từng ngày

<img width="1657" height="864" alt="Weather Page" src="https://github.com/user-attachments/assets/0af20942-28b5-461d-a451-fa3bb77dcd90" />

---

## 2.6 Trang Profile

Trang Profile cho phép người dùng quản lý thông tin cá nhân.

Các chức năng:

* Cập nhật avatar
* Chỉnh sửa thông tin cá nhân
* Lưu thông tin người dùng

Toàn bộ dữ liệu được lưu bằng **Local Storage** để giữ thông tin sau khi tải lại trang.

<img width="1315" height="873" alt="Profile Page" src="https://github.com/user-attachments/assets/0d738c15-295f-42e6-9bb2-925baa356ce8" />

---

# 3. Công nghệ sử dụng

Trong giai đoạn hiện tại, hệ thống được xây dựng bằng các công nghệ sau:

* **HTML**
* **CSS**
* **JavaScript**
* **Local Storage (trình duyệt)**

---

# 4. Kết quả đạt được

Trong tuần này nhóm đã:

* Hoàn thành thiết kế giao diện chính của hệ thống
* Xây dựng chức năng đăng ký và đăng nhập
* Hoàn thiện các trang Dashboard, Weather, Chat và Profile
* Lưu trữ dữ liệu người dùng bằng Local Storage
* Hoàn thiện cấu trúc dự án và đưa mã nguồn lên GitHub

---

# 5. Công việc dự kiến trong tuần tiếp theo

Trong giai đoạn tiếp theo, nhóm sẽ:

* Tích hợp **AI Chatbot cho SmartHome**
* Kết nối hệ thống với **MQTT Broker**
* Kết nối **thiết bị IoT thực tế**
* Hiển thị dữ liệu cảm biến thời gian thực
* Cải thiện giao diện và trải nghiệm người dùng

---




