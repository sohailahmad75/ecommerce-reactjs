import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import "../styles/AddCategory.scss";
import { isAuthenticate } from "../auth/Index";
import { getCategories } from "./apiAdmin";
import { cities } from "../pk";
import Select from "react-select";
import _ from "lodash"
const EditProduct = (props) => {
  const product = props?.location?.data?.product;
  const citiesList = cities.map((city) => {
    return {
      value: city.city,
      label: city.city,
    };
  });
  
  const { user, token } = isAuthenticate();
  let [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createProduct: "",
    redirectToProfile: false,
    formData: "",
    location: "",
    sDate: "",
    eDate: "",
  });
  setValues(product)
  console.log('0', values)
  let {
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
    eDate,
  } = values;

  const init = () => {

    getCategories().then((data) => {
      
      if (data.err) {
        setValues({ ...values, error: data.err });
      } else {
        console.log('data', data)
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);
  const handleChange = (name) => (event) => {
    
    console.log('formData', formData)
  console.log("🚀 ~ file: EditProduct.js ~ line 83 ~ handleChange ~ name", name)
  console.log("🚀 ~ file: EditProduct.js ~ line 83 ~ handleChange ~ event", event)
    const value =
      name === "photo"
        ? event.target.files[0]
        : event?.target?.value;

    if (name === "location") {
      formData.set("location", value);
    } else if (name === "price") {
      
      formData.set("bidPrice", value);
      formData.set("price", value);
    } else if (name === "sDate") {
      formData.set(name, value + "T00:00");
    } else if (name === "eDate") {
      formData.set(name, value + "T24:00");
    } else {
      formData.set(name, value);
    }
    
    
    // const value = event.target.value;
    // 

    setValues({ ...values, [name]: value });
    
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    
    formData.set('userId', user._id)
    formData.set('bidUserID', user._id)
    formData.set('bidUserName', user.name)
    formData.set('bidUserNumber', user.number)
    setValues({...values, error: '', loading: true})
    // addProduct(user._id, token, formData)
    .then(data => {
      
      // if (data.error) {
      //   setValues({...values, error: data.error})
      // }
        setValues({...values, name: '', description: '', price: '', category: '', quantity: '', shipping: '' , location: '', loading: false, createdProduct: data.name})
    
    })
    .catch()
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
  const defaultLocation = {
    value : location,
    label : location
  }
  sDate = sDate.split("T", 1)[0]
  eDate = eDate.split("T", 1)[0]
  return (
    <Layout
      title="Add Product"
      description={`Add Product here ${name}`}
      className="EditProduct"
    >
      <div className="container">
        <div className="row">
          <div
            className="col-md-8 align-self-center col-sm-12 form-container"
            style={{ margin: "25px auto" }}
          >
            {/* {showError}

            {showSuccess()}
            {showLoading()} */}
            <form onSubmit={clickSubmit}>
              <div className="form-group">
                <label className="text-muted">Product Image</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange('photo')}
                  style={{ display: "block" }}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input
                  type="text"
                  onChange={handleChange('name')}
                  className="form-control"
                  value={name}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Description</label>
                <textarea
                  type="text"
                  onChange={handleChange('description')}
                  className="form-control"
                  value={description}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Category</label>
                <select
                  className="form-control"
                  onChange={handleChange('category')}
                  required
                >
                  <option>Please Select Category</option>
                  {categories &&
                    categories.map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label className="text-muted">Product Price</label>
                <input
                  type="number"
                  onChange={handleChange('price')}
                  className="form-control"
                  value={price}
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
                  value={sDate}
                  required
                  className="form-date"
                />
                {sDate && (
                  <span style={{ marginLeft: "10px" }}>
                    <label className="text-muted mr-1">Bid End Date:</label>
                    <input
                      type="date"
                      value={eDate}
                      required
                      min={sDate}
                      onChange={handleChange('eDate')}
                      className="form-date"
                    />
                  </span>
                )}
              </div>
              <div className="form-group">
                <label className="text-muted">Location</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={defaultLocation}
                  onChange={handleChange("location")}
                  name="color"
                  options={citiesList}
                />
                {/* <input
                  type="text"
                  // onChange={handleChange('location')}
                  className="form-control"
                  value={location}
                  required
                /> */}
              </div>

              <button
                type="submit"
                className="btn btn-warning mb-5"
                style={{
                  float: "right",
                  backgroundColor: "rgb(43, 57, 137)",
                  borderColor: "rgb(63, 81, 181)",
                  color: "white",
                }}
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

export default EditProduct;
