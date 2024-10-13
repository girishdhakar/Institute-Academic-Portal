import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentTable from './StudentTable';
import './ViewOrEditStudent.css';

const Academic = ({ userDetail }) => {
  const [batchNo, setBatchNo] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [userIDError, setUserIDError] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [actionType, setActionType] = useState('Student Academic');
  const [studentDetail, setStudentDetail] = useState([]);

  const [sname, setSName] = useState('');
  const [sroll, setSRoll] = useState('');
  const [semail, setSEmail] = useState('');
  const [sdepartment, setSDepartment] = useState('');
  const [smobile, setSMobile] = useState('');
  const [sbatch, setSBatch] = useState('');
  const [saddress, setSAddress] = useState('');

  const handleSubmitRollNo = async () => {

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/student-detail',{roll_no : rollNo});
      console.log("student details in hanlde submit roll no", response.data);
      setStudentDetail(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setUserIDError('Error fetching student details');
    }


    const studentDetails = { batch: batchNo, class: studentClass, rollNo: rollNo };
    try {
      const response = await axios.post('http://localhost:3000/student-admin', studentDetails);
      console.log("student data in hanle submit roll no", response.data);
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching academic data:', error);
      setUserIDError('Error fetching academic data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/save-student-data', studentData);
      console.log('Changes saved successfully!', response.data);
    } catch (error) {
      console.error('Error saving changes:', error);
      setUserIDError('Error saving changes');
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  const handleAddRow = () => {
    setStudentData([
      ...studentData,
      {
        batch: studentDetail[0]?.batch || '',
        department: studentDetail[0]?.department || '',
        roll_no: studentDetail[0]?.roll_no,
        name: studentDetail[0]?.name,
        semester: '',
        course_id: '',
        course_name: '',
        grade: '',
      },
    ]);
  };

  const handleAddNewStudent = async () => {
    const newStudent = {
      name: sname,
      roll_no: sroll,
      email: semail,
      department: sdepartment,
      mobileNo: smobile,
      batch: sbatch,
      address: saddress,
    };
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/add-student', newStudent);
      console.log('New student added successfully!', response.data);
    } catch (error) {
      console.error('Error adding new student:', error);
      setUserIDError('Error adding new student');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (rollNo) => {
    
    const confirmDelete = window.confirm(`Are you sure you want to delete student with Roll No: ${rollNo}?`);
    
    if (!confirmDelete) {
      return; // If user cancels, do nothing
    }

    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:3000/delete-student/${rollNo}`);
      console.log('Student deleted successfully!', response.data);
      
      setStudentData(studentData.filter(student => student.roll_no !== rollNo));
    } catch (error) {
      console.error('Error deleting student:', error);
      setUserIDError('Error deleting student');
    } finally {
      setLoading(false);
    }
  };


  if (!userDetail) {
    return <div style={{ color: 'black' }}>Loading...</div>;
  }

  const userName = userDetail.email.split('@')[0];

  return (
    <div className="profile-class">
      <div className="profile-class-2">
        <div className="profile-heading">
          <h5 className="profile-heading-text">View/Edit Students</h5>
        </div>

        {/* <div className="actionType">
          <button onClick={() => setActionType('Student Academic')} style={{ backgroundColor: '#80669d', margin: '5px' }}>Edit Existing Student</button>
          <button onClick={() => setActionType('Add New Student')} style={{ backgroundColor: '#33b249', margin: '5px' }}>Add New Student</button>
        </div> */}

        

        <div className="table-class">
        <div className="actionType">
          <button onClick={() => setActionType('Student Academic')} style={{ backgroundColor: '#80669d', marginLeft:'0px', margin: '20px' }}>Edit Existing Student</button>
          <button onClick={() => setActionType('Add New Student')} style={{ backgroundColor: '#33b249',marginLeft:'0px',  margin: '20px' }}>Add New Student</button>
        </div>

          {actionType === 'Student Academic' && (
            <div className="view-students">
              <div className='student-roll-no'>
                <div className="input-field">
                  <input
                    type="text"
                    className={userIDError ? 'is-invalid' : ''}
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    style={{ color: 'black' }}
                  />
                  <label style={{ color: 'black' }}>Enter Student's RollNo</label>
                  {userIDError && <div className="invalid-feedback">{userIDError}</div>}           
                </div>
                <button style={{ backgroundColor: '#4681f4', margin: '1px' , padding: '-2px', alignSelf:'right'}}  className="submitRollNo1" onClick={handleSubmitRollNo}>Submit</button>         
                
              </div>

              <div className="data-table">
                {(studentDetail[0]?.email &&
                  <StudentTable
                    data={studentData}
                    setData={setStudentData}
                    editMode={editMode}
                    onDelete={handleDeleteStudent}
                  />
                )}
              </div>

              {studentDetail[0] && !editMode && (
                <div className='edit-del'>                  
                  <button style={{ backgroundColor: '#5dbea3', margin: '5px' }} className="edit" onClick={() => setEditMode(true)}>Edit</button>
                  <button style={{ backgroundColor: 'red', margin: '5px' }} className="delete" onClick={() => handleDeleteStudent(studentDetail[0].roll_no)}>Delete Student</button>
                </div>
              )}
              {editMode && (
                <>
                  <button style={{ backgroundColor: '#5dbea3', margin: '5px' }} className="edit" onClick={handleAddRow}>Add Row</button>
                  <button style={{ backgroundColor: '#33b249', margin: '5px' }} className="save" onClick={handleSaveChanges} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          )}
          {actionType === 'Add New Student' && (
            <div className="view-students">
              <form onSubmit={handleAddNewStudent}>
                <div className="input-field">
                  <input
                    type="text"
                    value={sname}
                    onChange={(e) => setSName(e.target.value)}
                    required
                    style={{ color: 'black' }}
                  />
                  <label style={{ color: 'black' }}>Enter student's name</label>
                </div>

                <div className="input-field">
                  <input
                    type="email"
                    value={semail}
                    onChange={(e) => setSEmail(e.target.value)}
                    required
                    style={{ color: 'black' }}
                  />
                  <label style={{ color: 'black' }}>Enter student's email</label>
                </div>

                <div className="input-field">
                  <input
                    type="text"
                    value={sroll}
                    onChange={(e) => setSRoll(e.target.value)}
                    required
                    style={{ color: 'black' }}
                  />
                  <label style={{ color: 'black' }}>Enter student's roll no.</label>
                </div>

                <div className="input-field">
                  <input
                    type="text"
                    value={smobile}
                    onChange={(e) => setSMobile(e.target.value)}
                    required
                    style={{ color: 'black' }}
                  />
                  <label style={{ color: 'black' }}>Enter student's mobile no.</label>
                </div>

                <div className="input-field">
                  <select
                    value={sdepartment}
                    onChange={(e) => setSDepartment(e.target.value)}
                    style={{ color: 'black' }}
                    required
                  >
                    <option value="" disabled hidden></option>
                    <option>Computer Science and Engineering</option>
                    <option>Electrical Engineering</option>
                    <option>Mechanical Engineering</option>
                    <option>Chemical Engineering</option>
                    <option>Civil Engineering</option>
                  </select>
                  <label style={{ color: 'black' }}>Select student's department</label>
                </div>

                <div className="input-field">
                  <select
                    value={sbatch}
                    onChange={(e) => setSBatch(e.target.value)}
                    style={{ color: 'black' }}
                    required
                  >
                    <option value="" disabled hidden></option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                  </select>
                  <label style={{ color: 'black' }}>Select student's batch</label>
                </div>

                <div className="input-field">
                  <input
                    type="text"
                    value={saddress}
                    onChange={(e) => setSAddress(e.target.value)}
                    required
                    style={{ color: 'black' }}
                  />
                  <label style={{ color: 'black' }}>Enter student's address</label>
                </div>

                <button type="submit"  style={{backgroundColor:'#4681f4', width:'fit-content', padding:'-1px', marginBottom:'5px'}}disabled={loading}>
                  {loading ? 'Adding...' : 'Add Student'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academic;
