import React from 'react';
import "./dataTable.css"

const DataTable = ({ data }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Takes ID</th>
          <th scope="col">Course ID</th>
          <th scope="col">Course Name</th>
          <th scope="col">Semester</th>
          <th scope="col">Grade</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.takes_id}</td>
            <td>{row.course_id}</td>
            <td>{row.course_name}</td>
            <td>{row.semester}</td>
            <td>{row.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

