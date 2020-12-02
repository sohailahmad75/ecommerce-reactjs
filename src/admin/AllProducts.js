import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { isAuthenticate } from "../auth/Index";
import { showMessage } from "../core/ShowMessage";
import { getAllProducts, removeProduct } from "./apiAdmin";
import CircularProgress from "@material-ui/core/CircularProgress";
const AllProducts = (props) => {
  const [products, setProducts] = useState([]);
//   const { user, token } = isAuthenticate();
  const loadProducts = () => {
    getAllProducts().then((res) => {
      setProducts(res);
    });
  };
  const deletProduct = (prodtctId) => {
    
    removeProduct(prodtctId)
        .then((res) => {
          if (res.error) {
            showMessage("Error!!", res.error, "danger");
          } else {
            showMessage("Success", "Product Deleted Successfully", "success");
            loadProducts();
          }
        })
        .catch((err) => alert(err));
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Active Bid Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products ? (
          products.map((singleProduct, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{singleProduct.userName}</td>
              <td>{singleProduct.name}</td>
              <td>{singleProduct.price}</td>
              <td>{singleProduct.bidPrice}</td>
              <td style={{ display: "flex" }}>
                <img
                  onClick={() => {
                    deletProduct(singleProduct._id);
                  }}
                  width="20px"
                  height="20px"
                  src="/Images/delete.svg"
                  alt="deleteIcon"
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <th></th>
            <td></td>
            <td></td>
            <td className="d-flex justify-content-end">
              <CircularProgress color="primary" />
            </td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AllProducts;
