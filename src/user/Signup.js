
import Layout from "../core/Layout";
import { signUp, authenticate } from "../auth/Index";
import { Redirect } from "react-router-dom";
import { isAuthenticate } from "../auth/Index";
import { showMessage } from "../core/ShowMessage";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "87vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "rgb(63, 81, 181)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    error: "",
    success: "",
  });
  const { name, email, password, number, error, success } = values;
  const handleSubmit = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    console.log("values", values);
    signUp({ name, email, password, number }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        showMessage("Error!!", data.error, "danger");
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          number: "",
          error: "",
          success: true,
        });
        showMessage("Success", "Signup Successfully", "success");
      }
    });
  };

  return (
    <Layout
      title="SignIn"
      description="SignIn Component here "
      className="container col-md-8 offset-md-2"
    >
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className="m-auto"
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={clickSubmit} noValidate>
              {/* <Input /> */}
              <TextField
                value={name}
                onChange={handleSubmit("name")}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                autoComplete="email"
                autoFocus
              />
              <TextField
                value={number}
                onChange={handleSubmit("number")}
                type="number"
                name="number"
                id="number"
                placeholder="Enter Mobile Number"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                autoComplete="tel"
              />
              <TextField
                // <Input value = {email} onChange={handleSubmit('email')} type="email" name="email" id="email" placeholder="example@xyz.com" />
                value={email}
                onChange={handleSubmit("email")}
                type="email"
                name="email"
                id="email"
                placeholder="example@xyz.com"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="current-password"
              />
              <TextField
                // <Input value = {password} onChange={handleSubmit('password')} type="password" name="password" id="password" placeholder="Enter Your Password" />
                value={password}
                onChange={handleSubmit("password")}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </form>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}
