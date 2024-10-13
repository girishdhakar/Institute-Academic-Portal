import React, { useState, useEffect } from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  console.log("value of isLoggedIn : ", isLoggedIn);

  // Retrieve login state from localStorage when the component mounts
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserDetail = localStorage.getItem('userDetail');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      setUserDetail(JSON.parse(storedUserDetail));
    }
  }, []);

  // Update localStorage whenever the login state or user details change
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('userDetail', JSON.stringify(userDetail));
  }, [isLoggedIn, userDetail]);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <Navigate to="/home" /> : <Login setUserDetail={setUserDetail} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route 
            path="/register" 
            element={isLoggedIn ? <Navigate to="/home" /> : <Register />} 
          />
          <Route 
            path="/home"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userDetail={userDetail} setUserDetail={setUserDetail} />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
