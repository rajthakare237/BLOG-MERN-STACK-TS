import express from "express";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const router = express.Router();

router.get("/military-news", async (req, res) => {
  try {
    const rssUrl1 =
      "https://www.defensenews.com/arc/outboundfeeds/rss/category/air/?outputType=xml";
    const response1 = await axios.get(rssUrl1, { responseType: "text" });
    const parsedData1 = await parseStringPromise(response1.data);

    const rssUrl2 =
      "https://www.defensenews.com/arc/outboundfeeds/rss/category/land/?outputType=xml";
    const response2 = await axios.get(rssUrl2, { responseType: "text" });
    const parsedData2 = await parseStringPromise(response2.data);

    const rssUrl3 =
      "https://www.defensenews.com/arc/outboundfeeds/rss/category/naval/?outputType=xml";
    const response3 = await axios.get(rssUrl3, { responseType: "text" });
    const parsedData3 = await parseStringPromise(response3.data);

    const rssUrl4 =
      "https://www.defensenews.com/arc/outboundfeeds/rss/category/pentagon/?outputType=xml";
    const response4 = await axios.get(rssUrl4, { responseType: "text" });
    const parsedData4 = await parseStringPromise(response4.data);

    //using spread operator to merge multiple arrays in one array
    const final = [
      ...parsedData1.rss.channel[0].item,
      ...parsedData2.rss.channel[0].item,
      ...parsedData3.rss.channel[0].item,
      ...parsedData4.rss.channel[0].item,
    ];

    res.json(final);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

export default router;
