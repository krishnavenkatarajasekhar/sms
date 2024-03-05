import './AdminDash.css';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


function AdminDash({ currentUser }) {

  const history = useHistory();
  const [announcements, setAnnouncements] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [accountData, setAccountData] = useState({
     email: '',
  });

  useEffect(() => {
    fetchAnnouncements();
    fetchTeachers();
    fetchStudents();
    fetchActivities();
    fetchAccounts();

  }, []);


  const fetchAccounts = async () => {
    try{
      const response = await axios.get('http://localhost:8105/api/account/get/${currentUser.email}');
      setAccountData(response.data);
    } catch (error) {
      console.error('Error fetching account:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      // Assuming your backend API endpoint for fetching announcements is '/api/announcements'
      const response = await axios.get('http://localhost:8105/announcements/get');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      // Make a fetch request to your backend API endpoint for teachers
      //const response = await fetch('http://localhost:8105/teachers'); // Replace with your actual API endpoint
      const response = await axios.get('http://localhost:8105/teachers');
      
      setTeachers(response.data); // Update state with the fetched teachers data
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  
  const fetchStudents = async () => {
    try {
      // Make a fetch request to your backend API endpoint for students
      const response =  await axios.get('http://localhost:8105/students/get'); // Replace with your actual API endpoint
      
      setStudents(response.data); // Update state with the fetched students data
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      // Make a fetch request to your backend API endpoint for teachers
      //const response = await fetch('http://localhost:8105/teachers'); // Replace with your actual API endpoint
      const response = await axios.get('http://localhost:8105/api/activities/get');
      
      setActivities(response.data); // Update state with the fetched teachers data
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleViewProfileClick = () => {
    if (currentUser.type === 'teacher') {
      history.push('/edit-teacher-profile');
    } else if (currentUser.type === 'student') {
      history.push('/edit-student-profile');
    } else {
      history.push('/edit-teacher-profile');
    }
    // Add more conditions if needed for other user types
  };


  return (
    <>

      <section id="content" className="admin-main">
        <main>
          <i className='bx bx-menu'></i>
          <div className="head-title">
            <div className="left">
              <h1>SchoolName</h1>
            </div>
              
            {/* <a href="#" className="btn-download" onClick={handleViewProfileClick}>
              <i className='bx bxs-cloud-download'></i>
              <span className="text">ViewProfile</span>
            </a> */}
          </div>

          <ul className="box-info">
            <li>
              <i className='bx bxs-calendar-check'></i>
              <span className="text">
                <h3>{teachers.length}</h3>
                <Link to="/teachers-list"><p>Teachers</p> </Link>
              </span>
            </li>
            <li>
              <i className='bx bxs-group'></i>
              <span className="text">
                <h3>{students.length}</h3>
                <Link to="/students-list"><p>Students</p> </Link>

              </span>
            </li>
            <li>
              <i className='bx bxs-dollar-circle'></i>
              <span className="text">
              <h3>{activities.length}</h3>
                <Link to="/enquiryform" ><p>Enquiry List</p> </Link>
              </span>
            </li>
          </ul>

          <div className="announcements-container">
            <h2>Announcements</h2>
            <div className="announcements-slider">
              <Slider {...settings}>
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="announcement-item">
                    <div className="announcement-panel panel-default">
                      <div className="announcement-panel-heading">
                        <h3 className="announcement-panel-title">{announcement.title}</h3>
                      </div>
                      <div className="announcement-panel-body">
                      <p>{announcement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </main>
      </section>

    </>
  );
}

export default AdminDash;
