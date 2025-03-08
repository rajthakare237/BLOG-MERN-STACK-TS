// Navbar.tsx
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout as logoutAction } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store"; // Importing RootState to define the shape of the global store

const Navbar = () => {
  const dispatch = useDispatch(); // Initializing dispatch function for dispatching actions to Redux store
  const auth = useSelector((state: RootState) => state); // Accessing global authentication state from Redux store
  const navigate = useNavigate(); // Initializing navigate function for programmatic navigation
  const [searchTerm, setSearchTerm] = useState("");
  let userLoggedIn: boolean = auth.isAuthenticated;

  useEffect(() => {
    userLoggedIn = auth.isAuthenticated;
  }, [auth.isAuthenticated]);

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

  // Function to handle search submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission behavior
    // Navigate to the SearchResults page with the query as a URL parameter
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    // Clearing the search input field after submission
    setSearchTerm("");
  };

  return (
    <nav className="nav-bar">

      {userLoggedIn ? 
        (
          <>
            <div className="logoandname">
              <img className="logo" src={logo} alt="Logo" />
              <h2>Global Insight</h2>
            </div>
            
            <div className="nav-middle-div">
              <NavLink 
                style={({ isActive }) => ({ 
                  textDecoration: "none",
                  color: isActive ? '#007bff' : '#333' 
                })} 
                to="/"
              >
                <p>HOME</p>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({ 
                  textDecoration: "none",
                  color: isActive ? '#007bff' : '#333' 
                })}
                to="/api/news"
              >
                <p>NEWS</p>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({ 
                  textDecoration: "none",
                  color: isActive ? '#007bff' : '#333' 
                })}
                to="/about"
              >
                <p>ABOUT</p>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({ 
                  textDecoration: "none",
                  color: isActive ? '#007bff' : '#333' 
                })}
                to="/contact"
              >
                <p>CONTACT</p>
              </NavLink>
            </div>

            {/* Search Form */}
            <div className="search-div">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search blogs/news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
            </div>

            <div className="login-profile-div">

              <Link to="/profile">
                <img
                  className="profile_picture"
                  src={auth.profilePicUrl}
                  alt="Profile"
                />
              </Link>
            </div>
          </>
        )
        :
        (
          <div className="notLoggedInNav">
            <img className="logo1" src={logo} alt="Logo" />
            <h2>Global Insight</h2>
          </div>
        )
      }

      

    </nav>
  );
};

export default Navbar;
