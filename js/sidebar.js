document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sidebar-container");
  if (!container) return;

  fetch("/components/sidebar.html")
    .then((res) => res.text())
    .then((html) => {
      container.innerHTML = html;

      const sidebar = document.getElementById("sidebar");
      const toggleBtn = document.getElementById("toggle-btn");

      // toggle sidebar
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
        toggleBtn.classList.toggle("rotate");
        closeAllSubMenus(sidebar);
      });

      // dropdown buttons
      sidebar.querySelectorAll(".dropdown-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          toggleSubMenu(btn, sidebar, toggleBtn);
        });
      });

      setActiveMenu(sidebar);
    });
});

function toggleSubMenu(button, sidebar, toggleBtn) {
  const submenu = button.nextElementSibling;

  if (!submenu.classList.contains("show")) {
    closeAllSubMenus(sidebar);
  }

  submenu.classList.toggle("show");
  button.classList.toggle("rotate");

  if (sidebar.classList.contains("close")) {
    sidebar.classList.remove("close");
    toggleBtn.classList.remove("rotate");
  }
}

function closeAllSubMenus(sidebar) {
  sidebar.querySelectorAll(".sub-menu.show").forEach((menu) => {
    menu.classList.remove("show");
    menu.previousElementSibling.classList.remove("rotate");
  });
}

function setActiveMenu(sidebar) {
  const current = location.pathname.split("/").pop();

  sidebar.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.parentElement.classList.add("active");
    }
  });
}
