import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeeStructurePage.css';
import { Margin } from '@mui/icons-material';

const FeeStructurePage = () => {
  const [feeStructureData, setFeeStructureData] = useState([]);
  const [editingClassId, setEditingClassId] = useState(null);
  const [newClass, setNewClass] = useState('');
  const [admissionFee, setAdmissionFee] = useState('');
  const [tuitionFee, setTuitionFee] = useState('');
  const [examFee, setExamFee] = useState('');
  const [termFee, setTermFee] = useState('');
  const [newClassError, setNewClassError] = useState('');
  const [totalFee, setTotalFee] = useState('');
  const [admissionFeeError, setAdmissionFeeError] = useState('');
  const [tuitionFeeError, setTuitionFeeError] = useState('');
  const [examFeeError, setExamFeeError] = useState('');
  const [termFeeError, setTermFeeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalFeeError, setTotalFeeError] = useState('');
  const [addedClasses, setAddedClasses] = useState(new Set());
  // Error handling function
  const handleError = (error) => {
    console.error('Error:', error);
    // Add user-friendly error messages or UI updates
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8105/fees/details');
      setFeeStructureData(response.data);
      updateAddedClasses(response.data);
    } catch (error) {
      handleError(error);
    }
  };

const updateAddedClasses = (data) => {
  const classes = new Set(data.map((row) => row.className));
  setAddedClasses(classes);
};

