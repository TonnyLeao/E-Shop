import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineCheckCircle } from "react-icons/ai";
import './OrderSuccess.css'

const OrderSuccess = () => {
    return(
        <React.Fragment>
            <Row>
                <Col xs={4}></Col>
                <Col xs={4} className="orderSuccessCenter">
                    <AiOutlineCheckCircle className="orderSuccessLogo" />
                    <h1>Your Order is Confirmed!</h1>
                    <h4>We'll send you a shipping confirmation email as soon as your order ships.</h4>
                    <a href="/orders/me">
                        <button className="mt-4 orderSuccessButton">Go to Orders</button>
                    </a>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default OrderSuccess;