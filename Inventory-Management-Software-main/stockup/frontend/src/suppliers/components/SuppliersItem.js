import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';
import './SuppliersItem.css';

const SuppliersItem = props => {
  const { isLoading} = useHttpClient();


  return (

      <li className="suppliers-item">
        <Card className="suppliers-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="suppliers-item__image">
             <img src={props.logo} alt="Logo"/>
          </div>
          <div className="suppliers-item__info">
            <h2><a href={props.website} > {props.name}</a></h2>
            <h3>{props.description}</h3>
            <a href={props.website} > {props.website}</a>
          </div>
        </Card>
      </li>

  );
};

export default SuppliersItem;
