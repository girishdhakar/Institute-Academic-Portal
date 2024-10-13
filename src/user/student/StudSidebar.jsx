import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './StudSidebar.css';
import { useNavigate } from "react-router-dom";

const Sidebar = ({isOpen, setIsOpen, barClicked, handleLogout, setHomeDisplay}) => {
    
    const navigate = useNavigate();

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`} onMouseEnter={() => (barClicked ? (null):setIsOpen(true))} onMouseLeave={() => (barClicked ? (null):setIsOpen(false))}>
            <div className="university-logo sidebar-item">
                <img src="/university-logo.jpg"/>
                <span>Academic Section, U'sN</span>
            </div>
            <div className="sidebar-item" onClick={()=>setHomeDisplay('Profile')}>
                <img src="user-profile.png"/>
                <span>Profile</span>
            </div>
            <div className="sidebar-item" onClick={()=>setHomeDisplay('Academic Home')}>
                <img src="calendar-3.png"/>
                <span>Academic Home</span>
            </div>
            <div className="sidebar-item" onClick={()=>handleLogout()}>
                <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;