// Input validation function
const validateInputs = () => {
  let isValid = true;

  if (!/^[0-9]+$/.test(newClass.trim())) {
    setNewClassError('Class name must contain only numbers');
    isValid = false;
  } else if (addedClasses.has(newClass.trim())) {
    setNewClassError('Class name already exists');
    isValid = false;
  } else {
    setNewClassError('');
  }
  

    const numericFields = [
      { value: admissionFee, name: 'Admission Fee', errorSetter: setAdmissionFeeError },
      { value: tuitionFee, name: 'Tuition Fee', errorSetter: setTuitionFeeError },
      { value: examFee, name: 'Exam Fee', errorSetter: setExamFeeError },
      { value: termFee, name: 'Term Fee', errorSetter: setTermFeeError },
    ];

    numericFields.forEach((field) => {
      if (!/^\d+$/.test(field.value)) {
        field.errorSetter(`${field.name} must be a numeric value`);
        isValid = false;
      } else {
        field.errorSetter('');
      }
    });

    return isValid;
  };

  const handleAdd = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const totalFee = calculateTotalFee(admissionFee, tuitionFee, examFee, termFee);
      await axios.post('http://localhost:8105/fees', {
        className: newClass,
        admissionFee: parseFloat(admissionFee),
        tuitionFee: parseFloat(tuitionFee),
        examFee: parseFloat(examFee),
        termFee: parseFloat(termFee),
        totalFee,
      });

      // Clear form fields after successful submission
      setNewClass('');
      setAdmissionFee('');
      setTuitionFee('');
      setExamFee('');
      setTermFee('');
      setTotalFee("");

      // Fetch updated data after add
      fetchData();
    } catch (error) {
      handleError(error);
    }
  };

  // Calculate total fee based on individual fees
  const calculateTotalFee = (admissionFee, tuitionFee, examFee, termFee) => {
    const total = parseFloat(admissionFee || 0) +
      parseFloat(tuitionFee || 0) +
      parseFloat(examFee || 0) +
      parseFloat(termFee || 0);
    return isNaN(total) ? 0 : total;
  };
  

  const handleEdit = (classToEdit) => {
    setEditingClassId(classToEdit);
  };

  

  const handleSave = async () => {
    try {
      const editedRow = feeStructureData.find((row) => row.id === editingClassId);
  
      await axios.put(`http://localhost:8105/fees/${editedRow.id}`, {
        className: editedRow.className,
        id: editedRow.id,
        admissionFee: parseFloat(editedRow.admissionFee),
        tuitionFee: parseFloat(editedRow.tuitionFee),
        examFee: parseFloat(editedRow.examFee),
        termFee: parseFloat(editedRow.termFee),
        totalFee: parseFloat(editedRow.totalFee),
      });
  
      // Fetch updated data after save
      fetchData();
  
      // Clear editing state and input fields
      setEditingClassId(null);
      setAdmissionFee('');
      setTuitionFee('');
      setExamFee('');
      setTermFee('');
      setTotalFee('');
    } catch (error) {
      console.error('Error updating fee structure data:', error);
    }
  };
  

  const handleCancel = () => {
    setEditingClassId(null);
  };

  const handleDelete = async (classToDelete) => {
    try {
      await axios.delete(`http://localhost:8105/fees/${classToDelete}`);
      // Fetch updated data after delete
      fetchData();
    } catch (error) {
      console.error('Error deleting fee structure data:', error);
    }
  };

  const handleFeeChange = (event, classToEditId, feeType) => {
    const { value } = event.target;
    setFeeStructureData((prevData) =>
      prevData.map((row) =>
        row.id === classToEditId
          ? {
              ...row,
              [feeType]: value,
              totalFee: calculateTotalFee(
                feeType === 'admissionFee' ? value : row.admissionFee,
                feeType === 'tuitionFee' ? value : row.tuitionFee,
                feeType === 'examFee' ? value : row.examFee,
                feeType === 'termFee' ? value : row.termFee
              ),
            }
          : row
      )
    );
  };
  
  
  
  return (
    <div className="container" id="feeId">
      <div className="form-container">
      <div className='fees-form-container'>
      <h2>Fee Structure</h2>
        <div className="input-container">
          <label>Add New Class: </label>
          <input
            type="text"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)} className='fees-input' 
            id='feesInput1'
          /><br/>
          {newClassError && <span className="error-message">{newClassError}</span>}
        </div><br/>
        <div className="input-container">
          <label>Admission Fee: </label>
          <input
            type="text"
            value={admissionFee}
            onChange={(e) => setAdmissionFee(e.target.value)} className='fees-input'
            id='feesInput2'
          /><br/>
          {admissionFeeError && <span className="error-message">{admissionFeeError}</span>}
        </div><br/>
        <div className="input-container">
          <label>Tuition Fee: </label>
          <input
            type="text"
            value={tuitionFee}
            onChange={(e) => setTuitionFee(e.target.value)} className='fees-input'
            id='feesInput3'
          /><br/>
          {tuitionFeeError && <span className="error-message">{tuitionFeeError}</span>}
        </div><br/>
        <div className="input-container">
          <label>Exam Fee: </label>
          <input
            type="text"
            value={examFee}
            onChange={(e) => setExamFee(e.target.value)} className='fees-input'
            id='feesInput4'
          /><br/>
          {examFeeError && <span className="error-message">{examFeeError}</span>}
        </div><br/>
        <div className="input-container">
          <label>Term Fee: </label>
          <input
            type="text"
            value={termFee}
            onChange={(e) => setTermFee(e.target.value)} className='fees-input'
            id='feesInput5'
          /><br/>
          {termFeeError && <span className="error-message">{termFeeError}</span>}
        </div><br/>
        <div className="input-container">
          <label>Total Fee: </label>
          <input
            type="text"
            value={totalFee}
            onChange={(e) => setTotalFee(e.target.value)} className='fees-input'
            id='feesInput6'
          /><br/>
          {totalFeeError && <span className="error-message">{totalFeeError}</span>}
        </div><br/>
        <button onClick={handleAdd}>Add</button>
      </div>
      
      <table border="1">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Admission Fee</th>
            <th>Tuition Fee</th>
            <th>Exam Fee</th>
            <th>Term Fee</th>
            <th>Total Fee</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {feeStructureData.map((row, index) => (
            <tr key={index}>
              <td>{row.className}</td>
              
              <td>
                {editingClassId === row.id ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={row.admissionFee}
                    onChange={(event) => handleFeeChange(event, row.id, 'admissionFee')}
                  />
                ) : (
                  row.admissionFee
                )}
              </td>
              <td>
                {editingClassId === row.id ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={row.tuitionFee}
                    onChange={(event) => handleFeeChange(event, row.id, 'tuitionFee')}
                  />
                ) : (
                  row.tuitionFee
                )}
              </td>
              <td>
                {editingClassId === row.id ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={row.examFee}
                    onChange={(event) => handleFeeChange(event, row.id, 'examFee')}
                  />
                ) : (
                  row.examFee
                )}
              </td>
              <td>
                {editingClassId === row.id ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={row.termFee}
                    onChange={(event) => handleFeeChange(event, row.id, 'termFee')}
                  />
                ) : (
                  row.termFee
                )}
              </td>
              <td>
                {editingClassId === row.id ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={row.totalFee}
                    onChange={(event) => handleFeeChange(event, row.id, 'totalFee')}
                  />
                ) : (
                  row.totalFee
                )}
              </td>
              <td>
                {editingClassId === row.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(row.id)}>Edit</button>
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default FeeStructurePage;


