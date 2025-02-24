// Navbar.tsx
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout as logoutAction } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state);
  const navigate = useNavigate();
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

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Navigate to the SearchResults page with the query as a URL parameter
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
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
              <Link style={{ textDecoration: "none" }} to="/">
                <p>HOME</p>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/api/news">
                <p>NEWS</p>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/about">
                <p>ABOUT</p>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/contact">
                <p>CONTACT</p>
              </Link>
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
                  src={"http://localhost:5000" + auth.profilePicUrl}
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




// import React, { useEffect } from "react";
// import "./Navbar.css";
// import logo from "../../assets/logo.png";
// import profile_picture from "../../assets/profile_picture.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { UseDispatch } from "react-redux";
// import {logout as logoutAction} from "../../actions/authActions";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

// const Navbar = () => {

//   const dispatch = useDispatch();
//   const auth = useSelector((state: RootState) => state);
//   const navigate = useNavigate();
//   let userLoggedIn : boolean = auth.isAuthenticated;

//   useEffect(()=>{
//     userLoggedIn = auth.isAuthenticated;
//   },[auth.isAuthenticated]
//   );

//   const logout = async () => {
//     try {
//       // alert("Token from localStorage:"+ token);
//       const response = await axios.post("http://localhost:5000/api/auth/logout", {}, { headers: { Authorization: `Bearer ${auth.token}` } })
//     console.log(response.data.message);
//     dispatch(logoutAction());
//     alert("Logout successful.");
//     navigate("/api/auth/login");
//     } catch (error) {
//       console.log(error);
//     }

//   };

//   return (
//     <nav className="nav-bar">
//       <img className="logo" src={logo} alt="" />
//       <div className="nav-middle-div">
//         <Link style={{ textDecoration: "none" }} to="/">
//           <p>HOME</p>
//         </Link>
//         <Link style={{ textDecoration: "none" }} to="/api/news">
//           <p>NEWS</p>
//         </Link>
//         <Link style={{ textDecoration: "none" }} to="/about">
//           <p>ABOUT</p>
//         </Link>
//         <Link style={{ textDecoration: "none" }} to="/contact">
//           <p>CONTACT</p>
//         </Link>
//       </div>
//       <div className="login-profile-div">

//         {userLoggedIn?
//         <Link to="api/auth/logout">
//         <button onClick={logout}>Logout</button>
//       </Link>
//       : <Link to="api/auth/login">
//       <button>Login</button>
//       </Link> }
        
        
//         <Link to="/profile">
//           <img className="profile_picture" src={"http://localhost:5000"+auth.profilePicUrl} alt="" />
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
