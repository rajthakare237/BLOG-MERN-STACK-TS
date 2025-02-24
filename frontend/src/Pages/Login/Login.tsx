import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import './Login.css';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        const { userName, userBio, userPic, token } = data;
        dispatch(login(email, token, userName, userBio, userPic));
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Error during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>

        <div className="auth-form">
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            className="auth-button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                Sign In
                <FiArrowRight className="button-icon" />
              </>
            )}
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <a href="/api/auth/sign-up" className="auth-link">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



// // components/Login.tsx
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../../actions/authActions';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log("The data printed is: ", data);
//       if (response.ok) {
//         const { userName, userBio, userPic, token } = data;
//         alert(`Login successful! Your token is: ${token}`);
//         // Dispatch login action to Redux store.
//         dispatch(login(email, token, userName, userBio, userPic));
//         navigate('/');
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (error) {
//       alert('Error during login. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;




// // import React, { useState } from 'react';
// // import { login } from '../../actions/authActions';
// // import { store } from '../../store/index';
// // import { useNavigate } from 'react-router-dom';

// // const Login: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   const handleLogin = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //       });
  
// //       const data = await response.json();
// //       console.log("The data printed is: "+data);
// //       if (response.ok) {

// //         const {userName, userBio, userPic, token} = data
// //         // Save the token in localStorage for persistence
// //         localStorage.setItem("authToken", token);
// //         localStorage.setItem("email", email);
// //         localStorage.setItem("bio", userBio);
// //         localStorage.setItem("username", userName);
// //         localStorage.setItem("profilePic", userPic);
  
// //         // Display the token in an alert
// //         alert(`Login successful! Your token is: ${data.token}`);
  
// //         // Dispatch login action to the Redux store
// //         store.dispatch(login(email, token, userName, userBio, userPic));

// //         navigate("/")
// //       } else {
// //         alert(data.message || 'Login failed');
// //       }
// //     } catch (error) {
// //       alert('Error during login. Please try again.');
// //     }
// //   };
  
  

// //   // Listen for state changes
// //   store.subscribe(() => {
// //     setIsAuthenticated(store.getState().isAuthenticated);
// //   });

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <input
// //         type="email"
// //         placeholder="Enter your email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //       />
// //       <input
// //         type="password"
// //         placeholder="Enter your password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       <button onClick={handleLogin}>Login</button>
// //       <p>{isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
// //     </div>
// //   );
// // };

// // export default Login;
