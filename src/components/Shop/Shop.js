import React, { useEffect } from "react";
import { useState } from "react";
import "./Shop.css";

import { Link } from "react-router-dom";
import {
  CardActions,
  CircularProgress,
  Container,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardHeader } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  container: {
    paddingTop: "50px",
    paddingBottom: "20px",
    textAlign: "center",
    paddingLeft: "100px",
  },
}));

const Shop = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://nameless-plateau-15904.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // useEffect(()=>{
  //     const savedCart = getDatabaseCart();
  //     const productKeys = Object.keys(savedCart);
  //    if(products.length)
  //    {
  //     const previousCart = productKeys.map( existingKey => {
  //         const product = products.find( pd => pd.key === existingKey);
  //         product.quantity = savedCart[existingKey];
  //         return product;
  //     } )
  //     setCart(previousCart);
  //    }
  // }, [products])

  console.log(products);
  return (
    <div className="twin-container">
      <Grid
        container
        spacing={6}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {products.length === 0 && (
          <div id="loading">
            <CircularProgress />
            <CircularProgress color="secondary" />
            <h1>Loading...</h1>
          </div>
        )}

        {products.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={products.indexOf(item)}>
            <Card
              style={{
                backgroundColor: "#dfe6cc",
                height: 500,
                width: 300,
                marginLeft: 30,
                textAlign: "center",
              }}
            >
              <CardHeader title={`ProductName : ${item.name}`} />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <img src={item.imageURL} width="80%" alt="" />
                  <h4>Price: {item.price}</h4>
                  <h4>Available: {item.quantity}</h4>
                </Typography>
              </CardContent>

              <CardActions>
                <Link to={`/product/${item._id}`}>
                  <button style={{ fontSize: "20px" }}>Buy Now</button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Shop;
