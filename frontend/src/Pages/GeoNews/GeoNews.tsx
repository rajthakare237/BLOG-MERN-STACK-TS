import React, { useEffect, useState } from "react";
import "./GeoNews.css";
import axios from "axios";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

const GeoNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/geopolitics-news"
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="geo-news-container">
      <h2>Geopolitical News</h2>
      {news.map((item, index) => (
        <div className="geo-news-item" key={index}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <h3>{item.title}</h3>
          </a>
          <p>{item.pubDate}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default GeoNews;
