import './ProductDetail.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { UserContext } from '../../App';
import {  Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';


const ProductDetail = () => {
 
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {productKey} = useParams();
    const [product,setProduct] = useState({});
    const [selectedDate, setSelectedDate] = useState({
        today:new Date(),  
    });
    const handleCurrentDate = (date) => {
        const newDates = {...selectedDate};
        newDates.today = date;
        setSelectedDate(newDates);
    };

    useEffect(() => {
        fetch(`http://localhost:4000/product/${productKey}`)
        .then((response) =>response.json())
        .then((data) =>setProduct(data))
    },[productKey])
    console.log("pd details= ",product,productKey);



const handlePlaceOrder = () =>{
    //   alert('Are you ready to Booking');
    const newBookings = {...loggedInUser,...selectedDate,...product};
    fetch('http://localhost:4000/placeOrder',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBookings)
    })
    .then(res => res.json())
    .then(data =>{
        // console.log(data)
        data &&
        alert('Your order placed successfully.Thank you.');
    })
  }

    return (
        <div className="product-details">
            <h1>Your Product Details.</h1>
            <div>

             <h3>{product.name}</h3> 
             <img src={product.imageURL} alt=""/> 
      
            </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In Date "
            value={selectedDate.today}
            onChange={handleCurrentDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          
        </Grid>
        <Button onClick={handlePlaceOrder} variant="contained" color="primary">
        Place Order
        </Button>
      
      </MuiPickersUtilsProvider>
           
            
        </div>
    );
};

export default ProductDetail;