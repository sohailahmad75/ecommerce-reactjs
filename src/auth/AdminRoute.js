import React  from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticate} from "./Index";


const AdminRoute = ({ component : Component, ...rest}) => (
  <Route
    {...rest}
    render = { props => isAuthenticate() && isAuthenticate().user.role === 1 ? (
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

export default AdminRoute;