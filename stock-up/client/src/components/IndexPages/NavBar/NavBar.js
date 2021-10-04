import React, { useState } from "react";
import { NavHashLink } from "react-router-hash-link";
import { FaAlignRight } from "react-icons/fa";
import "./NavBar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <NavHashLink smooth to="#home">
            
          </NavHashLink>
          <button type="button" className="nav-btn" onClick={handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
        </div>
        <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
          <li>
            <NavHashLink smooth to="home">
              Home
            </NavHashLink>
          </li>
          <li>
            <NavHashLink smooth to="menu">
              Menu
            </NavHashLink>
          </li>
          <li>
            <NavHashLink smooth to="register">
              Register
            </NavHashLink>
          </li>
          <li>
            <NavHashLink smooth to="signin">
              SignIn
            </NavHashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
