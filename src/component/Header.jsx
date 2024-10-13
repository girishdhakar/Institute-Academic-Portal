import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import "./header.css";

const Header = ({ sidebarOpen, setSidebarOpen,setBarClicked}) => {

  const navigate = useNavigate();
  
  function handleBarClick({}){
    if(sidebarOpen){
      setBarClicked(false);
      setSidebarOpen(false); 
    }
    else{
      setBarClicked(true);
      setSidebarOpen(true);
    }
  }

  return (
      <div className="header">
        <div className="header-left">
            <FontAwesomeIcon icon={faBars} className="header-icon" onClick={handleBarClick} />
        </div>
        {/* <button onClick={()=>navigate("/")}>Login</button>
        <button onClick={()=>navigate("/register")}>Register</button> */}
        {/* <div className="header-right">
            <FontAwesomeIcon icon={faSignOutAlt} className="header-icon signout-icon" />
        </div> */}
      </div>
  );
};

export default Header;
