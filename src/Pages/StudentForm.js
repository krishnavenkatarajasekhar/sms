import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './StudentForm.css';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullNameInput: '',
    motherNameInput: '',
    bloodGroupInput: '',
    contactInput: '',
    genderInput: '',
    classNameInput: '',
    classTeacherInput: '',
    transportInput: '',
    documentsInput: null,
    firstLanguageInput: '',
    secondLanguageInput: '',
    dobInput: new Date(),
    fatherNameInput: '',
    addressInput: '',
    emailInput: '',
    sectionInput: '',
    dateOfJoiningInput: new Date(),
    totalFeesInput: '',
    balanceFeesInput: '',
    showFullNameError: false,
    showMotherNameError: false,
    showBloodGroupError: false,
    showContactError: false,
    showGenderError: false,
    showClassNameError: false,
    showClassTeacherError: false,
    showTransportError: false,
    showDocumentsError: false,
    showFirstLanguageError: false,
    showSecondLanguageError: false,
    showDOBError: false,
    showFatherNameError: false,
    showAddressError: false,
    showEmailError: false,
    showSectionError: false,
    showDateOfJoiningError: false,
    showTotalFeesError: false,
    showBalanceFeesError: false,
    isFormSubmitted: false,
    studentId: '',
  });

  const [fileInputRef] = useState(React.createRef());
  const classes = ['LKG', 'UKG', '1','2','3','4','5','6','7','8','9','X']; 
  const sections = ['A', 'B', 'C']; 
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const history = useHistory();

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };

  const validateContact = (contact) => {
    const contactRegex = /^[0-9]+$/;
    return contactRegex.test(contact);
  };

  const validateEmail = () => {
    const { emailInput } = formData;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/;
    const isGmail = emailInput.toLowerCase().endsWith('@gmail.com');
    return emailRegex.test(emailInput) && isGmail;
  };

  const onBlurField = (fieldName) => {
    const isValidField = validateField(fieldName);
    setFormData({ ...formData, [`show${fieldName}Error`]: !isValidField });
  };

  const onChangeField = (fieldName, event) => {
    const { target } = event;
    const { value } = target;
    setFormData({ ...formData, [`${fieldName}Input`]: value });
  };

  const onChangeDate = (fieldName, date) => {
    setFormData({ ...formData, [`${fieldName}Input`]: date });
  };

  const renderField = (fieldName, label, placeholder, isDateField = false, isDropdown = false) => {
    const inputValue = formData[`${fieldName}Input`];
    const showError = formData[`show${fieldName}Error`];
    const className = showError ? 'name-input-field error-field' : 'name-input-field';

    return (
      <div className="input-container" id="studentForm">
        <label className="input-label" htmlFor={fieldName}>
          {label}
        </label>
        {isDropdown ? (
          <select
            id={fieldName}
            className={className}
            value={inputValue}
            onChange={(event) => onChangeField(fieldName, event)}
            onBlur={() => onBlurField(fieldName)}
          >
            <option value="" disabled>
              Select {label}
            </option>
            {fieldName === 'gender' && (
              <>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </>
            )}
            {fieldName === 'bloodGroup' &&
              bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            {fieldName === 'className' &&
              classes.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            {fieldName === 'section' &&
              sections.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            {fieldName === 'secondLanguage' &&
              <>
                
                <option value="Telugu">Telugu</option>
                <option value="Urdu">Urdu</option>
                <option value="Hindi">Hindi</option>
                <option value="Sanskrit">Sanskrit</option>
              </>
            }
          </select>
        ) : isDateField ? (
          <DatePicker
            id={fieldName}
            className={className}
            selected={inputValue}
            onChange={(date) => onChangeDate(fieldName, date)}
            onBlur={() => onBlurField(fieldName)}
            placeholderText={placeholder}
          />
        ) : (
          <input
            type={fieldName === 'documents' ? 'file' : 'text'}
            id={fieldName}
            className={className}
            ref={fieldName === 'documents' ? fileInputRef : null}
            value={inputValue}
            placeholder={placeholder}
            onChange={(event) => onChangeField(fieldName, event)}
            onBlur={() => onBlurField(fieldName)}
          />
        )}
        {showError && <p className="error-message">{getErrorMsg(fieldName)}</p>}
      </div>
    );
  };

  const getErrorMsg = (fieldName) => {
    switch (fieldName) {
      case 'fullName':
        return 'Required. Only alphabets are allowed.';
      case 'motherName':
        return 'Required. Only alphabets are allowed.';
      case 'contact':
        return 'Required. Only numeric values are allowed.';
      case 'classTeacher':
        return 'Required. Only alphabets are allowed.';
      case 'fatherName':
        return 'Required. Only alphabets are allowed.';
      case 'email':
        return 'Required. Enter a valid email address.';
      case 'bloodGroup':
        return 'Required';
      case 'transport':
        return 'Required. Only alphabets are allowed.';
      case 'firstLanguage':
        return 'Required. Only alphabets are allowed.';
      case 'secondLanguage':
        return 'Required. Select a second language.';
      case 'dob':
        return 'Required';
      case 'address':
        return 'Required';
      case 'section':
        return 'Required';
      case 'dateOfJoining':
        return 'Required';
      case 'totalFees':
        return 'Required. Only numeric values are allowed.';
      case 'balanceFees':
        return 'Required. Only numeric values are allowed.';
      default:
        return 'Required';
    }
  };

  const validateField = (fieldName) => {
    const fieldValue = formData[`${fieldName}Input`];

    if (fieldName === 'documents') {
      const files = fileInputRef.current.files;
      return files.length > 0;
    } else if (!fieldValue) {
      setFormData({ ...formData, [`show${fieldName}Error`]: true });
      return false;
    }

    if (
      (fieldName === 'fullName' ||
        fieldName === 'motherName' ||
        fieldName === 'classTeacher' ||
        fieldName === 'fatherName' ||
        fieldName === 'firstLanguage' ||
        fieldName === 'secondLanguage') &&
      !validateName(fieldValue)
    ) {
      setFormData({ ...formData, [`show${fieldName}Error`]: true });
      return false;
    }

    if (fieldName === 'contact' && !validateContact(fieldValue)) {
      setFormData({ ...formData, [`show${fieldName}Error`]: true });
      return false;
    }

    if (fieldName === 'email' && !validateEmail()) {
      setFormData({ ...formData, [`show${fieldName}Error`]: true });
      return false;
    }

    if ((fieldName === 'totalFees' || fieldName === 'balanceFees') && !validateNumeric(fieldValue)) {
      setFormData({ ...formData, [`show${fieldName}Error`]: true });
      return false;
    }

    return true;
  };

  const validateNumeric = (value) => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    let isValidForm = true;

    Object.keys(formData).forEach((fieldName) => {
      if (fieldName.endsWith('Input')) {
        const isValidField = validateField(fieldName.replace('Input', ''));
        if (!isValidField) {
          isValidForm = false;
          setFormData({ ...formData, [`show${fieldName.replace('Input', '')}Error`]: true });
        }
      }
    });

    if (isValidForm) {
      try {
        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'documentsInput') {
            const files = fileInputRef.current.files;
            if (files.length > 0) {
              formDataToSend.append('documents', files[0], files[0].name);
            }
          } else if (key === 'dobInput' || key === 'dateOfJoiningInput') {
            const dateString = new Date(value).toISOString().split('T')[0];
            formDataToSend.append(key.replace('Input', ''), dateString);
          } else {
            formDataToSend.append(key.replace('Input', ''), value);
          }
        });

        const response = await axios.post('http://localhost:8105/students/save', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data != null) {
          setFormData({ ...formData, isFormSubmitted: true, studentId: response.data.id });
          history.push({
            pathname: '/password-collection',
            state: { id: null, email: formData.emailInput, type: 'student', userId: response.data.studentId },
            
          });
        } else {
          console.error('Unexpected status code:', response.status);
          setFormData({ ...formData, isFormSubmitted: false });
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        setFormData({ ...formData, isFormSubmitted: false });
      }
    } else {
      setFormData({ ...formData, isFormSubmitted: false });
    }
  };

  const onClickSubmitAnotherResponse = () => {
    setFormData({
      fullNameInput: '',
      motherNameInput: '',
      bloodGroupInput: '',
      contactInput: '',
      genderInput: '',
      classNameInput: '',
      classTeacherInput: '',
      transportInput: '',
      documentsInput: null,
      firstLanguageInput: '',
      secondLanguageInput: '',
      dobInput: new Date(),
      fatherNameInput: '',
      addressInput: '',
      emailInput: '',
      sectionInput: '',
      dateOfJoiningInput: new Date(),
      totalFeesInput: '',
      balanceFeesInput: '',
      showFullNameError: false,
      showMotherNameError: false,
      showBloodGroupError: false,
      showContactError: false,
      showGenderError: false,
      showClassNameError: false,
      showClassTeacherError: false,
      showTransportError: false,
      showDocumentsError: false,
      showFirstLanguageError: false,
      showSecondLanguageError: false,
      showDOBError: false,
      showFatherNameError: false,
      showAddressError: false,
      showEmailError: false,
      showSectionError: false,
      showDateOfJoiningError: false,
      showTotalFeesError: false,
      showBalanceFeesError: false,
      isFormSubmitted: false,
      studentId: '',
    });
  };

  const renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <p>Student ID: {formData.studentId}</p>
      <button
        type="button"
        className="submit-button"
        onClick={onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  );

  return (
    <div id="studentForm">
      <div className="registration-form-container">
        <h1 className="form-title">Student Registration</h1>
        <div className="view-container">
          <form className="form-container" onSubmit={onSubmitForm}>
            <div className="form-column left">
              {renderField('fullName', 'FULL NAME', 'Full name')}
              {renderField('motherName', 'MOTHER NAME', 'Mother name')}
              {renderField('fatherName', 'FATHER NAME', 'Father name')}
              {renderField('bloodGroup', 'BLOOD GROUP', 'Select Blood Group', false, true)}
              {renderField('contact', 'CONTACT', 'Contact')}
              {renderField('gender', 'GENDER', 'Gender', false, true)}
              {renderField('firstLanguage', 'FIRST LANGUAGE', 'First language')}
              {renderField('secondLanguage', 'SECOND LANGUAGE', 'Second language', false, true)}
              {renderField('totalFees', 'TOTAL FEES', 'Total fees')}
            </div>
            <div className="form-column right">
              {renderField('className', 'CLASS NAME', 'Select Class', false, true)}
              {renderField('classTeacher', 'CLASS TEACHER', 'Class teacher')}
              {renderField('transport', 'TRANSPORT', 'Transport')}
              {renderField('documents', 'DOCUMENTS', 'Choose File')}
              {renderField('dob', 'DATE OF BIRTH', 'Date of birth', true)}
              {renderField('address', 'ADDRESS', 'Address')}
              {renderField('email', 'EMAIL', 'Email')}
              {renderField('section', 'SECTION', 'Select Section', false, true)}
              {renderField('dateOfJoining', 'DATE OF JOINING', 'Date of joining', true)}
              {renderField('balanceFees', 'BALANCE FEES', 'Balance fees')}
            </div>
            <div className="form-column form-column-100 centered-button">
              {formData.isFormSubmitted && renderSubmissionSuccessView()}
              {!formData.isFormSubmitted && (
                <button type="submit" className="submit-button">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
