
import Layout from "../core/Layout";
import { signIn, authenticate } from "../auth/Index";
import { Redirect } from "react-router-dom";
import { isAuthenticate } from "../auth/Index";
import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { showMessage } from "../core/ShowMessage";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    backgroundColor: 'rgb(63, 81, 181)',
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToRefferer: false,
  });
    const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ email, password }).then((data) => {
      console.log(data)
      if (data.err) {
        setValues({ ...values, error: data.err, loading: false });
        showMessage("Error!!", data.err , "danger");
        console.log(data.err);
      } else {
        authenticate(data, () => {
          showMessage("Success", "Login Successfully", "success");
          setValues({
            ...values,
            redirectToRefferer: true,
          });
        });
      }
    });
  };
  const { email, password, error, loading, redirectToRefferer } = values;
  const { user } = isAuthenticate();

  const handleSubmit = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () =>
    loading && <div className="alert alert-info">Loading........</div>;
  const redirectUser = () => {

    if (redirectToRefferer) {
      if (user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } 
    }
    if (isAuthenticate()) {
      return <Redirect to="/" />;
    }
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='m-auto'>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={clickSubmit} noValidate>
              <TextField
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
                autoComplete="email"
                autoFocus
              />
              <TextField
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
                Sign In
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
      {redirectUser()}
    </Layout>
  );
}
