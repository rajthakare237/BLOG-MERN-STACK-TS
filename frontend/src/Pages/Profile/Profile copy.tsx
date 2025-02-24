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
  const [isLoggedIn, setIsLoggedIn] = useState(store.getState().isAuthenticated);
  const navigate = useNavigate();

  const [email, setEmail] = useState(auth.email);
  const [username, setUsername] = useState(auth.username);
  const [bio, setBio] = useState(auth.bio);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(
    auth.profilePicUrl ? "http://localhost:5000" + auth.profilePicUrl : ""
  );
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);

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
    const formData = new FormData();
    formData.append("email", email || "");
    formData.append("username", username || "");
    formData.append("bio", bio || "");
    if (newProfilePic) {
      formData.append("profilePic", newProfilePic);
    }

    try {
      const response = await fetch("http://localhost:5000/api/updateProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePic("http://localhost:5000" + data.profilePicUrl);
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
      const response = await axios.delete(`http://localhost:5000/blogs/delete/${blogId}`, {
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
                  Save Changes
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
        <div className="dashboard-layout">
          <main className="blog-grid">
            {blogs.map((blog) => (
              <article className="blog-card" key={blog._id}>
                <button className="deleteButton" onClick={()=>deleteBlog(blog._id)}>Delete</button>
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
        </div>
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




// import React, { useEffect, useState } from "react";
// import "./Profile.css";
// import profile_pic from "../../assets/profile_picture.jpg";
// import { store } from "../../store/index";
// import {uploadImage } from "../../services/blogService";
// import { stringify } from "querystring";

// const Profile = () => {
//   const [email, setEmail] = useState(store.getState().email);
//   const [username, setUsername] = useState(store.getState().username);
//   const [bio, setBio] = useState(store.getState().bio);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profilePic, setProfilePic] = useState("http://localhost:5000"+store.getState().profilePicUrl);
//   const [newProfilePic, setNewProfilePic] = useState<File | null>(null);


//   const handleSave = async () => {

    

//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("username", username);
//     formData.append("bio", bio);
//     if (newProfilePic) {
//       formData.append("profilePic", newProfilePic);
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/updateProfile", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setProfilePic("http://localhost:5000"+data.profilePicUrl);
//         setIsEditing(false);

//         if(username) localStorage.setItem("username", username);
//         if(bio) localStorage.setItem("bio", bio);
//         if(newProfilePic) localStorage.setItem("profilePic", data.profilePicUrl);

//       } else {
//         console.error("Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Error while saving profile:", error);
//     }
//   };

//   // const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (event.target.files && event.target.files[0]) {
//   //     setNewProfilePic(event.target.files[0]);
//   //     setProfilePic(URL.createObjectURL(event.target.files[0]));
//   //   }
//   // };

//   // const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (event.target.files && event.target.files[0]) {
//   //     try {
//   //       const response = await uploadImage(event.target.files[0]);
//   //       // setImageUrl(response.data.imageUrl);
//   //       setNewProfilePic(response.data.imageUrl);
//   //       setProfilePic(response.data.imageUrl);
//   //     } catch (error) {
//   //       console.error("image upload failed", error);
//   //     }
//   //   }
//   // };

//   const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if(event.target.files && event.target.files[0]){
//       const file = event.target.files[0];
//       setNewProfilePic(file);
//       setProfilePic(URL.createObjectURL(file));
//       // alert("  "+profilePic);
//     }
//   };

//   return (
//     <div className="profile">
//       <div className="profile-header">
//         <label htmlFor="profilePicInput">
//           <img className="profile_pic" src={profilePic?.toString()} alt="Profile" />
//         </label>
//         {isEditing && (
//           <input
//             id="profilePicInput"
//             type="file"
//             accept="image/*"
//             onChange={handleProfilePicChange}
//             style={{display: "none"}}
//           />
//         )}
//       </div>
//       <div className="profile-details">
//         {isEditing ? (
//           <input
//             type="text"
//             value={username?.toString()}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         ) : (
//           <p>{username}</p>
//         )}
//         <p>{email}</p>
//         {isEditing ? (
//           <textarea
//             value={bio?.toString()}
//             onChange={(e) => setBio(e.target.value)}
//           />
//         ) : (
//           <p>{bio}</p>
//         )}
//       </div>
//       <div className="profile-actions">
//         {isEditing ? (
//           <>
//             <button onClick={handleSave}>Save</button>
//             <button onClick={() => setIsEditing(false)}>Cancel</button>
//           </>
//         ) : (
//           <button onClick={() => setIsEditing(true)}>Edit</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;




// // import React, { useState } from "react";
// // import "./Profile.css";
// // import profile_pic from "../../assets/profile_picture.jpg";
// // import {store} from "../../store/index"

// // const Profile = () => {

// //   const [email, setEmail] = useState(store.getState().email);

// //   return (
// //     <div className="profile">
// //       <img className="profile_pic" src={profile_pic} alt="" />
// //       <p>ironman23</p>
// //       <p>{email}</p>
// //       <p>
// //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
// //         iaculis mauris. Curabitur ac magna sit amet urna dictum fermentum. Nulla
// //         facilisi. Nam convallis, lacus id cursus varius, dolor felis tincidunt
// //         libero, sed fermentum sapien libero et felis. Suspendisse potenti. Sed
// //         in urna id leo congue pharetra ut ac ligula. In varius erat ut libero
// //         malesuada, nec facilisis ex posuere. Duis consectetur, nunc id aliquam
// //         varius, mauris lorem tincidunt magna, vel efficitur nulla nisi non
// //         lacus.
// //       </p>
// //     </div>
// //   );
// // };

// // export default Profile;
