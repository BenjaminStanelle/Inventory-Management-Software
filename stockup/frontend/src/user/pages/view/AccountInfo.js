import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import AccountDisplay from './AccountDisplay';
import './AccountInfo.css';

const Auth = () => {
  const [userInfo, setUserInfo] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const userId = useParams().userId;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/info/' + userId,
        );

        setUserInfo(responseData.user);
      } catch (err) {}
    
  };
  fetchUserInfo();
}, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && userInfo && (
        <AccountDisplay userInfo={userInfo} />
      )}
    </React.Fragment>
  );
};

export default Auth;
