const form = document.querySelector("#signupForm");
const fields = ["name","email","phone","password"];
const error = id => document.querySelector(`#${id}Error`);

function validate(id) {
  const el = document.querySelector(`#${id}`);
  const value = el.value.trim();
  let message = "";
  if (id === "name" && value.length < 2) message = "Please enter your full name.";
  if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Enter a valid email address.";
  if (id === "phone" && !/^\+?\d{10,15}$/.test(value.replace(/[\s-]/g,""))) message = "Enter a valid phone number.";
  if (id === "password" && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)) message = "Use 8+ characters with at least one letter and number.";
  error(id).textContent = message;
  el.classList.toggle("invalid", !!message);
  el.classList.toggle("valid", !message && value.length > 0);
  return !message;
}
fields.forEach(id => ["input","blur"].forEach(evt => document.querySelector(`#${id}`).addEventListener(evt, () => validate(id))));
document.querySelector("#password").addEventListener("input", e => {
  const v = e.target.value; let score = 0;
  if (v.length >= 8) score++; if (/[A-Z]/.test(v)) score++; if (/\d/.test(v)) score++; if (/[^A-Za-z0-9]/.test(v)) score++;
  document.querySelector("#strengthBar").style.width = `${score*25}%`;
});
form.addEventListener("submit", e => {
  e.preventDefault();
  const ok = fields.map(validate).every(Boolean);
  const success = document.querySelector("#success");
  success.textContent = ok ? "Registration successful! Your form is valid." : "";
  if (ok) form.reset();
});
