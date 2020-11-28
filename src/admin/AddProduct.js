import React , {useState, useEffect} from "react";
import Layout from "../core/Layout";
import '../styles/AddCategory.scss'
import { isAuthenticate } from "../auth/Index";
import { addProduct, getCategories } from "./apiAdmin";
import {showMessage} from "../core/ShowMessage";
// import {NotificationContainer, NotificationManager} from 'react-notifications';

// import DropzoneDialogExample from './DropzoneDialog'

const AddProduct = (props) => {
  const { user , token } = isAuthenticate();
  // const [dialogFiles , setDialogFiles]  = useState([])
    const [values, setValues] = useState({
      name: '',
      description: '',
      price: '',
      categories: [],
      category: '',
      shipping: '',
      quantity: '',
      photo: '',
      loading: false,
      error: '',
      createProduct: '',
      redirectToProfile: false,
      formData: '',
      location: '',
      sDate: '',
      eDate: ''
    });
    const {
      name,
      description,
      price,
      categories,
      category,
      shipping,
      quantity,
      photo,
      loading,
      error,
      createdProduct,
      redirectToProfile,
      formData,
      location,
      sDate,
      eDate
    } = values;


    // load categoies and setData
    const init = () => {
      getCategories().then(data => {
        console.log("categoriesData", data)
        if (data.err) {
          setValues({...values, error: data.err})
        }
        else {
          setValues({...values, categories: data, formData: new FormData()})
        }
      })
    }


    useEffect ( ()=> {
      init()
    }, [])
  const handleChange = name => event => {
    const value = name === 'photo'? event.target.files[0] : event.target.value
    if (name === 'price') {
      console.log('pppppppppppppppp', value)
      formData.set('bidPrice', value)
      formData.set('price', value)
    }
    else if (name === 'sDate' ) {
      formData.set(name , value + 'T00:00')
    }
    else if (name === 'eDate') {
      formData.set(name , value + 'T24:00')
    }
    else {
      formData.set(name, value)
    }
    console.log('name', name)
    console.log('value', value)
    // const value = event.target.value;
    // console.log('old file', event.target.files[0])
    
    setValues({...values, [name] : value})
    console.log('valuesssssssssssss', values)
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    console.log('data', e)
    formData.set('userId', user._id)
    formData.set('userName', user.name)
    formData.set('bidUserID', user._id)
    formData.set('bidUserName', user.name)
    formData.set('bidUserNumber', user.number)
    setValues({...values, error: '', loading: true})
    addProduct(user._id, token, formData)
    .then(data => {
      console.log('data', data)
      if (data?.error) {
        setValues({...values})
        showMessage("Error!!", data.error, "danger");
      } else {
      setValues({...values, name: '', description: '', price: '', category: '', quantity: '', shipping: '' , location: '', loading: false, createdProduct: data.name})
      showMessage("Success", "Your Product added successfully", "success");
      setTimeout(() => {
        props.history.push("/myads");
      }, 3000);
      }
    })
    
  };
  // const showError = () => {
  //   error && <h3 className='text-danger' style={{textAlign: 'center', display: error ? '' : "none"}}>{error}</h3>
  // }
  // const showSuccess = () => {
  //   createdProduct && <h3 className='text-success' style={{textAlign: 'center', display: createdProduct ? '' : "none"}}>{`${createdProduct} is Created!!`}</h3>
  //   }

  // const showLoading = () => {
  //   loading && <h3 className='text-success' style={{textAlign: 'center'}}>loading...</h3>
  //  }

  return (
    <Layout
      title="Add Product"
      description= {`Add Product here ${name}`} 
      className="AddProduct"
    >
      <div className="container">
        <div className="row">      
          <div className="col-md-8 align-self-center col-sm-12 form-container" style= {{margin: '25px auto'}}>
            {/* {showError}
            {showSuccess()}
            {showLoading()} */}
            <form onSubmit= {clickSubmit}>
            
            <div className="form-group">
                <label className="text-muted">Product Image</label>
                <input
                  type="file"
                  name = 'photo'
                  accept = 'image/*'
                  onChange={handleChange('photo')}
                  style = {{display: 'block'}}
            required
                />
                
              </div>
              <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input
                  type="text"
                  onChange={handleChange('name')}
                  className="form-control"
                  value = {name}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Description</label>
                <textarea
                  type="text"
                  onChange={handleChange('description')}
                  className="form-control"
                  value = {description}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Category</label>
                {console.log('categories',categories)}
                <select className="form-control" onChange={handleChange('category')} required>
                  <option>Please Select Category</option>
                  {categories && categories.map((c, i) => (
                    <option key={i} value= {c._id}>{c.name}</option>
                  ))}
                  
                </select>
              </div>
              <div className="form-group">
                <label className="text-muted">Product Price</label>
                <input
                  type="number"
                  onChange={handleChange('price')}
                  className="form-control"
                  value = {price}
                  required
                />
              </div>
              {/* <div className="form-group">
                <label className="text-muted">Product Shipping</label>
                <select className="form-control" onChange={handleChange('shipping')}>
                <option>Please Select Category</option>
                  <option value= 'flase'>No</option>
                  <option value= 'true'>Yes</option>
                </select>
              </div> */}
              {/* <div className="form-group">
                <label className="text-muted">Product Quantity</label>
                <input
                  type="number"
                  onChange={handleChange('quantity')}
                  className="form-control"
                  value = {quantity}
                  required
                />
              </div> */}
              <div className="form-group">
              <label className="text-muted mr-1">Bid Start Date:</label>
              <input
          type="date"
          onChange={handleChange('sDate')}
          value = {sDate}
                  required
                  className='form-date'
        />
        {sDate && (
          <span style={{marginLeft: '10px'}}>
            <label className="text-muted mr-1">Bid End Date:</label>
            <input
              type="date"
              value = {eDate}
              required
              min = {sDate}
              onChange={handleChange('eDate')}
              className='form-date'
            />
          </span>
        )}
              </div>
              <div className="form-group">
                <label className="text-muted">Location</label>
                <input
                  type="text"
                  onChange={handleChange('location')}
                  className="form-control"
                  value = {location}
                  required
                />
              </div>
  
              <button
         type='submit'
          className="btn btn-warning mb-5"
          style={{float: "right", backgroundColor: 'rgb(43, 57, 137)', borderColor: 'rgb(63, 81, 181)', color: 'white' }}
        >
         Add Product
        </button>
            </form>           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
