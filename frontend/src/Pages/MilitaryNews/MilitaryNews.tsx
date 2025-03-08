import React, { useEffect, useState } from "react";
import "./MilitaryNews.css";
import axios from "axios";



const backend_url = import.meta.env.VITE_BACKEND_URL;

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

const MilitaryNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/military-news`
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="military-news-container">
      <h2 className="military-news-heading">Military Updates</h2>
      <div className="news-grid">
        {news.map((item, index) => (
          <div key={index} className="news-card">
            <h3 className="news-title">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h3>
            <span className="pub-date">
              {new Date(item.pubDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <p className="news-description">{item.description}</p>
            <a href={item.link} className="external-link" target="_blank" rel="noopener noreferrer">
              Read Full Report
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilitaryNews;
