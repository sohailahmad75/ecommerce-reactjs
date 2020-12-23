import React  from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticate} from "./Index";

const PersonalRoute = ({ component : Component, ...rest}) => (
  <Route
    {...rest}
    render = { props => (isAuthenticate() && isAuthenticate().user._id === props?.location?.data?.product?.userId ) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname : '/' ,
        state : {form : props.location}
      }}
      />
    )
    }
  />
)

export default PersonalRoute;