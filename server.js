const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Default route (homepage → login.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Hardcoded login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ Send Mail Route
app.post("/send", async (req, res) => {
  const { senderName, email, pass, subject, message, recipients } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: email, pass: pass }
    });

    let recipientList = recipients.split(/\r?\n/).filter(r => r.trim() !== "");

    for (let r of recipientList) {
      await transporter.sendMail({
        from: `"${senderName}" <${email}>`,
        to: r,
        subject: subject,
        text: message,
      });
    }

    res.json({ success: true, message: "✅ Emails sent successfully" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "❌ Error: " + err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
