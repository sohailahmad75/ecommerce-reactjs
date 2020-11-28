import React , {useState} from "react";
import Layout from "../core/Layout";
import '../styles/AddCategory.scss'
import { isAuthenticate } from "../auth/Index";
import { addCategories } from '../admin/apiAdmin'
import {showMessage} from "../core/ShowMessage";
const AddCategory = () => {
  const { user , token } = isAuthenticate();
    const [name, setName] = useState('');
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
  const handleChange = (e) => {
      setError('')
    setName(e.target.value)

  };
  const showError = () => {
    if (error) {
    return <h3 className='text-danger' style={{textAlign: 'center'}}>Category already Exist!!</h3>
    }
  }
  const showSuccess = () => {
    if (success) {
    return <h3 className='text-success' style={{textAlign: 'center'}}>Category created successfully!!</h3>
    }
  }
  const clickSubmit = (e) => {
    e.preventDefault();
    setError(false)
    setSuccess(false)
    addCategories(user._id, token, {name})
    .then(res => {
      if (res.err) {
        showMessage("Error!!", 'Category already Exist!' , "danger");
      }
      else {
        showMessage("Success", "Category created successfully!!", "success");
      }
    })
  };
  return (

      <div className="container">
        <div className="row justify-content-md-center" >      
          <div className='col-12'>
            <form onSubmit= {clickSubmit} style={{width : '100%'}}>
              <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  value = {name}
                  required
                />
              </div>
              {/* <button className="btn btn-outline-dark" type='submit'>Add Category</button> */}
              <button
         type='submit'
          className="btn btn-warning mb-2"
          style={{float: "right", backgroundColor: 'rgb(43, 57, 137)', borderColor: 'rgb(63, 81, 181)', color: 'white' }}
        >
         Add Category
        </button>
            </form>           
          </div>
          </div>
      </div>
  );
};

export default AddCategory;
