/* DRAG & DROP */
new Sortable(document.getElementById("main-grid"), {
  animation: 150,
});

/* CLOCK REALTIME */
setInterval(() => {
  document.getElementById("time").innerText = new Date().toLocaleTimeString(
    "vi-VN",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );
}, 1000);

/* CAMERA */
function startCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      document.getElementById("video").srcObject = stream;
    })
    .catch(() => alert("Không tìm thấy camera"));
}

/* AI CHAT (GIẢ LẬP) */
function handleChat(e) {
  if (e.key === "Enter") {
    const box = document.getElementById("chat-content");
    const text = e.target.value;
    if (!text) return;

    box.innerHTML += `<p style="text-align:right">Bạn: ${text}</p>`;
    setTimeout(() => {
      box.innerHTML += `<p class="ai">AI: Tôi đang xử lý "${text}"...</p>`;
      box.scrollTop = box.scrollHeight;
    }, 600);

    e.target.value = "";
  }
}

/* SWITCH TOGGLE */
document.querySelectorAll(".switch").forEach((s) => {
  s.onclick = () => s.classList.toggle("on");
});
function setUnit(unit, event) {
  currentUnit = unit;

  document
    .querySelectorAll(".toggle-btn")
    .forEach((btn) => btn.classList.remove("active"));

  event.target.classList.add("active");

  initHourlyForecast();
  initDailyForecast();
}
