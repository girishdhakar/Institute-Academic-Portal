import React from 'react';
import "../../component/dataTable.css";

const StudentTable = ({ data, setData, editMode }) => {
  const handleInputChange = (e, index, field) => {
    const newData = [...data];
    newData[index][field] = e.target.value;
    setData(newData);
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Batch</th>
          <th scope="col">Department</th>
          <th scope="col">RollNo</th>
          <th scope="col">Name</th>
          <th scope="col">Semester</th>
          <th scope="col">Course ID</th>
          <th scope="col">Course Name</th>
          <th scope="col">Grade</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 && data.map((row, index) => (
          <tr key={index}>
            <td>{row.batch}</td>
            <td>{row.department}</td>
            <td>{row.roll_no}</td>
            <td>{row.name}</td>
            <td>
              {editMode ? (
                <input
                  type="text"
                  value={row.semester}
                  onChange={(e) => handleInputChange(e, index, 'semester')}
                  required
                />
              ) : (
                row.semester
              )}
            </td>
            <td>
              {editMode ? (
                <input
                  type="text"
                  value={row.course_id}
                  onChange={(e) => handleInputChange(e, index, 'course_id')}
                  required
                />
              ) : (
                row.course_id
              )}
            </td>
            <td>
              {editMode ? (
                <input
                  type="text"
                  value={row.course_name}
                  onChange={(e) => handleInputChange(e, index, 'course_name')}
                />
              ) : (
                row.course_name
              )}
            </td>
            <td>
              {editMode ? (
                <input
                  type="text"
                  value={row.grade}
                  onChange={(e) => handleInputChange(e, index, 'grade')}
                  required
                />
              ) : (
                row.grade
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
