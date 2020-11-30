import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, readUserData, listRelated, deleteMyProduct } from "./Index";
import ShowImage from "./ShowImage";
import Counter from "./CountDownTimer";
import { showMessage } from "./ShowMessage";
// import 'animate.css/animate.compat.css';
import RelatedImage from "./showRelatedImage";
import { Link, Redirect } from "react-router-dom";

import { isAuthenticate } from "../auth/Index";
import { addBid } from "../user/apiUser";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./../styles/Styles.scss";
import moment from "moment";
const Product = (props) => {
  const { user, token } = isAuthenticate();
  console.log('user', token)
  const [values, setValues] = useState({
    price: "",
    formData: new FormData(),
  });
  const { price, formData } = values;
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [singleImage, setsingleImage] = useState(true);
  const [userInfo, setUserInfo] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.product.userId) {
        readUserData(data.product.userId).then((userData) => {
          if (userData.error) {
            setError(userData.error);
          } else {
            setUserInfo(userData.user);
          }
        });
      }

      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data.product);
        // fetch related products
        listRelated(data.product._id).then((data) => {
          if (data.error) {
            // setError(data.error);
            showMessage("Error!!", data.error, "danger");
          } else {
            setRelatedProduct(data);
            console.log("related p", relatedProduct);
          }
        });
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    console.log("valuesssssssssssss", values);
  };
  const deleteProduct = (productId, userId) => {
    console.log("productId", productId);
    console.log("userId", userId);
    deleteMyProduct(productId, userId, token)
      .then((res) => {
        showMessage("Success", "Product deleted Successfully", "success");
        props.history.push("/myads");
      })
      .catch((err) => alert(err));
  };
  const editProduct = () => {
    setRedirect(true);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    if (token) {
      console.log("data", e);
      formData.set("userId", user._id);
      console.log("aaa", user);
      formData.set("productId", product._id);
      formData.set("bidUserName", user.name);
      formData.set("bidUserNumber", user.number);
      setValues({ ...values, error: "", loading: true });
      console.log("asdfsdfsfsdffffffffffff");
      if (values.price > product.bidPrice) {
        addBid(user._id, token, formData).then((data) => {
          console.log("data", data);
          setProduct(data);
          showMessage("Success", "Bid Accepted Successfully", "success");
        });
      } else {
        console.log("asdfsdfsfsdffffffffffff");
        setError(true);
        showMessage(
          "Warning!!",
          "New bid price must be greater than active bid price.",
          "warning"
        );
      }
    } else {
      setOpenDialog(true);
    }
  };
  useEffect(() => {
    const productId = props.match.params.productId;
    console.log("productId", productId);
    loadSingleProduct(productId);
  }, [props]);
  if (redirect)
    return (
      <Redirect
        to={{ pathname: `/product/edit/${product._id}`, data: { product } }}
      />
    );
  return (
    <Layout
      title={product?.name}
      description={product?.description?.substring(0, 100)}
      className="container-fluid"
    >
      <Modal isOpen={openDialog}>
        <ModalHeader>
          Login Required{" "}
          <span
            onClick={() => {
              setOpenDialog(false);
            }}
            style={{
              float: "right",
              color: "rgb(43, 57, 137)",
              cursor: "pointer",
            }}
          >
            <span>&times;</span>
          </span>{" "}
        </ModalHeader>
        <ModalBody>You must login First</ModalBody>
        <ModalFooter>
          <Link to="/signin">
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setOpenDialog(false);
              }}
              style={{
                backgroundColor: "rgb(43, 57, 137)",
                borderColor: "rgb(63, 81, 181)",
                color: "white",
              }}
            >
              Login
            </button>
          </Link>
        </ModalFooter>
      </Modal>

      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-md-1 col-sm-0"> </div>
        <div className="col-md-6 col-sm-12">
          <div className="col-12">
            <ShowImage item={product} url="product" singleImage={singleImage} />
          </div>
          <div className="col-12">
            <div
              className="col-md-12 col-sm-12 mb-1 mt-1"
              style={{ display: "flex", overflow: "auto", padding: "10px 0px" }}
            >
              {relatedProduct &&
                relatedProduct.map((p, i) => (
                  <div className="col-4" key={i}>
                    <div className="row">
                      <div className="col-12">
                        <Link to={`/product/${p._id}`}>
                          <RelatedImage
                            item={p}
                            url="product"
                            singleImage={singleImage}
                          />
                        </Link>
                      </div>
                      <div className="col-12 related-content">
                        <div>
                          <span style={{ fontWeight: "bold" }}>Rs: </span>
                          {p.price}
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Name: </span>
                          {p.name}
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Location: </span>
                          {p.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          {console.log("productrtttttttttttttttttttttttt", product)}
          <div className="single-image-right">
            {console.log(user)}
            {
            product.userId  && (
              <div className="w-100 d-flex justify-content-between mb-2">
                <img
                  onClick={() => {
                    deleteProduct(product._id, product.userId);
                  }}
                  width="30px"
                  height="30px"
                  src="/Images/delete.svg"
                  alt="deleteIcon"
                  style={{ cursor: "pointer" }}
                />
                <img
                  onClick={editProduct}
                  width="30px"
                  height="30px"
                  src="/Images/productEdit.svg"
                  alt="editIcon"
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}

            <div
              style={{
                marginBottom: "10px",
                color: "#3f51b5",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>₨: </span>
              {new Intl.NumberFormat("en-PK", {
                maximumSignificantDigits: 3,
              }).format(product.price)}
            </div>
            <div style={{ marginBottom: "30px", color: "rgba(0,47,52,.64)" }}>
              {product.name}
            </div>
            <div style={{ marginBottom: "10px" }}>
              {" "}
              <span style={{ fontWeight: "bold" }}>Location: </span>
              {product.location}
            </div>
            <div style={{ marginBottom: "10px" }}>
              {" "}
              <span style={{ fontWeight: "bold" }}>Posted at: </span>
              {moment(product.createdAt).fromNow()}
            </div>
            <div style={{ marginBottom: "10px" }}>
              {" "}
              <span style={{ fontWeight: "bold" }}>Description: </span>
              {product.description}
            </div>
          </div>
          <div className="single-image-right" style={{ marginTop: "10px" }}>
            <h4
              style={{
                marginBottom: "10px",
                color: "#3f51b5",
                fontWeight: "bold",
                fontSize: "24px",
                width: "100%",
              }}
            >
              Top Bid
              <span
                style={{
                  float: "right",
                  color: "#212529",
                  fontSize: "20px",
                  color: "#3f51b5",
                }}
              >
                <span style={{ marginLeft: "auto", fontWeight: "bold" }}>
                  ₨:{" "}
                </span>
                {product.bidPrice}
              </span>
            </h4>

            <div style={{ marginBottom: "10px", width: "100%" }}>
              <span style={{ fontWeight: "bold" }}>Name: </span>
              {product.bidUserName}
              <span style={{ float: "right" }}>
                <Counter
                  style={{ marginLeft: "auto" }}
                  sDate={product.sDate}
                  eDate={product.eDate}
                />
              </span>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Contact Number: </span>
              {product.bidUserNumber}
            </div>

            <div style={{ marginBottom: "10px" }}>
              {console.log('moment(Date.now()).isBefore(product.eDate)', moment(Date.now()).isBefore(product.eDate))}
              {(moment(Date.now()).isBefore(product.sDate) || !moment(Date.now()).isBefore(product.eDate)) ? (
                ""
              ) : (
                <form onSubmit={clickSubmit} style={{ marginTop: "10px" }}>
                  <span style={{ fontWeight: "bold" }} className="mb-2">
                    Place your Bid:
                  </span>
                  <div className="form-group">
                    <input
                      type="number"
                      onChange={handleChange("price")}
                      className="form-control"
                      value={price}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    style={{
                      backgroundColor: "rgb(43, 57, 137)",
                      borderColor: "rgb(63, 81, 181)",
                      color: "white",
                    }}
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="single-image-right" style={{ marginTop: "10px" }}>
            <h4
              style={{
                marginBottom: "10px",
                color: "#3f51b5",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              Seller Information
            </h4>
            {userInfo && (
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Name: </span>
                  {userInfo.name}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Member since: </span>
                  {moment(userInfo.createdAt).fromNow()}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>Contact Number: </span>
                  {userInfo.number}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-1 col-sm-0"> </div>
      </div>
    </Layout>
  );
};

export default Product;
