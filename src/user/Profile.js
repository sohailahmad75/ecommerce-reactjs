import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  componentDidMount() {
    console.log("user Id from router param", this.props.match.params.userId);
  }

  render() {
    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Profile</h1>
        <p> Name : {isAuthenticated().user.name}</p>

        <p> Email : {isAuthenticated().user.email}</p>
      </div>
    );
  }
}

export default Profile;
