(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  function initTheme() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const navbar = document.querySelector(".navbar");
    const navbarBrandSpan = navbar ? navbar.querySelector(".navbar-brand span") : null;
    const offcanvas = document.getElementById("menuOffcanvas");
    const offcanvasCloseBtn = offcanvas ? offcanvas.querySelector(".btn-close") : null;
    const offcanvasLinks = offcanvas ? offcanvas.querySelectorAll(".nav-link") : null;

    function applyTheme(theme) {
      if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "Day Mode";
        localStorage.setItem("theme", "dark");

        if (navbar) {
          navbar.classList.remove("navbar-light", "bg-light");
          navbar.classList.add("navbar-dark", "bg-black");
        }
        if (navbarBrandSpan) {
          navbarBrandSpan.classList.remove("text-dark");
          navbarBrandSpan.classList.add("text-light");
        }

        if (offcanvas) {
          offcanvas.classList.remove("text-bg-light");
          offcanvas.classList.add("text-bg-dark");
        }
        if (offcanvasCloseBtn && !offcanvasCloseBtn.classList.contains("btn-close-white")) {
          offcanvasCloseBtn.classList.add("btn-close-white");
        }

        if (offcanvasLinks) {
          offcanvasLinks.forEach(link => {
            link.classList.remove("text-dark");
            link.classList.add("text-light");
          });
        }

        themeToggle.classList.remove("btn-outline-dark");
        themeToggle.classList.add("btn-outline-light");
      } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "Night Mode";
        localStorage.setItem("theme", "light");

        if (navbar) {
          navbar.classList.remove("navbar-dark", "bg-black");
          navbar.classList.add("navbar-light", "bg-light");
        }
        if (navbarBrandSpan) {
          navbarBrandSpan.classList.remove("text-light");
          navbarBrandSpan.classList.add("text-dark");
        }

        if (offcanvas) {
          offcanvas.classList.remove("text-bg-dark");
          offcanvas.classList.add("text-bg-light");
        }
        if (offcanvasCloseBtn) {
          offcanvasCloseBtn.classList.remove("btn-close-white");
        }

        if (offcanvasLinks) {
          offcanvasLinks.forEach(link => {
            link.classList.remove("text-light");
            link.classList.add("text-dark");
          });
        }

        themeToggle.classList.remove("btn-outline-light");
        themeToggle.classList.add("btn-outline-dark");
      }
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
      applyTheme(newTheme);
    });
  }
})();
