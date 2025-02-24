import React, { useState } from "react";
import axios from "axios";
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/sign-up", 
        { email, password }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Get started with your free account</p>
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
            onClick={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                Sign Up
                <FiArrowRight className="button-icon" />
              </>
            )}
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <a href="/api/auth/login" className="auth-link">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


// import React, { useState } from "react";
// import axios from "axios";

// const SignUp: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignUp = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/sign-up", { email, password });
//       alert(response.data.message);
//     } catch (error) {
//       alert("Signup failed. Please try again. "+error);
//     }
//   };

//   return (
//     <div className="signup">
//       <h2>Sign Up</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignUp}>Sign Up</button>
//       <a href="/login">Login</a>
//     </div>
//   );
// };

// export default SignUp;
