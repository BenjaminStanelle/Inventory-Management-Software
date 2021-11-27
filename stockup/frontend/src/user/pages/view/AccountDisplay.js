import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../../shared/components/UIElements/Avatar';
import Card from '../../../shared/components/UIElements/Card';

import './AccountDisplay.css';

const AccountDisplay = props => {

    const userInfo = props.userInfo;

    return (
        <div className="user-item">
          <Card className="user-item__content">
            <Link to={`/${userInfo._id}/products`}>
              <div className="user-item__image">
                <Avatar image={`http://localhost:5000/${userInfo.image}`} alt={userInfo.name} />
              </div>
              <div className="user-item__info">
                <h2>{userInfo.name}</h2>
                <h2>{userInfo.email}</h2>
                <h2>{userInfo.pnumber}</h2>

                {userInfo.products.length > 0 && 
                <h2>{userInfo.products.length} {userInfo.products.length > 1 ?  ' products' : ' product'}</h2>}

                {userInfo.products.length === 0 && 
                <h2>No products added.</h2>}

              </div>
            </Link>
          </Card>
          <Card className="user-item__password">
            <Link to={`/account/password/`}>
                <h2>Change Password</h2>
            </Link>
          </Card>
        </div>
      );
};

export default AccountDisplay;
