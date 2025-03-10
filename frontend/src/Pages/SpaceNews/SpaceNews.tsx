import { useEffect, useState } from "react";
import "./SpaceNews.css";
import axios from "axios";



const backend_url = import.meta.env.VITE_BACKEND_URL;

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl: string;
}

const SpaceNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/space-news`
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="space-news-container">
      <h2>Space News</h2>
      <div className="space-news-grid">
        {news.map((item, index) => (
          <div className="space-news-card" key={index}>
            {item.imageUrl && (
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="space-news-image"
              />
            )}
            <div className="space-news-content">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h3>{item.title}</h3>
              </a>
              <p className="space-news-date">{item.pubDate}</p>
              <p className="space-news-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceNews;
