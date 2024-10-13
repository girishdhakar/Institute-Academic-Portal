import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './AdminSidebar.css';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, barClicked, handleLogout, setHomeDisplay }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} onMouseEnter={() => (!barClicked ? setIsOpen(true) : null)} onMouseLeave={() => (!barClicked ? setIsOpen(false) : null)}>
      <div className="university-logo sidebar-item">
        <img src="/university-logo.jpg" alt="University Logo"/>
        <span>Academic Section, U'sN</span>
      </div>
      <div className="sidebar-item" onClick={() => setHomeDisplay('Profile')}>
        <img src="user-profile.png" alt="Profile Icon"/>
        <span>Profile</span>
      </div>

      <div className="sidebar-item" onClick={() => setHomeDisplay('Academic Home')}>
        <img src="calendar-3.png" alt="Academic Home Icon"/>
        <span>Academic Home</span>
      </div>

      <div className="sidebar-item" onClick={() => setHomeDisplay('Student')}>
        <img src="/edit-user-2.png" alt="Academic Home Icon" style={{backgroundColor:"#36BA98"}}/>
        <span>View/Edit Student</span>
      </div>
      {/* <div className={`sidebar-item dropdown ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <img src="dropdown-icon.png" alt="Dropdown Icon"/>
        <span>View Options</span>
        <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} className="dropdown-icon" />
        {isDropdownOpen && (
          <div className="dropdown-menu"> Hello
            <div className="dropdown-item" onClick={() => setHomeDisplay('View Student')}>View Student</div>
            <div className="dropdown-item" onClick={() => setHomeDisplay('View Class')}>View Class</div>
            <div className="dropdown-item" onClick={() => setHomeDisplay('View Batch')}>View Batch</div>
          </div>
        )}
      </div>
      <div className="sidebar-item input-field">
        <img src="user-profile.png" alt="Profile Icon"/>
        
        <span>
        <select>
            <option value="" disabled hidden></option>
            <option>Student</option>
            <option>Instructor</option>
            <option>Admin</option>   
            <label>Select user type</label>       
            </select>
        </span>  
        </div> */}
      <div className="sidebar-item" onClick={() => handleLogout()}>
        <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
