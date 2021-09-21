import React, { useState } from "react";
import { AppContext } from "./AppContext.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import Register from "./components/MainPage/Sections/Register/Register.js";
import "./App.css";
//import Signin from "./components/MainPage/Sections/Signin/Signin.js";
//import MainPage from "./components/MainPage/MainPage.js";
import PrivateRoute from "./components/PrivateRoute.js";
import MainPage from "./components/IndexPages/IndexPage.js";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <AppContext.Provider value={[authenticated, setAuthenticated]}>
      <BrowserRouter>
        <Switch>
          
          <Route path="/" exact component={MainPage} />
          </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );

}

export default App;
