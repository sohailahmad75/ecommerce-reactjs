import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import CardComponent from "./Card";
import "../styles/Styles.scss";
import { prices } from "./fixedPrice";
import { isAuthenticate } from "../auth/Index";
import { Typography } from "@material-ui/core";
import { getCategories, getFilteredProducts } from "./Index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import { getMyAds } from "./Index";
const theme = createMuiTheme({
  palette: {
    secondary: indigo,
  },
});
const MyAds = () => {
  const { user , token } = isAuthenticate();
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getMyAds(user._id, token).then((data) => {
     setFilteredResults(data)
      setloading(false);
    })
    .catch (error => {
      console.log("error", error);
    });
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title="Shop Page"
      description="Filter Products of your choice"
      className="container-fluid"
    >
         <MuiThemeProvider theme={theme}>
      <div className="row" style={{ padding: "30px" }}>
      <div className="container">
        <div className="col-md-10 col-sm-12">
          <Typography gutterBottom variant="h5" className={"categoryTitle"}>
            <span className={"titleText"}>My Ads</span>
          </Typography>
          {/* <h2 className="mb-4">Products</h2> */}
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
          {filteredResults.length < 1 && <div>No products found</div>}
          <div className="cardsDiv">
            {filteredResults.map((product, i) => (
              <CardComponent key={i} product={product} />
            ))}
          </div>
          <hr />

        </div>
      </div>


      </div>
      </MuiThemeProvider>
    </Layout>
  );
};

export default MyAds;
