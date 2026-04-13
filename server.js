const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* -----------------------------
   1. TEST ROUTE
------------------------------*/
app.get("/", (req, res) => {
  res.send("AI server is running");
});

/* -----------------------------
   2. GENERATE VIDEO ROUTE
   (this is where you call Luma)
------------------------------*/
app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  console.log("Prompt received:", prompt);

  // later: call Luma API here

  res.json({
    success: true,
    message: "Generation started"
  });
});

/* -----------------------------
   3. CALLBACK / WEBHOOK ROUTE
   👇 THIS IS WHAT YOU ASKED FOR
------------------------------*/
app.post("/webhook/luma", (req, res) => {
  console.log("🎬 Luma finished video");

  const data = req.body;
  console.log("Webhook data:", data);

  // Try to extract video URL (depends on API response)
  const videoUrl = data?.video || data?.url || data;

  console.log("VIDEO READY:", videoUrl);

  // Here you would normally:
  // - save to database
  // - send to frontend
  // - store per user

  res.sendStatus(200);
});

/* -----------------------------
   4. START SERVER (IMPORTANT FOR RENDER)
------------------------------*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
