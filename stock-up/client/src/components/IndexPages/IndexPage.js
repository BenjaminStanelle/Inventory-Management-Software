import React from "react";

import Navbar from ".//NavBar/NavBar.js"
import Home from "./MainViews/Home/Home.js";
import Menu from "./MainViews/Menu/Menu.js";
import Register from "./MainViews/Register/Register.js";
import Signin from "./MainViews/Signin/Signin.js";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Menu />
      <Register />
      <Signin />
    </div>
  );
};

export default MainPage;