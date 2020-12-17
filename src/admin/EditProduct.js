import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import "../styles/AddCategory.scss";
import { isAuthenticate } from "../auth/Index";
import { editProduct, getCategories, getImage } from "./apiAdmin";
import { cities } from "../pk";
import Select from "react-select";
import _ from "lodash";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import moment from "moment";
const EditProduct = (props) => {
  const history = useHistory();
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
    setValues((prevState) => ({ ...prevState, ...product }));
    getCategories().then((data) => {
      if (data.err) {
        setValues((prevState) => ({ ...prevState, error: data.err }));
      } else {
        console.log("data", data);
        setValues((prevState) => ({
          ...prevState,
          categories: data,
          formData: new FormData(),
        }));
      }
    });
  };

  useEffect(() => {
    init();
  }, []);
  const handleChange = (name) => (event) => {
    console.log("formData", formData);
    console.log(
      "🚀 ~ file: EditProduct.js ~ line 83 ~ handleChange ~ name",
      name
    );
    console.log(
      "🚀 ~ file: EditProduct.js ~ line 83 ~ handleChange ~ event",
      event
    );
    const value =
      name === "photo" ? event.target.files[0] : event?.target?.value;
    console.log("value", value);
    if (name === "location") {
      formData.set("location", event.value);
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
    setValues({ ...values, error: "", loading: true });
    formData.append("productId", product._id);
    editProduct(user._id, token, formData)
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error });
        }
        history.push("/");
      })
      .catch();
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
    value: location,
    label: location,
  };
  sDate = sDate.split("T", 1)[0];
  eDate = eDate.split("T", 1)[0];
  console.log("values", values);
  const removeImage = () => {
    setValues((prevState) => ({ ...prevState, photo: "" }));
  };
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
            {values.photo && (
              <div className="position-relative" style={{ width: 200 }}>
                <img
                  style={{ width: "100%" }}
                  src={
                    values.photo.data
                      ? `data:${
                          values?.photo?.contentType
                        };base64,${Buffer.from(values?.photo?.data).toString(
                          "base64"
                        )}`
                      : URL.createObjectURL(values.photo)
                  }
                  alt=""
                />

                <IconButton
                  size="small"
                  onClick={removeImage}
                  className="position-absolute"
                  style={{ top: -20, right: -20, zIndex: 99, color: "red" }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </div>
            )}

            {/* {showError}

            {showSuccess()}
            {showLoading()} */}
            <form onSubmit={clickSubmit}>
              <div className="form-group">
                <label className="text-muted">Product Image</label>
                {!values.photo && (
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange("photo")}
                    style={{ display: "block" }}
                    required
                  />
                )}
              </div>
              <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input
                  type="text"
                  onChange={handleChange("name")}
                  className="form-control"
                  value={values.name}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Description</label>
                <textarea
                  type="text"
                  onChange={handleChange("description")}
                  className="form-control"
                  value={values.description}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Category</label>
                <select
                  className="form-control"
                  onChange={handleChange("category")}
                  required
                  value={values.category}
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
                  onChange={handleChange("price")}
                  className="form-control"
                  value={values.price}
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
                  onChange={handleChange("sDate")}
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
                      onChange={handleChange("eDate")}
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
                  defaultValue={{
                    value: values.location,
                    label: values.location,
                  }}
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
