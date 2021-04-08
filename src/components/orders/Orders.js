
import { UserContext } from '../../App';
import React, { useContext, useEffect, useState } from 'react';

const Orders = () => {

    const [orders,setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    

    useEffect(() =>{

        fetch('https://nameless-plateau-15904.herokuapp.com/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
            
        })
        .then(res => res.json())
        .then(data => setOrders(data))
    },[])

    return (
        <div style={{padding:30,backgroundColor:'lightgrey'}}>
            <h1>Your all orders yet now..!!</h1>

            <div>
            <h3>You have : {orders.length} orders and these are:</h3>
            {
                orders.map(book =><li key={book._id}>
  
                    <h4>product Name: {book.name}
                      ----price: {book.price}
                     ----Date: {(new Date(book.today)).toDateString('dd/mm/yyyy')} 
                     </h4></li>)
            }
        </div>
        </div>
    );
};

export default Orders;