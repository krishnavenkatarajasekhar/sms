import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./Components/Navbar"; // Import the Navbar component
import LoginForm from "./Pages/Login";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Acheivement from "./Components/Acheivement";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import TeacherForm from './Pages/TeacherForm';
import AdminDash from './Pages/AdminDash';
import Slider from "./Components/Slider";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Announce from "./Pages/Announcement";
import Subjects from "./Pages/Subjects";
import StudentForm from "./Pages/StudentForm";
import FeeStructurePage from "./Pages/FeeStructurePage";
import RequestPage from "./Pages/RequestPage";
import ReceiptPage from "./Pages/RecieptPage";
import TeacherList from "./Pages/TeacherList";
import ReportsPage from "./Pages/ReportsPage";
import StudentList from "./Pages/StudentList";
import EditStudentProfile from "./Pages/EditStudentProfile";
import EditTeacherProfile from "./Pages/EditTeacherProfile";
import PasswordCollectionPage from "./Pages/PasswordCollectionPage";
import UserDash from "./Pages/UserDash";
import Teacherdash from "./Pages/Teacherdash";
import TakeAttendance from "./Pages/TakeAttendance"
import ViewTask from "./Pages/ViewTask";
import AddTask from "./Pages/AddTask";
import StudentAnnouncement from "./Pages/StudentAnnouncement";
import ViewAnnouncement from "./Pages/ViewAnnouncement";
import Tasks from "./Pages/Tasks";
import ContactForm from "./Pages/ContactForm";
import EnquiryForm from "./Pages/EnquiryForm";
import AdminRequest from "./Pages/AdminRequest";
import StudentRequest from "./Pages/StudentRequest";
import TeacherRequest from "./Pages/TeacherRequest";
import Activities from "./Pages/Activities";
import Viewattendance from "./Pages/Viewattendance";
import Viewreports from "./Pages/Viewreports";
import ViewTeacherReq from "./Pages/ViewTeacherReq";
import Newreports from "./Pages/Newreports";
import Eachreports from "./Pages/Eachreports";
import PayFee from "./Pages/Fee";
import PaymentForm from "./Pages/Debit";
import Acknowledgement from "./Pages/Card";

function App() {
  const [selectedRoute, setSelectedRoute] = useState("/"); // Define setSelectedRoute here
  const [currentUser, setCurrentUser] = useState(null);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (user) => {
    // Assume login is successful, set isLoggedIn to true
    setIsLoggedIn(true);
    setCurrentUser(user);
  };
  const handleSliderChange = (route) => {
    console.log(route);
    setSelectedRoute(route);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null); // Clear the current user data
    // Additional logout logic can be added here
  };

  
  return (
    <div>
      {/* Your slider component goes here */}
      {/* It should call handleSliderChange with the selected route when the slider changes */}

      <Router>
      {!isLoggedIn && 
        <Navbar handleSliderChange={handleSliderChange} /> 
      }
        {/* Pass the handleSliderChange function to the Navbar */}
    { isLoggedIn && <Slider currentUser={currentUser} handleLogout={handleLogout}/> }
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/work" component={Work} />
          <Route path="/achievement" component={Acheivement} />
          <Route path="/contact" component={Contact} />
          <Route path="/login">
          <LoginForm handleLogin={handleLogin} />
        </Route>
          {isLoggedIn && (
          <Route path="/admindash">
            <AdminDash currentUser={currentUser}/>
          </Route> )}
          {isLoggedIn && (
          <Route path="/UserDash">
            <UserDash currentUser={currentUser}/>
          </Route> )}
          {isLoggedIn && (
          <Route path="/Teacherdash">
            <Teacherdash currentUser={currentUser}/>
          </Route> )}
          {isLoggedIn && (
          <Route path="/contactform">
            < ContactForm />
          </Route>)}
          {isLoggedIn && (
          <Route path="/adminrequest">
            < AdminRequest />
          </Route>)}
          {isLoggedIn && (
          <Route path="/activity-tbl">
            < Activities />
          </Route>)}
          
          {isLoggedIn && (
             <Route path="/createteacher">
           <TeacherForm />
            </Route> )}
            {isLoggedIn && (
          <Route path="/studentform">
            < StudentForm />
          </Route>)}
           {isLoggedIn && (
          <Route path="/announce">
            <Announce />
          </Route>)}
          {isLoggedIn && (
          <Route path="/subjects">
            <Subjects />
          </Route>)}
          {isLoggedIn && (
          <Route path="/reports-form-view">
            <Viewreports />
          </Route>)}
          {isLoggedIn && (
          <Route path="/fees">
            <FeeStructurePage />
          </Route>)}
          {isLoggedIn && (
          <Route path="/request">
            <RequestPage />
          </Route>)}
          {isLoggedIn && (
          <Route path="/view-teacher-request">
            <ViewTeacherReq />
          </Route>)}
          {isLoggedIn && (
          <Route path="/receipts">
            <ReceiptPage />
          </Route>)}
          {isLoggedIn && (
          <Route path="/reports">
            <ReportsPage />
          </Route>)}
          {isLoggedIn && (
          <Route path="/enquiryform">
            <EnquiryForm />
          </Route>)}
          {isLoggedIn && (
          <Route path="/teachers-list">
            <TeacherList />
          </Route>)}

           {isLoggedIn && (
          <Route path="/edit-student-profile">
            <EditStudentProfile  currentUser={currentUser}/>
          </Route>)}

           {isLoggedIn && (
          <Route path="/edit-teacher-profile">
            <EditTeacherProfile  currentUser={currentUser}/>
          </Route>)}
          {isLoggedIn && (
          <Route path="/students-list">
            <StudentList />
          </Route>)}
          {isLoggedIn && (
          <Route path="/reports-new">
            <Newreports />
          </Route>)}
          {isLoggedIn && (
          <Route path="/reports-each/:studentName">
            <Eachreports />
          </Route>)}
          {isLoggedIn && (
          <Route path="/fee-form" >
            <PayFee currentUser={currentUser} />
          </Route>)}
          {isLoggedIn && (
          <Route path="/payment-form">
            <PaymentForm />
          </Route>)}
          {isLoggedIn && (
          <Route path="/card-form">
            <Acknowledgement />
          </Route>)}
          {isLoggedIn && (
          <Route path="/password-collection">
            <PasswordCollectionPage />
          </Route>)}
          {isLoggedIn && (
          <Route path="/attend">
            <TakeAttendance currentUser={currentUser}/>
          </Route>)}
          {isLoggedIn && (
          <Route path="/view-task">
            <ViewTask />
          </Route>)}
          {isLoggedIn && (
          <Route path="/add-request">
            <TeacherRequest currentUser={currentUser}/>
          </Route>)}
          {isLoggedIn && (
          <Route path="/add-task">
            <AddTask />
          </Route>)}
          {isLoggedIn && (
          <Route path="/view-attendance">
            <Viewattendance currentUser={currentUser} />
          </Route>)}
          {isLoggedIn && (
          <Route path="/student-announce">
            <StudentAnnouncement />
          </Route>)}
          {isLoggedIn && (
          <Route path="/view-announce">
            <ViewAnnouncement />
          </Route>)}
          {isLoggedIn && (
          <Route path="/view-tasks">
            <Tasks />
          </Route>)}
          {isLoggedIn && (
          <Route path="/student-request-form">
            <StudentRequest currentUser={currentUser}/>
          </Route>)}
          

          </Switch>
        {!isLoggedIn && 
        <Footer />
      }
       
      </Router>
    </div>
  );
}

export default App;            
                    
          
        
