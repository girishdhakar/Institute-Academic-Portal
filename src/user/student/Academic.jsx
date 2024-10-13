import React, { useEffect, useState } from 'react';
import DataTable from "../../component/DataTable";
import "./StudHome.css";
import axios from 'axios';

const Academic = ({ userDetail }) => {
  const [academicData, setAcademicData] = useState([]);

  useEffect(() => {
    const fetchAcademicData = async () => {
      if (userDetail && userDetail.userID) {
        try {
          console.log("userDetail in Academic:", userDetail);
          const response = await axios.post('http://localhost:3000/student-academic',userDetail);
          setAcademicData(response.data);
        } catch (error) {
          console.error('Error fetching academic data:', error);
        }
      }
    };

    fetchAcademicData();
  }, [userDetail]);

  // if (!userDetail) {
  //   return <div>Loading...</div>;
  // }

  const userName = userDetail.email.split("@")[0];

  return (
    <div className="profile-class">
      <div className="profile-class-2">
        <div className="profile-heading">
          <h5 className="profile-heading-text">My Academic Profile ({userName})</h5>
        </div>
        <div className="table-class">
          <div className="roll-number">{userDetail.userID}</div>
          <div className="data-table">
            <DataTable data={academicData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academic;
