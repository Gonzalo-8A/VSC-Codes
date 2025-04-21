import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/search", async (req, res) => {
  const { query } = req.body;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!query || !apiKey) {
    return res.status(400).json({ error: "Missing query or API key" });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&key=${apiKey}&type=video&maxResults=1`
    );
    const data = await response.json();

    const videoId = data.items?.[0]?.id?.videoId;
    res.json({ videoId: videoId || null });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ error: "Failed to fetch video" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
