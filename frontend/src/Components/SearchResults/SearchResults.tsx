// SearchResults.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import news_placeholder from "../../assets/news_placeholder.png";
import { getBlogs } from "../../services/blogService";
import "./SearchResults.css"

const backend_url = import.meta.env.VITE_BACKEND_URL;

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

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation(); // Hook to get current URL location
  const navigate = useNavigate(); // Hook to programmatically navigate between pages

  // Retrieve the query parameter from the URL
  const params = new URLSearchParams(location.search); //URLSearchParams is a built-in JavaScript API for working with query parameters in a URL
  const query = params.get("q") || ""; //params.get("q") retrieves the value of the "q" query parameter.

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [news, setNews] = useState<Article[]>([]);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<{ articles: Article[] }>(
          `${backend_url}/api/news`
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  // Filter blogs and news by the search query (case-insensitive)
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );

  // Update news card click handler
  const handleNewsClick = (article: Article) => {
    /*
    encodeURIComponent(article.title) ensures that the article title is safely encoded for use in the URL by replacing 
    special characters (e.g., spaces, ?, &) with their encoded equivalents.
    */
    navigate(`/news-article/${encodeURIComponent(article.title)}`, { 
      state: { article } 
    });
  };

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>

      <section className="blogs-section">
        <h2>Blogs</h2>
        {filteredBlogs.length > 0 ? (
          <div className="blogs-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="blog-result-card">
                <img src={blog.imageUrl} alt={blog.title} />
                <div className="card-content">
                  <h3>{blog.title}</h3>
                  <p>{blog.description}</p>
                  <button onClick={() => navigate(`/blog/${blog._id}`, { state: { blog } })}>
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No blogs found.</p>
        )}
      </section>

      <section className="news-section">
        <h2>News</h2>
        {filteredNews.length > 0 ? (
          <div className="news-grid">
            {filteredNews.map((article, index) => (
              <div
                key={index}
                className="news-result-card"
                onClick={() => handleNewsClick(article)}
              >
                <img
                  src={
                    article.urlToImage && article.urlToImage !== "null"
                      ? article.urlToImage
                      : news_placeholder
                  }
                  alt={article.title}
                />
                <div className="card-content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="news-source">
                    <span>{article.source.name}</span>
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No news articles found.</p>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
