import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth/Index";
import "../styles/Deshboard.scss";
import AddCategory from "./AddCategory";
import AllUsers from "./AllUsers";
import AllProducts from './AllProducts'
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticate();
  const [activeTab, setActiveTab] = useState(0);
  const adminInfo = () => (
    <div>
      {activeTab === 0 && (
          <div class="card">
            <div class="card-header">
              <h5 className="heading">My Info</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <span className="sub-heading">Name :</span>{" "}
                <span className="user-info">{name}</span>
              </li>
              <li class="list-group-item">
                <span className="sub-heading">Email :</span>{" "}
                <span className="user-info">{email}</span>
              </li>
              <li class="list-group-item">
                <span className="sub-heading">Role :</span>
                <span className="user-info">
                  {role === 0 ? "RegisteredUser" : "Admin"}
                </span>
              </li>
            </ul>
          </div>
      )}
      {activeTab === 1 && (
          <div class="card">
            <div class="card-header">
              <h5 className="heading">Create Category</h5>
            </div>
            <ul class="list-group list-group-flush p-4">
              <AddCategory/>
            </ul>
          </div>
      )}
       {activeTab === 2 && (
          <div class="card">
            <div class="card-header">
              <h5 className="heading">All Users</h5>
            </div>
            <ul class="list-group list-group-flush p-sm-4 table-sm">
              <AllUsers/>
            </ul>
          </div>
      )}
          {activeTab === 3 && (
          <div class="card">
            <div class="card-header">
              <h5 className="heading">All Products</h5>
            </div>
            <ul class="list-group list-group-flush p-sm-4 table-sm">
              <AllProducts/>
            </ul>
          </div>
      )}
    </div>
  );

  const adminLinks = () => (
    <div class="card">
      <div className="card-header">
        <h5 className="heading">Admin Links</h5>
      </div>
      <ul class="list-group  my-group list-group-flush">
      <li className={"list-group-item "  + (activeTab === 0 ? 'active' : '')} onClick={() => {setActiveTab(0)}}>My Info</li>
        <li className={"list-group-item "  + (activeTab === 1 ? 'active' : '')} onClick={() => {setActiveTab(1)}}>Create Category</li>
        <li className={"list-group-item "  + (activeTab === 2 ? 'active' : '')} onClick={() => {setActiveTab(2)}}>All Users</li>
        <li className={"list-group-item "  + (activeTab === 3 ? 'active' : '')} onClick={() => {setActiveTab(3)}}>All Products</li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Admin DashBoard"
      description="Admin DashBoard here"
      className="userDashboard"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">{adminLinks()}</div>
          <div className="col-md-9 col-sm-6">{adminInfo()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
