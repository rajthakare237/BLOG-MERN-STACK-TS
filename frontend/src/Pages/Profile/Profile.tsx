// components/Profile.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "../../store/index";
import { login } from "../../actions/authActions";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../../actions/authActions";
import { getBlogs } from "../../services/blogService";
import axios from "axios";


const backend_url = import.meta.env.VITE_BACKEND_URL;


const Profile = () => {
  
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state);

  interface Blog {
    _id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    author: string;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoggedIn] = useState(store.getState().isAuthenticated);
  const navigate = useNavigate();

  const [email] = useState(auth.email);
  const [username, setUsername] = useState(auth.username);
  const [bio, setBio] = useState(auth.bio);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(
    auth.profilePicUrl ? auth.profilePicUrl : ""
  );
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  

  useEffect(() => {
    if (isLoggedIn) {
      const fetchBlogs = async () => {
        try {
          const response = await getBlogs();
          const filteredBlogs = response.data.filter((blog: Blog) => String(blog.author) === email)
          setBlogs(filteredBlogs);
          // console.log("email: "+email+" and auth: "+response.data[0].author);
          // console.log("Print setblogs: "+blogs.length.toString());
        } catch (error) {
          console.error("Error fetching blogs: ", error);
        }
      };
      fetchBlogs();
    }
  }, [blogs]);

  const handleSave = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append("email", email || "");
    formData.append("username", username || "");
    formData.append("bio", bio || "");
    if (newProfilePic) {
      formData.append("profilePic", newProfilePic);
    }

    try {
      const response = await fetch(`${backend_url}/api/updateProfile`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePic(data.profilePicUrl);
        setIsEditing(false);
        // Dispatch the updated profile info to Redux.
        dispatch(
          login(
            email || "",
            auth.token || "",
            username || "",
            bio || "",
            data.profilePicUrl
          )
        );
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error while saving profile:", error);
    } finally{
      setIsSaving(false);
    }
  };

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewProfilePic(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  let userLoggedIn: boolean = auth.isAuthenticated;

  useEffect(() => {
    userLoggedIn = auth.isAuthenticated;
  }, [auth.isAuthenticated]);

  const deleteBlog = async (blogId: string) => {
    try {
      const response = await axios.delete(`${backend_url}/blogs/delete/${blogId}`, {
        headers: {
          "Content-Type": "application/json",
          // If you require authentication, add your auth token here:
          // "Authorization": `Bearer ${auth.token}`,
        },
      });

      if(response.status == 200){
        const updatedResponse = await getBlogs();
        setBlogs(updatedResponse.data.filter((blog: Blog) => String(blog.author) === email));
      }
      else{
        console.error("Failed to delete blog.");
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  const editBlog = async (blogId: string) => {
    // alert("Edit blog with id: "+blogId);
    navigate(`/editBlog/${blogId}`);
  }

  const logout = async () => {
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/logout",
      //   {},
      //   { headers: { Authorization: `Bearer ${auth.token}` } }
      // );
      // console.log(response.data.message);
      dispatch(logoutAction());
      alert("Logout successful.");
      navigate("/api/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  
  // Profile.tsx (modified JSX)
return (
  <div className="profile-container">
    {auth.isAuthenticated ? (
      <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <label htmlFor="profilePicInput" className="avatar-wrapper">
            <img 
              className="profile-avatar" 
              src={profilePic || '/default-avatar.png'} 
              alt="Profile"
            />
            {isEditing && (
              <div className="avatar-overlay">
                <span className="camera-icon">📷</span>
              </div>
            )}
          </label>
          {isEditing && (
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
            />
          )}
        </div>

        <div className="profile-content">
          <div className="profile-info">
            {isEditing ? (
              <input
                className="profile-input"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            ) : (
              <h2 className="profile-username">{username}</h2>
            )}
            <p className="profile-email">{email}</p>
            
            {isEditing ? (
              <textarea
                className="profile-textarea"
                value={bio || ""}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            ) : (
              <p className="profile-bio">{bio || "No bio yet"}</p>
            )}
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <div className="action-buttons">
                <button className="btn-save" onClick={handleSave}>
                {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
              {userLoggedIn ? (
                <button className="logoutButton" onClick={logout}>Logout</button>
              ) : (
                <Link to="api/auth/login">
                  <button>Login</button>
                </Link>
              )}
              </div>
            )}
          </div>
          <div className="logout">
          
          </div>
        </div>
      </div>

      <div className="your-blogs-text">Your Blogs</div>

      {isLoggedIn ? (
          <main className="blog-grid">
            {blogs.map((blog) => (
              <article className="blog-card" key={blog._id}>
                <button className="deleteButton" onClick={()=>deleteBlog(blog._id)}>Delete</button>
                <button className="editButton" onClick={()=>editBlog(blog._id)}>Edit</button>
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
                      // navigate(`/blog/${blog._id}`, {
                      //   state: {
                      //     article: {
                      //       // Map the blog properties to the Article interface expected in BlogDetail.
                      //       title: blog.title,
                      //       description: blog.description,
                      //       urlToImage: blog.imageUrl,
                      //       publishedAt: new Date().toISOString(), // Set a default date or use an existing one
                      //       content: blog.description, // Replace with full content if available
                      //     },
                      //   },
                      // })
                    }
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </main>
      ) : (
        <div className="auth-prompt">
          <h2>Welcome to Insight Hub</h2>
          <p>Please log in to access curated content and analysis</p>
        </div>
      )}
      </div>
    ) : (
      <div className="login-prompt">
        🔒 Please login to view your profile
      </div>
    )}
  </div>
);
};

export default Profile;
