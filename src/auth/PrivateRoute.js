import React  from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticate} from "./Index";


const PrivateRoute = ({ component : Component, ...rest}) => (
  <Route
    {...rest}
    render = { props => (isAuthenticate() ) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname : '/signin' ,
        state : {form : props.location}
      }}
      />
    )
    }
  />
)

export default PrivateRoute;