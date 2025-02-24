import React, { useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

const DemoPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [inputText, setInputText] = useState("");

  const fetchImage = async (url: string) => {
    try {
      //   const { data } = await axios.get(url);

      const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Public CORS proxy
      const { data } = await axios.get(proxyUrl + url);

      const $ = cheerio.load(data);

      const imageUrl =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content");

      console.log("Image Url Is:: " + imageUrl);

      setImageUrl(imageUrl);

      return imageUrl || "";
    } catch (error) {
      console.error("Error while fetching Image", error);
      return "";
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={() => fetchImage(inputText)}>Check</button>
      <img src={imageUrl} alt="" />
    </div>
  );
};

export default DemoPage;
