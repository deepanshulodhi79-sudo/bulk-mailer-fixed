// ✅ Page protect: launcher.html only opens if logged in
window.onload = () => {
  if (window.location.pathname.includes("launcher.html")) {
    if (!localStorage.getItem("loggedIn")) {
      window.location.href = "login.html";
    }
  }
};

function sendMail() {
  const senderName = document.getElementById("senderName").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const recipients = document.getElementById("recipients").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const btn = document.getElementById("sendBtn");
  btn.disabled = true;
  btn.innerText = "Sending...";

  fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderName, email, pass, recipients, subject, message })
  })
  .then(res => res.json())
  .then(data => {
    btn.disabled = false;
    btn.innerText = "Send Emails";
    document.getElementById("statusMessage").innerText = data.message;
    alert(data.message);
  })
  .catch(err => {
    btn.disabled = false;
    btn.innerText = "Send Emails";
    alert("Error: " + err.message);
  });
}

// ✅ Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
