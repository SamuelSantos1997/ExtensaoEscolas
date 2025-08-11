// /src/javascript/navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar-container");
  if (container) {
    fetch("/src/front/navbar.html")
      .then(res => res.text())
      .then(data => {
        container.innerHTML = data;
      });
  }
});
