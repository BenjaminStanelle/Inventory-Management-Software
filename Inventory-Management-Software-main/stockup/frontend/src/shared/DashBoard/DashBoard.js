import React, { useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import logo from '../../images/Logo.png'
import './DashBoard.css';

const DashBoard = props => {
    const userInfo = props.userInfo;
    console.log(userInfo);

    const auth = useContext(AuthContext);

    const dashboardMessage = (auth.userId) ? 'Hello! Welcome back to Stock Up.' : 'Hello! Welcome to Stock Up. Please log in or create an account.';
 
    return <React.Fragment>
      <div className="dashboard">
        <h2>{dashboardMessage}</h2>
        <img
            src={logo}
          />
      </div>
    </React.Fragment>
};

export default DashBoard;