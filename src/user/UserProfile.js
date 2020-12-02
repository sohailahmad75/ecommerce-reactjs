// import React from "react";
// import Layout from "./Layout";

// const userProfile = (props) => {

//   return (
//     <Layout
//       className="container-fluid"
//     >
//       erqwrqw
//     </Layout>
//   );
// };

// export default userProfile;

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth/Index";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser, addProfileImage } from "./apiUser";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { showMessage } from "../core/ShowMessage";
import { API } from "../config";
import { Typography } from "@material-ui/core";
const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    error: false,
    success: false,
    formData: new FormData(),
    
  });
  // const [profileImage , setProfileImage] = useState()
  
  const { token, user } = isAuthenticate();
  const { name, email, password,  newPassword, confirmPassword, error, success, formData} = values;

  const init = (userId) => {
    // 
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        // setProfileImage(`${API}/user/photo/${user._id}`)
        setValues({ ...values, name: data.name, email: data.email});
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    
    if ( name === 'photo' ) {
        formData.append(name, e.target.files[0]);
        
        
        addProfileImage(user._id, token, formData) 
        .then (res=> {
          if (res.error) {
            showMessage("Error!!", res.error , "danger");
          }
          else {
            
            showMessage("Success", "Profile Updated Successfully", "success");
          }
         
         
        })
        .catch(err=> {
            
        })
    } else {
        setValues({ ...values, error: false, [name]: e.target.value });
    } 
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword === confirmPassword) {
      update(match.params.userId, token, { name, email, password, newPassword, confirmPassword }).then(
        (data) => {
          
          if (data.error) {
            // 
            showMessage("Error!!", data.error , "danger");
          } else {
            updateUser(data, () => {
              showMessage("Success", "Profile Data Updated Successfully", "success");
              setValues({
                password: '',
                name: data.name,
                email: data.email,
                success: true,
              });
            });
          }
        }
      );
    }
    else {
      showMessage("Error!!",'New Password and Confirm Password are not same' , "danger");
    }

  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to={`/profile/${user._id}`} />;
    }
  };
  const SmallAvatar = withStyles((theme) => ({
    root: {
      width: 22,
      height: 22,
      border: `2px solid white`,
      cursor: 'pointer'
    },
  }))(Avatar);
  const onEditClicked = () => {
    
    document.getElementById('fileButton').click();
  };
  const profileUpdate = (name, email, password, newPassword, confirmPassword) => (
    <form>
      <div className="d-flex justify-content-center">
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={<SmallAvatar onClick={onEditClicked} src="/Images/edit.svg" />}
          
        >
            <input type='file' onChange={handleChange("photo")} accept = 'image/*' id='fileButton' hidden/>
          <Avatar
            alt={`${user.name}`}
            style={{ width: "140px", height: "140px", fontSize: "40px" }}
            src={`${API}/user/photo/${user._id}`}
          />
        </Badge>
      </div>
      
      <div className="form-group">
        <label className="text-muted ">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          disabled
          className="form-control"
          value={email}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
          required
        />
      </div>
      {password && (
        <div>
          <div className="form-group">
            <label className="text-muted">New Password</label>
            <input
              type="password"
              onChange={handleChange("newPassword")}
              className="form-control"
              value={newPassword}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Confirm Password</label>
            <input
              type="password"
              onChange={handleChange("confirmPassword")}
              className="form-control"
              value={confirmPassword}
              required
            />
          </div>
        </div>
      )}
{/* 
      <button onClick={clickSubmit} className="btn btn-primary float-right">
        Submit
      </button> */}
      <button
          onClick={clickSubmit}
          className="btn btn-warning mb-5"
          style={{float: "right", backgroundColor: 'rgb(43, 57, 137)', borderColor: 'rgb(63, 81, 181)', color: 'white' }}
        >
          Update
        </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container"
    >
      <div className="profile-edit mt-5">
          {/* <Typography gutterBottom variant="h5" className={"categoryTitle"}>
            <span className={"titleText"}>Profile update</span>
          </Typography> */}
        {/* <h4 className="mb-4">Profile update</h4> */}
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </div>
    </Layout>
  );
};

export default Profile;
