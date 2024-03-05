import React, { useState, useEffect } from 'react';
import './Teacherepo.css';
import axios from 'axios';
import { useNavigate,useHistory } from 'react-router-dom';

const Newreports = () => {
  const history = useHistory();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [reportCard, setReportCard] = useState([]);

  useEffect(() => {
    generateReport();
  }, [selectedClass, selectedSection]);

  const generateReport = async () => {
    try {
      let responseStudents;
      if (!selectedClass && !selectedSection) {
        responseStudents = await axios.get(`http://localhost:8081/api/gettingalldata`);
      } else {
        responseStudents = await axios.get(`http://localhost:8081/api/gettingclass/${selectedClass}/${selectedSection}`);
      }
      const students = responseStudents.data;

      const report = students.map((student, index) => (
        <tr key={index}>
          <td className='tab-dat'>{student.roll_no}</td>
          <td className='tab-dat'>{student.studentname}</td>
          <td className='tab-dat'>
            {student.class2entity.length > 0 ? `${student.class2entity[0]?.obtained_marks}/${student.class2entity[0]?.total_marks}` : ''}
          </td>
          <td className='tab-dat'>
            {student.class2entity.length > 0 ? `${student.class2entity[0]?.percentage}%` : ''}
          </td>
          <td className='tab-dat'>
            {student.class2entity.length > 0 ? student.class2entity[0]?.grade : ''}
          </td>
          <td className='tab-dat'>
            <button className="button1" onClick={() => handleClick(student.studentname)}>
              Reports
            </button>
          </td>
        </tr>
      ));

      setReportCard(report);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  
  const handleClick = (studentName) => {
    history.push(`/reports-each/${studentName}`);
  };

  return (
    <div className="container" id='report-form-new'>
      <div className="form-group">
        <label htmlFor="classSelect" className="labelname">Select Class:</label>
        <select
          id="classSelect"
          className="selectname"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="3">Class 3</option>
          <option value="4">Class 4</option>
          <option value="5">Class 5</option>
          <option value="6">Class 6</option>
          <option value="7">Class 7</option>
          <option value="8">Class 8</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>
        <label htmlFor="sectionSelect" className="labelname">Select Section:</label>
        <select
          id="sectionSelect"
          className="selectname"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        {/* <button className="button2" onClick={generateReport}>
          Generate Report
        </button> */}
      </div>
      {reportCard.length > 0 && (
        <div className="report-card">
          
          <table className='tab-con'>
            <thead>
              <tr className='tan-tab'>
                <th className='tab-dat'>Rollno</th>
                <th className='tab-dat'>Student Name</th>
                <th className='tab-dat'>Marks</th>
                <th className='tab-dat'>Percentage</th>
                <th className='tab-dat'>Grade</th>
                <th className='tab-dat'></th>
              </tr>
            </thead>
            <tbody>{reportCard}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Newreports;
