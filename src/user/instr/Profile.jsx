import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import "./InstrHome.css";

const Profile = ({ userDetail }) => {
  const [instrCourses, setInstrCourses] = useState([]);

  const userName = userDetail.email.split("@")[0];
  console.log("user detail:", userDetail);

  useEffect(() => {
    const fetchCourseTaught = async () => {
      try {
        const response = await axios.post('http://localhost:3000/instr-courses', userDetail);
        setInstrCourses(response.data);
        console.log("instr courses in profile response.data:", response.data);
        console.log("instr courses in profile instrCorses:", instrCourses); // Log the response data directly
      } catch (error) {
        console.log("Error fetching courses taught by instr in instructor's profile");
      }
    };

    if (userDetail) {
      fetchCourseTaught();
    }
  }, [userDetail]); // Dependency array ensures useEffect runs when userDetail changes

  return (
    <div className="profile-class">
      <div className="profile-class-2">
        <div className="profile-heading">
          <h5 className="profile-heading-text">User Profile ({userName})</h5>
        </div>
        <div className="table-class">
          <div className="user-detail">
            <img src="/dummy-profile.jpeg" alt="Profile" />
            <div style={{ color: "black" }}>
              <h5>General Information</h5>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td>{userDetail.name}</td>
                  </tr>
                  <tr>
                    <td><strong>Roll Number</strong></td>
                    <td>{userDetail.userID}</td>
                  </tr>
                  <tr>
                    <td><strong>Email ID</strong></td>
                    <td>{userDetail.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Mobile No</strong></td>
                    <td>{userDetail.mobileNo}</td>
                  </tr>
                  {userDetail.department && (
                    <tr>
                      <td><strong>Department</strong></td>
                      <td>{userDetail.department}</td>
                    </tr>
                  )}
                  {userDetail.address && (
                    <tr>
                      <td><strong>Address</strong></td>
                      <td>{userDetail.address}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ color: "black" }}>
            <h5>Courses Teaching</h5>
              <table>
                <thead>
                  <tr>
                    <th scope="col">CourseID</th>
                    <th scope="col">CourseName</th>
                    <th scope="col">Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {instrCourses.map((row, index) => (
                    <tr key={index}>
                      <td>{row.course_id}</td>
                      <td>{row.course_name}</td>
                      <td>{row.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
