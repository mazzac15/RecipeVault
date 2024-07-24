import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
});

document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password",
  ).value;

  if (password === confirmPassword) {
    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Sign up successful");
    // Redirect or show a different page
    window.location.href = "/index.html";
  } else {
    alert("Passwords do not match");
  }
});
