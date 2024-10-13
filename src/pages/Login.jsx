import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ setUserDetail, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [userType, setUserType] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    const formData = { userType, email, password };

    try {
      const response = await axios.post('http://localhost:3000/submit-login', formData);

      const user = response.data;

      if (response.status === 200) {
        const userDetails = {
          userType: userType,
          userID: user.userID,
          name: user.name,
          email: user.email,
          mobileNo: user.mobileNo
        };
        
        setIsLoggedIn(true);
        setUserDetail(userDetails);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userDetail', JSON.stringify(userDetails));   
        const redirectTo = location.state?.from || '/home';
        navigate(redirectTo);
      } else {
        setServerError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        setServerError('Invalid email or password');
      } else {
        setServerError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-field">
          <select
            className={`${!userType ? 'is-invalid' : ''}`}
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="" disabled hidden></option>
            <option>Student</option>
            <option>Instructor</option>
            <option>Admin</option>
          </select>
          <label>Select user type</label>
        </div>
        <div className="input-field">
          <input
            type="email"
            className={`${emailError ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Enter your email</label>
          {emailError && <div className="invalid-feedback">{emailError}</div>}
        </div>
        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Enter your password</label>
        </div>
        <div className="forget">
          <label htmlFor="remember">
            <p className="ms-0">
              Remember me<span><input type="checkbox" id="remember" /></span>
            </p>
          </label>          
        </div>
        
        {serverError && (
          <div className="alert alert-danger" role="alert">
            {serverError}
          </div>
        )}
        <button type="submit" className="btn btn-primary">Log In</button>
        <a href="#" className='forgot-password'>forgot password?</a>
        <div className="register">            
          <p>Don't have an account? <a href="./register">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
