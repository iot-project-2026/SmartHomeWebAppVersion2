const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstname = document.getElementById("firstname-input");
    const email = document.getElementById("email-input");
    const password = document.getElementById("password-input");
    const repeatPassword = document.getElementById("repeat-password-input");
    const error = document.getElementById("error-message");

    error.innerText = "";

    // lấy danh sách user
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ================= SIGNUP =================
    if (firstname) {
      if (
        firstname.value === "" ||
        email.value === "" ||
        password.value === "" ||
        repeatPassword.value === ""
      ) {
        error.innerText = "Please fill all fields";
        return;
      }

      if (password.value.length < 8) {
        error.innerText = "Password must be at least 8 characters";
        return;
      }

      if (password.value !== repeatPassword.value) {
        error.innerText = "Passwords do not match";
        return;
      }

      // kiểm tra email đã tồn tại chưa
      const emailExists = users.find((u) => u.email === email.value);

      if (emailExists) {
        error.innerText = "Email already registered";
        return;
      }

      const user = {
        firstname: firstname.value,
        email: email.value,
        password: password.value,
        phone: "",
        address: "",
        avatar: "",
      };

      users.push(user);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(user));

      window.location.href = "profile.html";
    }

    // ================= LOGIN =================
    else {
      const user = users.find(
        (u) => u.email === email.value && u.password === password.value,
      );

      if (!user) {
        error.innerText = "Email or password incorrect";
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      window.location.href = "profile.html";
    }
  });
}
