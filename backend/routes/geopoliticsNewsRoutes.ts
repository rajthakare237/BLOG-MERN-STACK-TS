import express from "express";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const router = express.Router();

router.get("/geopolitics-news", async (req, res) => {
  try {
    const rssUrl = "https://thediplomat.com/feed/";
    const response = await axios.get(rssUrl, { responseType: "text" });
    const parsedData = await parseStringPromise(response.data);

    const final = parsedData.rss.channel[0].item;

    res.json(final);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

export default router;
