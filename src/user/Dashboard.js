import React from "react";
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth/Index";
import "../styles/Deshboard.scss";
import { Link } from "react-router-dom";



const userDashboard = () => {
  const { user : { name , email, role} } = isAuthenticate();
  const userInfo = () => (
    <div className="card">
      <div className="card-header">
        <h5 className="heading">User Info</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="sub-heading">Name :</span>{" "}
          <span className="user-info">{name}</span>
        </li>
        <li className="list-group-item">
          <span className="sub-heading">Email :</span>{" "}
          <span className="user-info">{email}</span>
        </li>
        <li className="list-group-item">
          <span className="sub-heading">Role :</span>
          <span className="user-info">
            {role === 0 ? "RegisteredUser" : "Admin"}
          </span>
        </li>
      </ul>
    </div>
  );
  
  const userLinks = () => (
    <div className="card">
      <div className="card-header">
        <h5 className="heading">User Links</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link className="userLink" to="/cart">
            Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="userLink" to="/profile/update">
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );
  return (
    <Layout
    title="User DashBoard"
    description="User Dashboard Here"
    className="userDashboard"
  >
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6" style = {{'margin-bottom' :  '10px'}}>{userLinks()}</div>
        <div className="col-md-9 col-sm-6">{userInfo()}</div>
      </div>
    </div>
  </Layout>
  )
};

export default userDashboard;
