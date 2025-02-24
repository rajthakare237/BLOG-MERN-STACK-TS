import express, { response } from "express";
import axios from "axios";
import { parseStringPromise } from "xml2js";
import cheerio from "cheerio";
import { data } from "cheerio/dist/commonjs/api/attributes";

const router = express.Router();

const fetchImage = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const imageUrl =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content");

    console.log("Image Url Is:: " + imageUrl);

    return imageUrl || "";
  } catch (error) {
    console.error("Error while fetching Image", error);
    return "";
  }
};

router.get("/space-news", async (req, res) => {
  try {
    const rssUrls = [
      "https://www.nasa.gov/news-release/feed/",
      "https://www.space.com/feeds/all",
      "https://www.livescience.com/feeds/all",
      "https://www.defensenews.com/arc/outboundfeeds/rss/category/space/?outputType=xml",
    ];

    const promises = rssUrls.map((url) =>
      axios.get(url, { responseType: "text" })
    );
    const responses = await Promise.all(promises);
    const parsedData = await Promise.all(
      responses.map((response) => parseStringPromise(response.data))
    );

    const items = parsedData.flatMap((data) => data.rss.channel[0].item);

    const newsWithImages = await Promise.all(
      items.map(async (item) => {
        const imageUrl = await fetchImage(item.link[0]);

        return {
          title: item.title[0],
          link: item.link[0],
          pubDate: item.pubDate[0],
          description: item.description[0],
          imageUrl,
        };
      })
    );

    res.json(newsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error fetching space-news" });
  }
});

export default router;
