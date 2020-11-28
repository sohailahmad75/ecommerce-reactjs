import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { isAuthenticate } from "../auth/Index";
import { showMessage } from "../core/ShowMessage";
import { getAllUsers, removeUser } from "./apiAdmin";
import CircularProgress from "@material-ui/core/CircularProgress";
const AllUsers = (props) => {
  const [users, setUsers] = useState([]);
  const { user, token } = isAuthenticate();
  const loadUsers = () => {
    getAllUsers().then((res) => {
      setUsers(res);
    });
  };
  const deleteUser = (userId) => {
    console.log("userId", userId);
    if (user._id === userId) {
      showMessage("Error!!", "Admin Can't Delete It's own account", "danger");
    } else {
      removeUser(userId, token)
        .then((res) => {
          if (res.error) {
            showMessage("Error!!", res.error, "danger");
          } else {
            showMessage("Success", "User Deleted Successfully", "success");
            loadUsers();
          }
        })
        .catch((err) => alert(err));
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users ? (
          users.map((singleUser, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{singleUser.name}</td>
              <td>{singleUser.email}</td>
              <td>{singleUser.number}</td>
              <td style={{ display: "flex" }}>
                <img
                  onClick={() => {
                    deleteUser(singleUser._id);
                  }}
                  width="20px"
                  height="20px"
                  src="/Images/delete.svg"
                  alt="deleteIcon"
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <th></th>
            <td></td>
            <td className="d-flex justify-content-end">
              <CircularProgress color="primary" />
            </td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AllUsers;
