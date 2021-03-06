import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import SuppliersProducts from './suppliers/pages/SuppliersProducts';
import NewProduct from './products/pages/NewProduct';
import UserProducts from './products/pages/UserProducts';
import UpdateProduct from './products/pages/UpdateProduct';
import AccountInfo from './user/pages/view/AccountInfo';
import ChangePassword from './user/pages/ChangePassword';
import DashBoard from './shared/DashBoard/DashBoard'
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

//import NewProduct from './products/pages/NewProduct';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <DashBoard />
        </Route>
        <Route path="/:userId/account">
          <AccountInfo />
        </Route>
        <Route path="/account/password" exact>
          <ChangePassword />
        </Route>
        <Route path="/:userId/products" exact>
          <UserProducts />
        </Route>
        <Route path="/products/new" exact>
          <NewProduct />
        </Route>
        <Route path="/products/:productId">
          <UpdateProduct />
        </Route>
        <Route path="/:userId/suppliers" exact>
          <SuppliersProducts />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <DashBoard />
        </Route>
        <Route path="/:userId/account">
          <AccountInfo />
        </Route>
        <Route path="/:userId/suppliers" exact>
          <SuppliersProducts />
        </Route>
        <Route path="/:userId/products" exact>
          <UserProducts />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
