const menu = document.querySelector(".mobile");
const openers = document.querySelectorAll(".menu-btn");
function setOpen(open) {
  if (!menu) return;
  menu.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
  openers.forEach((btn) => {
    if (!btn.hasAttribute("data-close")) btn.setAttribute("aria-expanded", String(open));
  });
}
openers.forEach((btn) => {
  btn.addEventListener("click", () => setOpen(btn.hasAttribute("data-close") ? false : menu.hidden));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setOpen(false);
});

const form = document.getElementById("contact-form");
const done = document.getElementById("form-done");
const error = document.getElementById("form-error");
if (form && done) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      error.hidden = false;
      error.textContent = "Name, email, and a message are required.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.hidden = false;
      error.textContent = "Enter a valid email address.";
      return;
    }
    error.hidden = true;
    form.hidden = true;
    done.hidden = false;
    document.getElementById("done-title").textContent = "Noted, " + name + ".";
  });
  document.getElementById("write-another").addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    done.hidden = true;
  });
}

if (window.SITE_IMAGES) {
  document.querySelectorAll("img").forEach((img) => {
    const key = (img.getAttribute("src") || "").split("/").pop();
    if (window.SITE_IMAGES[key]) img.src = window.SITE_IMAGES[key];
  });
}
