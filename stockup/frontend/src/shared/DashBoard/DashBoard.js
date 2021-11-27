import React, { useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';

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
            src={`http://localhost:5000/uploads/images/ac636565-f655-4fe7-a45f-c77f758e9e5e.png`}
          />
      </div>
    </React.Fragment>
};

export default DashBoard;