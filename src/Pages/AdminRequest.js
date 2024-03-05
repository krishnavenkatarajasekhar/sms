import './AdminRequest.css';
import React, { useState, useEffect } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useHistory } from 'react-router-dom';


function AdminRequest(){
    const history = useHistory();


    return(
        <>
        <div className='main-container'>
        <div className='container admin-requests-container'>
        <ul className="box-flow" >
        <h2>All Requests</h2>
            <li>
              <i className='bx bxs-admin-check'><img src='https://logodix.com/logo/2004635.jpg' className='teachers-request-img'/></i>
              <span className="text">
                <Link to="/view-teacher-request" className='link-name'>Teacher Requests</Link>
              </span>
            </li>
            <li>
              <i className='bx bxs-group'><img src='https://th.bing.com/th?id=OIP.oYS6eI4UsMrDVP8yY7ZNKAHaHa&w=249&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' className='teachers-request-img'/></i>
              <span className="text">
                
                <Link to="/request" className='link-name'>Student Requests</Link>
                
              </span>
            </li>
           
          </ul>
          </div>
          </div>
        </>
    );
}
export default AdminRequest;