// HomeBody.tsx
import React, { useEffect, useState } from "react";
import "./HomeBody.css";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../services/blogService";
import { store } from "../../store/index";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const HomeBody: React.FC = () => {
  interface Blog {
    _id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    author: string;
    date: string;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(store.getState().isAuthenticated);
  const navigate = useNavigate();

  // Subscribe to Redux store changes to track authentication status
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsLoggedIn(store.getState().isAuthenticated);
    });
    return () => unsubscribe();  // Cleanup subscription on component unmount
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate("api/auth/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchBlogs = async () => {
        try {
          const response = await getBlogs();
          setBlogs(response.data);
        } catch (error) {
          console.error("Error fetching blogs: ", error);
        }
      };
      fetchBlogs();
    }
  }, [isLoggedIn]);

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <div className="dashboard-layout">
          <nav className="navigation-sidebar">
            <button 
              className="nav-btn create-btn"
              onClick={() => navigate("/createblog")}
            >
              Create New Blog
            </button>
            <div className="category-buttons">
              <button
                className="nav-btn"
                onClick={() => navigate("/api/geopolitics-news")}
              >
                GeoPolitics
              </button>
              <button
                className="nav-btn"
                onClick={() => navigate("/api/military-news")}
              >
                Military
              </button>
              <button
                className="nav-btn"
                onClick={() => navigate("/api/space-news")}
              >
                Space
              </button>
            </div>
          </nav>

          <main className="blog-grid">
            {blogs.map((blog) => (
              <article className="blog-card" key={blog._id}>
                <div className="card-image">
                  <img src={blog.imageUrl} alt={blog.title} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{blog.title}</h3>
                  <p className="card-description">{blog.description}</p>
                  <button 
                    className="read-more-btn"
                    onClick={() =>
                      navigate(`/blog/${blog._id}`, { state: { blog } })
                    }
                  >
                    Read More...
                  </button>
                </div>
              </article>
            ))}
          </main>
        </div>
      ) : (
        <div className="auth-prompt">
          <h2>Welcome to Insight Hub</h2>
          <p>Please log in to access curated content and analysis</p>
        </div>
      )}
    </div>
  );
};

export default HomeBody;
