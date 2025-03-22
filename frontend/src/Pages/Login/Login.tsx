import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import './Login.css';



const backend_url = import.meta.env.VITE_BACKEND_URL;

const Login: React.FC = () => {
  const dispatch = useDispatch(); // Redux dispatch to trigger login action
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestLogin = () => {
    setIsLoading(true);
    dispatch(login("guest@gmail.com", "guestToken", "guest", "This is a guest account", "https://res.cloudinary.com/dc3sxqqjg/image/upload/v1742625370/hw2rd7pepiena51fne88.jpg"));
    navigate('/');
    setIsLoading(false);

  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backend_url}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        const { userName, userBio, userPic, token } = data;
        // Dispatch login action to update Redux store
        dispatch(login(email, token, userName, userBio, userPic));
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch {
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
          <button 
            className="auth-button"
            onClick={handleGuestLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                Continue as a Guest
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

