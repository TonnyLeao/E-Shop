import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return(
        <React.Fragment>
            <h1>Hello this is the order Success Page!</h1>
            <h2>Your order has been placed successfully!</h2>
            <a href="/orders/me">Go to Orders</a>
        </React.Fragment>
    )
}

export default OrderSuccess;