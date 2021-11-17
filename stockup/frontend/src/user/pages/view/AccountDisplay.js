import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../../shared/components/UIElements/Avatar';
import Card from '../../../shared/components/UIElements/Card';

const AccountDisplay = props => {

    const userInfo = props.userInfo;

    return (
        <li className="user-item">
          <Card className="user-item__content">
            <Link to={`/${userInfo._id}/places`}>
              <div className="user-item__image">
                <Avatar image={`http://localhost:5000/${userInfo.image}`} alt={userInfo.name} />
              </div>
              <div className="user-item__info">
                <h2>{userInfo.name}</h2>
                <h2>{userInfo.email}</h2>
                <h2>{userInfo.pnumber}</h2>
              </div>
            </Link>
          </Card>
        </li>
      );
};

export default AccountDisplay;
