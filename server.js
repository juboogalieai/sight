const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("AI server is running");
});

// main AI endpoint (placeholder for now)
app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  console.log("Prompt received:", prompt);

  // TEMP RESPONSE (we add real AI later)
  res.json({
    success: true,
    message: "Server working",
    prompt: prompt
  });
});

// important for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
