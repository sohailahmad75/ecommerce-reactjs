import React, { Component } from "react";
import { singUp } from "../auth/Index";
export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }
  handleChange = name => event => {
    this.setState({ error: "", open: false });
    this.setState({ [name]: event.target.value });
  };
  clickSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    //console.log(user);
    singUp(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          open: true
        });
    });
  };

  SignUpForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email "
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Submit
      </button>
    </form>
  );
  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Sign Up</h1>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New account is successfully created. Please Login !!!!
        </div>
        {this.SignUpForm(name, email, password)}
      </div>
    );
  }
}
