// BlogDetail.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import news_placeholder from "../../assets/news_placeholder.png";
import './BlogDetail.css';
import { getBlogById } from '../../services/blogService';

const BlogDetail: React.FC = () => {

  // BlogDetail.tsx
interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
  content?: string;
}



  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to get the blog from location state first
  useEffect(() => {
    if (location.state?.blog) {
      setBlog(location.state.blog);
      setLoading(false);
    }
  }, [location.state]);

  // If no blog in state, fetch by ID
  useEffect(() => {
    const fetchBlog = async () => {
      if (id && !blog) {
        try {
          const response = await getBlogById(id);
          setBlog(response.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchBlog();
  }, [id, blog]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="error-container">
        <h2>Blog post not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };

  return (
    <div className="blog-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      
      <h1 className="blog-title">{blog.title}</h1>
      
      <div className="blog-meta">
        <span className="blog-author">By {blog.author}</span>
        <span className="blog-date">{formatDate(Number(blog.date))}</span>
      </div>

      <img 
        src={blog.imageUrl || news_placeholder} 
        alt={blog.title} 
        className="blog-image"
      />

      <div className="blog-content">
        <p className="blog-description">{blog.description}</p>
        {blog.content && (
          <div className="blog-body">
            {blog.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;

