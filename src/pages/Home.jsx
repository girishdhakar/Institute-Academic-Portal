import React, { useEffect } from 'react';
import StudHome from '../user/student/StudHome';
import { useNavigate } from "react-router-dom";
import InstrHome from '../user/instr/InstrHome';
import AdminHome from '../user/admin/AdminHome';

const Home = ({ userDetail, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetail) {
      navigate('/');
    }
  }, [userDetail, navigate]);

  console.log("inside Home");
  console.log("userDetail in Home", userDetail);

  if (!userDetail) {
    return null; // or loading indicator while navigating
  }

  return (
    (userDetail.userType === 'Student') ?
      <StudHome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userDetail={userDetail} /> :
      (userDetail.userType === 'Instructor') ?
        <InstrHome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userDetail={userDetail} /> :
        <AdminHome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userDetail={userDetail} />
  );
};

export default Home;
