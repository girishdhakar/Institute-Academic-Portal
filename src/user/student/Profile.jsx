import React from 'react';
import "./StudHome.css";

const Profile = ({userDetail}) => {
  var userName = userDetail.email.split("@")[0];
  console.log("user detail : ", userDetail);
  return (
    <div className="profile-class">
          <div className="profile-class-2">
            <div className="profile-heading">
              <h5 className="profile-heading-text">User Profile ({userName})</h5>
            </div>  
            <div className="table-class">
              <div className="user-detail">
                <img src="/dummy-profile.jpeg" />
                <div style={{color:"black"}}>                
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
                      <td><strong>email id</strong></td>
                      <td>{userDetail.email}</td>
                  </tr>
                  <tr>
                      <td><strong>Mobile No</strong></td>
                      <td>{userDetail.mobileNo}</td>
                  </tr>
                  {(userDetail.department)?
                    (<tr>
                      <td><strong>Department</strong></td>
                      <td>{userDetail.department}</td>
                    </tr>): null}
                  
                  {(userDetail.address)?
                    (<tr>
                      <td><strong>Address</strong></td>
                      <td>{userDetail.address}</td>
                    </tr>): null}
                      </tbody>
                  </table>
                </div>

              </div>              
          </div>
          </div>          
        </div>
  );
}

export default Profile;
