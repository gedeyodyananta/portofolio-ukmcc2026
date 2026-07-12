(() => {
  const html = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");

  function applyTheme(dark) {
    html.classList.toggle("dark", dark);
    iconSun.classList.toggle("hidden", !dark);
    iconMoon.classList.toggle("hidden", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored ? stored === "dark" : prefersDark);

  toggle.addEventListener("click", () => {
    applyTheme(!html.classList.contains("dark"));
  });
})();
