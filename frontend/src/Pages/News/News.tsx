// News.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";
import news_placeholder from "../../assets/news_placeholder.png";


const backend_url = import.meta.env.VITE_BACKEND_URL;

// Define types for the structure of the news articles
interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const News: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]); // Use the Article[] type for the state

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<{ articles: Article[] }>(
          `${backend_url}/api/news`
        ); // Define response type
        setNews(response.data.articles);
        console.log(response.data.articles[0])
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleArticleClick = (article: Article) => {
    // navigate(`/blog/${encodeURIComponent(article.title)}`, { state: { article } });
    window.open(String(article.url));
  };

  return (
    <div>
      <h1>News Headlines</h1>
      <ul>
        {news.map((article) => (
          <div className="news-div" onClick={()=>handleArticleClick(article)}>
            <img src={article.urlToImage?.toString()?article.urlToImage?.toString():news_placeholder} alt="" />
            <h3>{article.title}</h3>
            <h5>{article.description}</h5>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default News;
