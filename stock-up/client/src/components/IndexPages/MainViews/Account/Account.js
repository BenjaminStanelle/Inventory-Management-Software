import React from 'react';

import "./Account.css";

import PersonIcon from "@material-ui/icons/Person";
import AccountMain from './AccountMain';
import AccountSubs from './AccountSubs';

function Account() {

  const DUMMY_DATA = {
    fname: 'Randall',
    lname: 'Ferree',
    email: 'asdf@gmail.com',
    username: 'Randalf',
    pnumber: '1234567890'
  };

  const DUMMY_SUBS = [{



  }];

  return (
      <div className="account-overview">
        <PersonIcon className="person" />
        <AccountMain fname={DUMMY_DATA.fname} fname={DUMMY_DATA.fname} lname={DUMMY_DATA.lname} email={DUMMY_DATA.email} username={DUMMY_DATA.username} pnumber={DUMMY_DATA.pnumber} />
        <AccountSubs />
      </div> 
      
  );
}

export default Account;