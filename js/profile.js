// ===============================
// LOAD USER
// ===============================

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "login.html";
}

// ===============================
// DOM
// ===============================

const nameEl = document.getElementById("profile-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

const avatar = document.getElementById("avatar");
const avatarInput = document.getElementById("avatarInput");

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");

// ===============================
// LOAD PROFILE
// ===============================

function loadProfile() {
  nameEl.innerText = currentUser.firstname;
  emailInput.value = currentUser.email;
  phoneInput.value = currentUser.phone || "";
  addressInput.value = currentUser.address || "";

  if (currentUser.avatar) {
    avatar.src = currentUser.avatar;
  }

  updateSidebarUser();
}

loadProfile();

// ===============================
// EDIT PROFILE
// ===============================

editBtn.addEventListener("click", () => {
  phoneInput.disabled = false;
  addressInput.disabled = false;

  editBtn.style.display = "none";
  saveBtn.style.display = "block";
});

// ===============================
// SAVE PROFILE
// ===============================

saveBtn.addEventListener("click", () => {
  currentUser.phone = phoneInput.value;
  currentUser.address = addressInput.value;

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  // cập nhật danh sách users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users = users.map((u) => {
    if (u.email === currentUser.email) {
      return currentUser;
    }
    return u;
  });

  localStorage.setItem("users", JSON.stringify(users));

  phoneInput.disabled = true;
  addressInput.disabled = true;

  editBtn.style.display = "block";
  saveBtn.style.display = "none";

  alert("Đã lưu thông tin!");
});

// ===============================
// AVATAR CHANGE
// ===============================

avatarInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    avatar.src = reader.result;

    currentUser.avatar = reader.result;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    updateSidebarUser();
  };

  reader.readAsDataURL(file);
});

// ===============================
// SIDEBAR USER
// ===============================

function updateSidebarUser() {
  const sidebar = document.getElementById("sidebar");

  if (!sidebar) return;

  let userBox = sidebar.querySelector(".sidebar-user");

  if (!userBox) {
    userBox = document.createElement("div");
    userBox.classList.add("sidebar-user");

    sidebar.appendChild(userBox);
  }

  userBox.innerHTML = `
    <img src="${currentUser.avatar || "/image/image.png"}" class="sidebar-avatar">
    <div class="sidebar-name">${currentUser.firstname}</div>
  `;
}
