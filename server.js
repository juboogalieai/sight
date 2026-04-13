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
   HOME PAGE
----------------------------*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ---------------------------
   GENERATE VIDEO (LUMA START)
----------------------------*/
app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  console.log("🎬 Prompt received:", prompt);

  try {
    const response = await fetch("https://api.lumalabs.ai/dream-machine/v1/generations/video", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "authorization": `Bearer ${process.env.LUMA_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "ray-2",
        duration: "9s",
        aspect_ratio: "9:21",
        generation_type: "video",
        callback_url: "https://sight-91bb.onrender.com/webhook/luma"
      })
    });

    const data = await response.json();

    console.log("🚀 Luma response:", data);

    res.json({
      success: true,
      job: data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

/* ---------------------------
   WEBHOOK (LUMA CALLBACK)
----------------------------*/
app.post("/webhook/luma", (req, res) => {
  console.log("🎥 Luma webhook hit!");

  const data = req.body;
  console.log("Webhook data:", data);

  const videoUrl =
    data?.video ||
    data?.url ||
    data?.output ||
    null;

  console.log("✅ VIDEO READY:", videoUrl);

  // later: store in DB or send to frontend

  res.sendStatus(200);
});

/* ---------------------------
   START SERVER (RENDER READY)
----------------------------*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
