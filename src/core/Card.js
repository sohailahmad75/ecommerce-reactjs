import React from "react";
// import {
//   Card, CardImg, CardText, CardBody,
//   CardTitle, CardSubtitle, Button
// } from 'reactstrap';
import "../styles/Styles.scss";
import ShowImage from "./ShowImage";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
const theme = createMuiTheme({
  palette: {
    secondary: indigo,
  },
});
const CardComponent = ({ product }) => {
  return (
    //  <Card className= {'cardMain cardHover col-md-3'}>
    //   <ShowImage item={product} url="product" />
    //   <CardBody>
    //     <div>
    //     <CardText style={{margin: '-10px 0px 0px' , textAlign: 'right'}}>
    //       <small className="text-muted">Posted at: { moment(product.createdAt).fromNow()}</small>
    //     </CardText>
    //     <CardTitle style= {{fontWeight: 'bold'}}>{product.name}</CardTitle>
    //     <CardText>{product.description}</CardText>
    //     <CardText><span style= {{fontWeight: 'bold'}}>₨: </span>{product.price}</CardText>
    //     </div>
    //   </CardBody>
    //   <Link style={{margin: 'auto'}} to={`/product/${product._id}`}>
    //   <button className="btn btn-outline-dark buttonCard" type='submit'>View Product</button>
    //   </Link>
    // </Card>
    <div className="col-md-4">
      <Card className="mycard col-md-12">
        <ShowImage item={product} url="product" />
        {/* <CardMedia
        className='mycardMedia'
        image= {product}
        title="image"
      /> */}
        <CardContent>
          <div style={{display: 'flow-root'}}>
            <Typography
              gutterBottom
              variant="body2"
              className = 'cardPost'
            >
              Posted at: {moment(product.createdAt).fromNow()}
            </Typography>
          </div>

          <Typography
            gutterBottom
            variant="body2"
            style={{ fontWeight: "bold", color: "#3f51b5", fontSize: '20px' }}
          >
            ₨: {product.price}
          </Typography>
          <Typography
            gutterBottom
            variant="subheading"
            style={{ fontWeight: "bold" }}
          >
            {product.name}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            
          >
          <span style={{ fontWeight: "bold" }}>Location: </span>{product.location}
          </Typography>
          <Typography variant="body2"> <span style={{ fontWeight: "bold" }}>Description: </span>{product.description}</Typography>
        </CardContent>
        <CardActions>
        <MuiThemeProvider theme={theme}>
          <Button
            variant="outlined"
            component={Link}
            to={`/product/${product._id}`} 
            style = {{margin: '15px auto'}}
            color="secondary"
          >
            View Product
          </Button>
          </MuiThemeProvider>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardComponent;
