import React, { useEffect, useState } from "react";
import "./EditBlog.css";
import add_image_icon from "../../assets/add_image.png";
import { updateBlog, uploadImage } from "../../services/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById } from '../../services/blogService';

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

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

  

  useEffect(() => {
    const fetchBlog = async () => {
      
      if (id) {
        try {
          const response = await getBlogById(id);
          setBlog(response.data);
          
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          // setLoading(false);
        }
      }
    };
    
    fetchBlog();
  }, [id, blog]);


  useEffect(() => {
    if(blog!=null){
      setTitle(blog.title.toString());
      setDescription(blog.description.toString());
      setCategory(blog.category.toString());
      setImageUrl(blog.imageUrl.toString());
    }
  }, [id])


  const navigate = useNavigate();

  const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const response = await uploadImage(event.target.files[0]);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error("image upload failed", error);
      }
    }
  };

  const handleCancel = async () => {
    navigate("/");
  }

  const handleSubmit = async (id: string, blog: Blog) => {
    try {
      const date = blog.date;
      const author = blog.author;
      await updateBlog(id, { title, description, category, imageUrl, author, date });
      alert("Blog updated successfully!");
      // Clear form after submission
      setTitle("");
      setDescription("");
      setCategory("");
      setImageUrl("");
      navigate("/");
    } catch (error) {
      console.error("Error creating blog", error);
    }
  };

  return (
    <div className="create-blog-container">
      <div className="form-card">
        <h1 className="form-title">Edit Blog</h1>

        <div className="image-upload-section">
          <input 
            type="file" 
            onChange={onImageSelect} 
            id="image-upload" 
            className="hidden-input"
            accept="image/*"
          />
          <label htmlFor="image-upload" className="upload-label">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="image-preview" />
            ) : (
              <div className="upload-placeholder">
                <img src={add_image_icon} alt="Add" className="upload-icon" />
                <span>Upload Featured Image</span>
              </div>
            )}
          </label>
        </div>

        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label className="input-label">Title</label>
        </div>

        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
          <label className="input-label">Description</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <label className="input-label">Category</label>
        </div>

        <div className="button-group">
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button className="submit-btn" onClick={() => id && blog && handleSubmit(id, blog)}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;