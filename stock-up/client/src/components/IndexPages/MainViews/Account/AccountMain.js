import React from 'react';
import Label from '../../../Shared/Label'


import "./AccountMain.css";

const AccountMain = props => {


  return  (
      <div className="overlay-account" id="account">
        <div className="info-account-header">
          <h2>Account Information</h2>
        </div>
        <div className="info-account">
            <Label labelClass="account-field" leftLabelClass="info-account-left" rightLabelClass="info-account-right" leftText="User Name: " rightText={props.username}></Label>
            <Label labelClass="account-field" leftLabelClass="info-account-left" rightLabelClass="info-account-right" leftText="First Name: " rightText={props.fname}></Label>
            <Label labelClass="account-field" leftLabelClass="info-account-left" rightLabelClass="info-account-right" leftText="Last Name: " rightText={props.lname}></Label>
            <Label labelClass="account-field" leftLabelClass="info-account-left" rightLabelClass="info-account-right" leftText="Email: " rightText={props.email}></Label>
            <Label labelClass="account-field" leftLabelClass="info-account-left" rightLabelClass="info-account-right" leftText="Phone Number: " rightText={props.pnumber}></Label>
        </div>
      </div> 
      
  );
}

export default AccountMain;