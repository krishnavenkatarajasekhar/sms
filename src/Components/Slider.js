import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Pages/AdminDash.css';

const Slider = ({ currentUser, handleLogout }) => {
  return (
    <>
      {/* SIDEBAR */}
      <section id="sidebar">
        <NavLink to="#" className="brand">
          <i className='bx bxs-smile'></i>
          {currentUser.type === 'admin' && (
          <span className="text">AdminDashBoard</span>
          )}

         {currentUser.type === 'student' && (
          <span className="text">StudentBoard</span>
          )}
         {currentUser.type === 'teacher' && (
          <span className="text">TeacherBoard</span>
          )}
          {currentUser.type === 'management' && (
          <span className="text">ManagementBoard</span>
          )}
        

        </NavLink>
        

        {/* Conditionally render different sets of links based on user type */}
        {currentUser.type === 'admin' && (
          <ul className="side-menu top">
            <li>
            <NavLink exact to="/admindash" activeClassName="active">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Home</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/studentform" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Create Student Account</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/createteacher" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Create Teacher Account</span>
            </NavLink>
          </li>
    
          <li >
            <NavLink to="/announce" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Announcement</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/activity-tbl" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Activity</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/subjects" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Subjects</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/fees" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Fee Structure</span>
            </NavLink>
          </li>
          
          <li >
            <NavLink to="/adminrequest" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Requests</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/receipts" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Reciepts</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/reports-new" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Reports</span>
            </NavLink>
          </li>
            {/* Add other admin links as needed */}
          </ul>
        )}

        {currentUser.type === 'student' && (   
          <ul className="side-menu top">
            <li>
            <NavLink exact to="/UserDash" activeClassName="active">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Home</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/view-attendance" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">View Attendance</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/reports-form-view" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Reports</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/view-announce" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Announcement</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/view-tasks" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Task</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/student-request-form" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Request</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/fee-form" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Fees</span>
            </NavLink>
          </li>
            {/* Add other student links as needed */}
          </ul>
        )}

        {currentUser.type === 'teacher' && (
          <ul className="side-menu top">
             <li>
            <NavLink exact to="/Teacherdash" activeClassName="active">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Home</span>
            </NavLink>
          </li>
            <li>
              <NavLink to="/attend" activeClassName="active">
                <i className='bx bxs-shopping-bag-alt'></i>
                <span className="text">TakeAttendance</span>
              </NavLink>
            </li>
            <li>
            <NavLink exact to="/reports-new" activeClassName="active">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Reports</span>
            </NavLink>
          </li>
            <li>
              <NavLink to="/view-task" activeClassName="active">
                <i className='bx bxs-shopping-bag-alt'></i>
                <span className="text">View Task</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/add-task" activeClassName="active">
                <i className='bx bxs-shopping-bag-alt'></i>
                <span className="text">Add Task</span>
              </NavLink>
            </li>
            <li >
            <NavLink to="/subjects" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Subjects</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/view-announce" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Announcement</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/request" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Requests</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/add-request" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Add Request</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/activity-tbl" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Activity</span>
            </NavLink>
          </li>
            {/* Add other teacher links as needed */}
          </ul>
        )}

     {currentUser.type === 'management' && (   
          <ul className="side-menu top">
            <li>
            <NavLink exact to="/UserDash" activeClassName="active">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Home</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/reports-report" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Reports</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/attendance-attend" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Attendance</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/Fees-attend" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Fees</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/announcement-attend" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Announcement</span>
            </NavLink>
          </li>
          <li >
            <NavLink to="/activity-tbl" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Activity</span>
            </NavLink>
          </li>
          
          <li >
            <NavLink to="/book-attend" activeClassName="active">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Books</span>
            </NavLink>
          </li>

            {/* Add other management links as needed */}
          </ul>
        )}
        
        <ul className="side-menu">
          <li>
            <NavLink 
              to={{
                pathname: '/password-collection',
                state: { id: currentUser.id, email: currentUser.email, type: currentUser.type },              
              }}
              activeClassName="active"
            >
              <i className='bx bxs-cog'></i>
              <span className="text">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active" onClick={handleLogout}>
              <i className='bx bxs-log-out-circle'></i>
              <span className="text">Logout</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Slider;
