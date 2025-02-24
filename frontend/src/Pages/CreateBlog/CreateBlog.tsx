import React, { useState } from "react";
import "./CreateBlog.css";
import add_image_icon from "../../assets/add_image.png";
import { createBlog, uploadImage } from "../../services/blogService";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const auth  = useSelector((state: RootState) => state);
  const author = auth.email?.toString();

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

  const handleSubmit = async () => {
    try {
      const date = Date.now();
      await createBlog({ title, description, category, imageUrl, author, date });
      alert("Blog created successfully!");
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
        <h1 className="form-title">Create New Blog</h1>

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
          <button className="submit-btn" onClick={handleSubmit}>
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;