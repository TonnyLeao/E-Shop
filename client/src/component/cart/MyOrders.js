import React from 'react';
import { useSelector } from "react-redux"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import './MyOrders.css'

const MyOrders = () => {

    const orderItems = useSelector(state => state.order.users.orders)

    const reverseArray = (arr) => arr.map((_, idx, arr) => arr[arr.length - 1 - idx ]);
    
    return (
        <React.Fragment>
            {reverseArray(orderItems).map((order, index) => (
                <React.Fragment key={index}>
                    <Container className="containerOutline">
                        <Row className="mt-3 topBackgroundColor mb-3">
                            <Col sm={3}>
                                <span>ORDER PLACED</span>
                                <p>{order.createdAt.slice(0, 10)}</p>
                            </Col>
                            <Col sm={2}>
                                <span>TOTAL</span>
                                <p>${order.totalPrice.toFixed(2)}</p>
                            </Col>
                            <Col sm={2}>
                                <span>SHIP TO</span>
                                <p>{order.shippingInfo.address}</p>
                            </Col>
                            <Col className="alignRight">
                                <span>ORDER# {order._id}</span>
                                <p>View Order</p>
                            </Col>
                        </Row>
                        <Row>
                        <Col sm={10}>
                        {/* Display images and info*/}
                        {order.orderItems.map((data, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col sm={3} className="mb-3" key={index}>
                                        <img className="imageSize" src={data.image}></img>
                                    </Col>
                                    <Col sm={3} className="px-4 mt-5">
                                        <span>{data.name}</span>
                                        <p>Size: {' '}
                                            {!isNaN(data.lengthSize) && data.gender !== "Female" && ("W" + data.lengthSize)} 
                                            {!isNaN(data.lengthSize) && data.gender === "Female" && data.category === "Jeans" && (data.lengthSize)} 
                                            {isNaN(data.lengthSize) && data.lengthSize} {' '}
                                            {!isNaN(data.waistSize) && data.waistSize.length > 0 && ("L" + data.waistSize)} 
                                            <span>{isNaN(data.waistSize) && data.category === "Jeans" && data.waistSize}</span>
                                            <span>{isNaN(data.waistSize) && data.gender === "Male" && data.waistSize}</span>
                                        </p>
                                    </Col>
                                    <Col sm={3} className="mt-5">
                                        <span>Qty: {data.quantity}</span>
                                        <p>Price: ${data.price}</p>
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))}
                        </Col>
                        <Col>
                            <Button className="mt-3"  variant="light">Track package</Button>
                            <Button className="mt-3"  variant="warning">Get product support</Button>
                            <Button className="mt-3"  variant="light">Return or replace items </Button>
                            <Button className="mt-3 mb-3"  variant="light">Write a product review</Button>
                        </Col>
                        </Row>

                    </Container>
                </React.Fragment>
            ))}
        </React.Fragment>
       
    )
}

export default MyOrders;