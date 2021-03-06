import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
     
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/products`}>MY PRODUCTS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/products/new">ADD PRODUCTS</NavLink>
        </li>
      )}
        {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/suppliers`}>SUPPLIERS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/account`}>MY ACCOUNT</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
      
    </ul>
  );
};

export default NavLinks;
