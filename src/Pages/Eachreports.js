
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,useHistory } from 'react-router-dom';
import axios from 'axios';
import './eachreports.css'
const Eachreports = () => {
  const navigate = useHistory();
  const { studentName } = useParams();
  const [student, setStudent] = useState(null);
  const [data, setData] = useState({
    studentname: '',
    roll_no: '',
    class: '',
    section: '',
    address: '',
  });
  const [additionalSubjects, setAdditionalSubjects] = useState([
    'English', 'Telugu', 'Maths', 'Physics', 'Chemistry', 'Biology', 'Social Studies'
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8081/api/saveclass`, data);
      alert("Data saved ");
      console.log('Successful');
    } catch (error) {
      alert("Error while saving the data");
      console.error("Error while saving the reports: ", error);
    }
  };

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/gettingbyname/${studentName}`);
        const fetchedStudent = response.data[0];
        if (!fetchedStudent) {
          const defaultStudent = {
            studentname: studentName,
            roll_no: '',
            address: '',
            section: '',
            class: '',
          };
          setStudent(defaultStudent);
        } else {
          setStudent(fetchedStudent);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [studentName]);

  return (
    <div className='hole-content' id='each-report-form'>
      <h2>Student Information</h2>
      {student && (
        <div>
          <p>Name: {student.studentname}</p>
          <p>Roll No: {student.roll_no}</p>
          <p>Address: {student.address}</p>
          <p>Class: {student.grade}</p>
          <p>Section: {student.section}</p>
          <h3>Subjects</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Obtained Marks</th>
                <th>Total Marks</th>
                <th>Grade</th>
                <th>Remarks</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {student.class2entity.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.subject}</td>
                  <td>
                    <input
                      type="text"
                      value={subject.subject_obtained_marks}
                      onChange={(e) => handleInputChange(index, 'subject_obtained_marks', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={subject.subject_total_marks}
                      onChange={(e) => handleInputChange(index, 'subject_total_marks', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={subject.grade}
                      onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={subject.remarks}
                      onChange={(e) => handleInputChange(index, 'remarks', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={subject.percentage}
                      onChange={(e) => handleInputChange(index, 'percentage', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Additional Subjects</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Obtained Marks</th>
                <th>Total Marks</th>
                <th>Grade</th>
                <th>Remarks</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {additionalSubjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject}</td>
                  <td>
                    <input
                      type="text"
                      value={data[`additional_${index}_obtained_marks`] || ''}
                      onChange={(e) => handleInputChange(`additional_${index}_obtained_marks`, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data[`additional_${index}_total_marks`] || ''}
                      onChange={(e) => handleInputChange(`additional_${index}_total_marks`, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data[`additional_${index}_grade`] || ''}
                      onChange={(e) => handleInputChange(`additional_${index}_grade`, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data[`additional_${index}_remarks`] || ''}
                      onChange={(e) => handleInputChange(`additional_${index}_remarks`, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data[`additional_${index}_percentage`] || ''}
                      onChange={(e) => handleInputChange(`additional_${index}_percentage`, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <button className='back-btn' onClick={() => navigate.push("/reports-new")}>Back</button>
    </div>
  );
};

export default Eachreports;
