import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import userDashboard from "./user/Dashboard";
import AdminDashboard from "./admin/Deshboard";
import PrivateRoute from "./auth/PrivateRoute";
import PersonalRoute from "./auth/PersonalRoute";
import AdminRoute from "./auth/AdminRoute";
import AddCategory from './admin/AddCategory'
import AddProduct from "./admin/AddProduct";
import Profile from './user/UserProfile'
import Shop from './core/Shop'
import Product from "./core/Product";
import EditProduct from "./admin/EditProduct";
import MyAds from "./core/MyAds";
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/shop" exact component={Shop} />
      <Route path="/signup" exact component={Signup} />
      {/* <PrivateRoute path="/user/dashboard" exact component={userDashboard} /> */}
      <PrivateRoute path="/create/product" exact component={AddProduct} />
      <PrivateRoute path="/profile/:userId" exact component={Profile} />
      <PrivateRoute path="/myads" exact component={MyAds} />
      {/*<PrivateRoute path="/product/edit" exact component={EditProduct} />*/}

      <PersonalRoute path="/product/edit/:productId" exact component={EditProduct} />
      {/* Routes for Admin */}
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      <AdminRoute path="/create/category" exact component={AddCategory} />
      <Route path="/product/:productId" exact component={Product} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
