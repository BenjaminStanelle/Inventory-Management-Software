import React, { useState } from "react";
import { AppContext } from "./AppContext.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import Register from "./components/MainPage/Sections/Register/Register.js";
import "./App.css";
//import Signin from "./components/MainPage/Sections/Signin/Signin.js";
//import MainPage from "./components/MainPage/MainPage.js";
//import PrivateRoute from "./components/PrivateRoute.js";
import MainPage from "./components/IndexPages/IndexPage.js";
import Register from "./components/IndexPages/MainViews/Register/Register.js";
import SignIn from "./components/IndexPages/MainViews/Signin/Signin.js";
import Home from "./components/IndexPages/MainViews/Home/Home.js";
import Dashboard from "./components/IndexPages/MainViews/Dashboard/Dashboard.js";
import Reorder from "./components/IndexPages/MainViews/Dashboard/Re-order/Reorder.js";
import Assistance from "./components/IndexPages/MainViews/Dashboard/Assistance/Assistance.js";
import Store from "./components/IndexPages/MainViews/Dashboard/Store/Store.js";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <AppContext.Provider value={[authenticated, setAuthenticated]}>
      <BrowserRouter>
        <Switch>
          
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/signin">
            <SignIn/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/reorder">
            <Reorder/>
          </Route>
          <Route path="/help">
            <Assistance/>
          </Route>
          <Route path="/store">
            <Store/>
          </Route>
          
          </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );

}

export default App;
