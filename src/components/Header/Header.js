import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    
    return (
        <div className="header">
            <h2>Mr.Grocery Shop and Service</h2>
            <nav>
                <Link to="/shop">Home</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Admin</Link>
                <Link to="/shop">Deals</Link>
                <Link to="/login">Login</Link>
               
            </nav>
        </div>
    );
};

export default Header;