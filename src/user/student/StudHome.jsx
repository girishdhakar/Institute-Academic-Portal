import React, { useState } from "react";
import "./StudHome.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Login from "../../pages/Login";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Sidebar from "./StudSidebar";
import Profile from "./Profile";
import Academic from "./Academic";

const StudHome = ({ userDetail, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [barClicked, setBarClicked] = useState(false);
  const [homeDisplay, setHomeDisplay] = useState('Academic Home');

  function handleLogout() {    
    // console.log("handle Logout called");
    setIsLoggedIn(false);
    navigate("/");
    return;
  }

  function handleLogin() {
    return navigate("/");
  }

  return (
    <div id="home-page-root">
      <div className={`home-page-left ${barClicked ? 'open-left' : ''}`}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} barClicked={barClicked} handleLogout={handleLogout} setHomeDisplay={setHomeDisplay}/>
      </div>
      <div className={`home-page-right ${barClicked ? 'open-right' : ''}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setBarClicked={setBarClicked} />
        {homeDisplay === 'Academic Home' ? (
          <Academic userDetail={userDetail}/>
        ) : homeDisplay === 'Profile' ? (
          <Profile userDetail={userDetail}/>
        ) : null}
        <Footer />
      </div>
    </div>
  );
};

export default StudHome;
