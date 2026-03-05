/* ======================
   CHAT WITH AI
====================== */

document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");
  const dropdown = document.getElementById("dropdown");

  /* GỬI TIN NHẮN */
  window.send = async function () {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user-msg");
    input.value = "";

    // 🤖 AI xử lý nhanh các câu hỏi hệ thống
    const lower = text.toLowerCase();

    if (
      lower.includes("mấy giờ") ||
      lower.includes("giờ hiện tại") ||
      lower.includes("time")
    ) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("vi-VN");
      const dateStr = now.toLocaleDateString("vi-VN");

      addMessage(`⏰ Bây giờ là ${timeStr}, ngày ${dateStr}`, "ai-msg");
      return;
    }

    // 🌐 Gọi backend AI (nếu có)
    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      addMessage(data.reply || "🤖 AI chưa có phản hồi.", "ai-msg");
    } catch (err) {
      addMessage("⚠️ Không kết nối được AI server.", "ai-msg");
    }
  };

  /* MENU 3 CHẤM */
  window.toggleMenu = function () {
    if (!dropdown) return;
    dropdown.style.display =
      dropdown.style.display === "flex" ? "none" : "flex";
  };

  /* XÓA CHAT */
  window.clearChat = function () {
    chat.innerHTML = "";
    dropdown.style.display = "none";
  };

  /* LÀM MỚI CHAT */
  window.refreshChat = function () {
    chat.innerHTML =
      '<div class="message ai-msg">🤖 Chat đã được làm mới.</div>';
    dropdown.style.display = "none";
  };

  /* ENTER ĐỂ GỬI */
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      window.send();
    }
  });

  /* CLICK NGOÀI → ĐÓNG MENU */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu-3dot")) {
      dropdown.style.display = "none";
    }
  });

  /* ADD MESSAGE */
  function addMessage(text, cls) {
    const div = document.createElement("div");
    div.className = `message ${cls}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }
});
