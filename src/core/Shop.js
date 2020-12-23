import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import CardComponent from "./Card";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import "../styles/Styles.scss";
import { prices } from "./fixedPrice";
import { Typography } from "@material-ui/core";
import { getCategories, getFilteredProducts } from "./Index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
const theme = createMuiTheme({
  palette: {
    secondary: indigo,
  },
});
const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [loading, setloading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);
  const init = () => {
    getCategories().then((data) => {
      
      if (data.err) {
        setError(data.err);
      } else {
        setCategories(data);
        
      }
    });
  };
  const loadFilteredResults = (newFilters) => {
    // 
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
        setloading(false);
      }
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;
    // 
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
        setloading(false);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={loadMore}
          className="btn btn-warning mb-5"
          style={{float: "right", backgroundColor: 'rgb(43, 57, 137)', borderColor: 'rgb(63, 81, 181)', color: 'white' }}
        >
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);
  const handleFilters = (filters, filterBy) => {
    
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  return (
    <Layout
      title="Shop Page"
      description="Filter Products of your choice"
      className="container-fluid"
    >
         <MuiThemeProvider theme={theme}>
      <div className="row" style={{ padding: "30px" }}>
        <div className="col-md-2 col-sm-12" style={{ margin: "10px 0px 20px" }}>
          <h5>Filter by categories</h5>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h5>Filter by Price Range</h5>

          <RadioBox
            prices={prices}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>

        <div className="col-md-10 col-sm-12">
          <Typography gutterBottom variant="h5" className={"categoryTitle"}>
            <span className={"titleText"}>Products</span>
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
          {loadMoreButton()}
        </div>
      </div>
      </MuiThemeProvider>
    </Layout>
  );
};

export default Shop;
