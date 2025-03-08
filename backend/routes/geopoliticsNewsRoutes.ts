import express from "express";
import axios from "axios";
import { parseStringPromise } from "xml2js"; //to convert xml data to json format

const router = express.Router();

router.get("/geopolitics-news", async (req, res) => {
  try {
    const rssUrl = "https://thediplomat.com/feed/";
    const response = await axios.get(rssUrl, { responseType: "text" }); //fetch data as plain text

    const parsedData = await parseStringPromise(response.data); //convert xml response to json format

    const final = parsedData.rss.channel[0].item;  //extract news articles from parsed data

    res.json(final);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

export default router;
