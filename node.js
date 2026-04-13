import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer YOUR_API_KEY`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt,
      size: "1024x1024"
    })
  });

  const data = await response.json();

  res.json({
    imageUrl: data.data[0].url
  });
});

app.listen(3000, () => console.log("Running"));
