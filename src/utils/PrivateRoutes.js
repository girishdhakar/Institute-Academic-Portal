import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("notLoggedIn, redirecting to login page")
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    console.log("notLoggedIn, redirecting to login page")
    return navigate('/');
  }

  return children;
};

export default PrivateRoute;
