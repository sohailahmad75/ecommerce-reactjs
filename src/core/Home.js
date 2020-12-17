import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./Index";
import CardComponent from "./Card";
// import { Spinner } from "reactstrap";
import Search from "./Search";
import { Typography } from "@material-ui/core";
import "../styles/Styles.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
const theme = createMuiTheme({
  palette: {
    secondary: indigo,
  },
});
const Home = () => {
  const [productsByPrice, setproductsByPrice] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("price").then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setproductsByPrice(data);
      }
      setloading(false);
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {

      if (data?.error) {
        setError(data?.error);
      } else {
        setProductsByArrival(data);
      }
      setloading(true);
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title="Home" description="Home Component here ">
      <MuiThemeProvider theme={theme}>
        <Search />
        <div className="container">
          <div>
            <Typography gutterBottom variant="h5" className={"categoryTitle"}>
              <span className={"titleText"}>Latest Arrival</span>
            </Typography>
          </div>
          {/* <h2>Latest Arrival</h2> */}
          <div style={{ display: "flex" }}>
            {loading && (
              <CircularProgress
                color="secondary"
                style={{ margin: "20px auto" }}
              />
              // <Spinner
              //   style={{ margin: "20px auto", width: "3rem", height: "3rem" }}
              // />
            )}
          </div>

          {!loading && (
            <div className="cardsDiv">
              {productsByArrival.map((product, i) => (
                <CardComponent key={i} product={product} />
              ))}
            </div>
          )}
          <div>
            <Typography gutterBottom variant="h5" className={"categoryTitle"}>
              <span className={"titleText"}>Low Price</span>
            </Typography>
          </div>
          {/* <h2>Low Price</h2> */}
          <div style={{ display: "flex" }}>
            {loading && (
              <CircularProgress
                color="secondary"
                style={{ margin: "20px auto" }}
              />
              // <Spinner
              //   style={{ margin: "20px auto", width: "3rem", height: "3rem" }}
              // />
            )}
          </div>
          {!loading && (
            <div className="cardsDiv">
              {productsByPrice.map((product, i) => (
                <CardComponent key={i} product={product} />
              ))}
            </div>
          )}
        </div>
      </MuiThemeProvider>
    </Layout>
  );
};

export default Home;
