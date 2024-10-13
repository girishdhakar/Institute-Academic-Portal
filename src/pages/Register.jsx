import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import { Link, useNavigate, useLocation} from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [userID, setUserID] = useState('');
  const [userIDError, setUserIDError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Simple validation
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    if (!name.trim()) {
      setNameError('Name is required.');
      return;
    } else {
      setNameError('');
    }

    if (!/^\d{10}$/.test(mobileNo)) {
      setMobileNoError('Please enter a valid 10-digit mobile number.');
      return;
    } else {
      setMobileNoError('');
    }

    if (!userID.trim()) {
      setUserIDError('User ID is required.');
      return;
    } else {
      setUserIDError('');
    }

    // Simulate a server request
    console.log('User Type:', userType);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Name:', name);
    console.log('Mobile No:', mobileNo);
    console.log('User ID:', userID);


    const formData ={userType, email, password, name, mobileNo, userID};

    try {
        const response = await axios.post('http://localhost:3000/submit-signup', formData);
        alert(response.data);

        const redirectTo = location.state?.from || '/';
        navigate(redirectTo);
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
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="row_wrapper">
          <div className="input-field">
            <select
              className={`${!userType ? "is-invalid" : ""}`}
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
              type="text"
              className={`${nameError ? "is-invalid" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Enter your full name</label>
            {nameError && <div className="invalid-feedback">{nameError}</div>}
          </div>
        </div>

        <div className="row_wrapper">
          <div className="input-field">
            <input
              type="text"
              className={`${userIDError ? "is-invalid" : ""}`}
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              required
            />
            <label>Enter your roll no./ID</label>
            {userIDError && <div className="invalid-feedback">{userIDError}</div>}
          </div>

          <div className="input-field">
            <input
              type="email"
              className={`${emailError ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Enter your email</label>
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>
        </div>

        <div className="row_wrapper">
          <div className="input-field">
            <input
              type="text"
              className={`${mobileNoError ? "is-invalid" : ""}`}
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
            <label>Enter your mobile no.</label>
            {mobileNoError && <div className="invalid-feedback">{mobileNoError}</div>}
          </div>

          <div className="input-field">
            <input
              type="password"
              className={`${passwordError ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Enter your password</label>
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
        </div>

        {serverError && (
          <div className="alert alert-danger" role="alert">
            {serverError}
          </div>
        )}

        <button type="submit" className="btn btn-primary">Register</button>
        <div className="register">
          <p>Already have an account? <a href="/">Sign In</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
