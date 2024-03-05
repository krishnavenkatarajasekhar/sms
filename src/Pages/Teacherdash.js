import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SchoolLogoImage from "../Assets/international-logo.png";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./UserDash.css";

function Teacherdash({ currentUser }) {
  const history = useHistory();
  const [announcements, setAnnouncements] = useState([]);
  const [teacherData, setTeacherData] = useState({
    teacherId: '',
    name: '',
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchTeacherProfile();
    fetchAnnouncements();
  }, []);

  const fetchTeacherProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8105/teachers/email/${currentUser.email}`);
      setTeacherData(response.data);
    } catch (error) {
      console.error('Error fetching Teacher profile:', error);
    }
  };


  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:8105/announcements/get');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
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
    <div id="user-content" className="admin-main">
       <div className="School-Logo-Image">
          <img src={SchoolLogoImage} alt="" />
        </div>
   
    <main>
      <i className='bx bx-menu'></i>
      <div className="head-title">
        <div className="left">
          <h1 className='head-user'>SchoolName</h1>
        </div>
        <div className="time-date">
            <p>{currentTime.toLocaleString()}</p>
          </div>
        <div className='id-teacher-dash'>
        <h3  ><b>ID: {teacherData.teacherId}</b></h3>
        <h5 ><b>Name: {teacherData.name}</b></h5>
        </div>
        <a href="#" className="btn-download" onClick={handleViewProfileClick}>
          <i className='bx bxs-cloud-download'></i>
         <div className='text-user'>
          <span >View Profile</span>
          </div>
        </a>
      </div>
    </main>
    <ul className="box-info">
            <li>
              <i className='bx bxs-calendar-check'></i>
              <span className="text">
                <h3></h3>
                <Link to="/attend"><p>TakeAttendance</p> </Link>
              </span>
            </li>
            <li>
              <i className='bx bxs-group'></i>
              <span className="text">
                <h3></h3>
                <Link to="/students-list"><p>Reports</p> </Link>
              </span>
            </li>
            <li>
              <i className='bx bxs-calendar-check'></i>
              <span className="text">
                <h3></h3>
                <Link to="/teachers-list"><p>Tasks</p> </Link>
              </span>
            </li>
            
          </ul>
        
    <div id="user-content" className="announcements-container">
      <h2>Announcements</h2>
      <div className="announcements-slider">
        <Slider {...settings}>
          {announcements.map((announcement) => (
            <div key={announcement.id} className="announcement-item">
              <div className="announcement-content">
                <h3>{announcement.title}</h3>
                <p>{announcement.description}</p>
              </div>
            </div>
          ))}
        </Slider>
        
      </div>
    </div>
  </div>
);
}

export default Teacherdash;
