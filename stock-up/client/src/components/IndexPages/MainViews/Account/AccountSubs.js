import React from 'react';

import './AccountSubs.css';


const AccountSubs = props => {
    
    if(!props.items || props.items.length === 0) {
        return  (
            <div className="sub-account-header">
                <h2>Subscriptions</h2>
                <div className="account-subs">
                    <h2>No subscriptions.</h2>
                </div> 
            </div>
        );
    }

    return  (
        <div className="sub-account-header">
            <h2>Subscriptions</h2>
                <div className="account-subs">
            </div> 
        </div>
    );
}


  export default AccountSubs;