const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* ---------------------------
   BASIC SETUP
----------------------------*/
app.use(cors());
app.use(express.json());

/* ---------------------------
   SERVE FRONTEND (index.html)
----------------------------*/
app.use(express.static(path.join(__dirname, "public")));

/* ---------------------------
   HOME ROUTE (optional)
----------------------------*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ---------------------------
   GENERATE VIDEO ROUTE
   (connect AI here later)
----------------------------*/
app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  console.log("🎬 Prompt received:", prompt);

  // 🔥 LATER: call Luma API here
  // For now we simulate response

  res.json({
    success: true,
    message: "Generation started",
    prompt: prompt
  });
});

/* ---------------------------
   LUMA WEBHOOK (callback URL)
----------------------------*/
app.post("/webhook/luma", (req, res) => {
  console.log("🎥 Luma finished video!");

  const data = req.body;
  console.log("Webhook data:", data);

  const videoUrl = data?.video || data?.url || null;

  console.log("✅ VIDEO READY:", videoUrl);

  // Later: save to database or send to frontend

  res.sendStatus(200);
});

/* ---------------------------
   START SERVER (RENDER READY)
----------------------------*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
