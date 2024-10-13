import React, { useState, useEffect } from 'react';
import DataTable from "../../component/DataTable";
import "./InstrHome.css";
import axios from 'axios';
import StudentTable from '../admin/StudentTable';

const Academic = ({ userDetail }) => {
  const [batchNo, setBatchNo] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [userIDError, setUserIDError] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("inside Useeffect");
    const fetchData = async () => {
        const studentDetails = { batch: batchNo, class: studentClass, rollNo: rollNo };

        console.log("studentDetails : ", studentDetails);
        
        try {
          setLoading(true);
          const response = await axios.post('http://localhost:3000/student-admin', studentDetails);
          setStudentData(response.data);
          console.log("studentData in Academic : ",studentData);
        } catch (error) {
          console.error('Error fetching academic data:', error);
          setUserIDError('Error fetching academic data');
        } finally {
          setLoading(false);
        }
      
    };

    fetchData();
  }, [batchNo, studentClass, rollNo]);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  const userName = userDetail.email.split("@")[0];

  return (
    <div className="profile-class">
      <div className="profile-class-2">
        <div className="profile-heading">
          <h5 className="profile-heading-text">View Student Academic</h5>
        </div>

        <div className="table-class" >
          <div className="view-students" style={{ color: 'black' }}>
            <div className="input-field">
              <select
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                style={{ color: 'black' }}
              >
                <option value="" disabled hidden></option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
              </select>
              <label style={{ color: "black" }}>View Students by Batch</label>
            </div>

            <div className="input-field">
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                style={{ color: 'black' }}
              >
                <option value="" disabled hidden></option>
                <option>Computer Science and Engineering</option>
                <option>Electrical Engineering</option>
                <option>Mechanical Engineering</option>
                <option>Chemical Engineering</option>
                <option>Civil Engineering</option>
              </select>
              <label style={{ color: "black" }}>View Students by Class</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                className={`${userIDError ? "is-invalid" : ""}`}
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                style={{ color: 'black' }}
              />
              <label style={{ color: "black" }}>View Student by Roll No</label>
              {userIDError && <div className="invalid-feedback">{userIDError}</div>}
            </div>

            <div className="data-table">
              {studentData.length > 0 && <StudentTable data={studentData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academic;
