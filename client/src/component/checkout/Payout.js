import React, { useState, useEffect } from "react";
import Payment from "../cart/Payment";
import { useSelector } from "react-redux"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link } from 'react-router-dom';
import LockedNavBar from './LockedNavbar';
import { FaCcStripe } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import './Payout.css'


const axios = require('axios');

//https://www.youtube.com/watch?v=IXxEdhA7fig&ab_channel=PedroTech

const Payout = (props) => {

    const cartItems = useSelector(state => state.cart.items);
    const cartTotalQty = useSelector(state => state.cart.totalQuanity);

    const cartPrices = [];
    const orderCartPrices = [];


    cartItems.map(cart => cartPrices.push(Number(cart.price * cart.quantity)))
    

    const [useStripe, setUseStripe] = useState(true);

    const [cartOrder, setCartOrder] = useState('');

    useEffect(() => {
        getCartOrder();
    },[])

    const getCartOrder = () => {
        axios.get('/api/v1/getcart')
        .then(function(response){
            const cartOrder = response.data.cart;
            setCartOrder(cartOrder)
            console.log(response.data.cart , "this is the cart@@@")
        }).catch(function(error){
            console.log(error)
        })
    }

    let arrayQtyBackEnd = [];
    let totalQtyBackEnd;

    if(cartOrder) {
        for (let i = 0; i < cartOrder.cartItems.length; i++) {
            arrayQtyBackEnd.push(cartOrder.cartItems[i].quantity)
            
        }
        console.log(arrayQtyBackEnd, "this is the array of qty backend!")
         totalQtyBackEnd = arrayQtyBackEnd.reduce(function(acc, cur) {
            return acc + cur
        })

        console.log(totalQtyBackEnd, "$$$$$$$$$$$$$$$$$$$$TOTAL#@#@#@#@#@#@#@#@#")
    }

    const useStripeHandler = () => {
        setUseStripe(true);
    }

    const usePaypalHandler = () => {
        setUseStripe(false);
    }

    if(cartOrder) {
        cartOrder.cartItems.map(cart => orderCartPrices.push(cart.totalPrice));
    }
    
    let cartSum = 0

    if(cartPrices.length > 0) {
        cartSum = cartPrices.reduce(function (acc, cur) {
            return acc + cur
        })
    }
     

    let orderCartSum = 0;
    let orderShippingPrice = 0
    let orderTotalBefore = 0
    let orderTaxPrice = 0
    let orderTotalPrice = 0

    if(cartOrder) {
        orderCartSum = orderCartPrices.reduce(function(acc, cur) {
            return acc + cur
        })
    }

    if(cartOrder) {
        orderShippingPrice = (orderCartSum > 50 ? 0 : 10)
        orderTotalBefore = (orderCartSum + orderShippingPrice).toFixed(2)
        orderTaxPrice = (Number(orderTotalBefore) * .1).toFixed(2);
        orderTotalPrice = (Number(orderTotalBefore) + Number(orderTaxPrice));
    }
    
    

    const shippingPrice = (cartSum > 50 ? 0 : 10)
    const totalBefore = (cartSum + shippingPrice).toFixed(2)
    const taxPrice = (Number(totalBefore) * .1).toFixed(2);
    const totalPrice = (Number(totalBefore) + Number(taxPrice));

    console.log(cartPrices, "cart items")
    console.log(cartSum, "this is the cart sum!")
    console.log(shippingPrice, "this is the shipping price")
    console.log(totalBefore, "total before Sum")
    console.log(taxPrice, "tax price")
    console.log(totalPrice, "totalPrice")

    return (
        <React.Fragment>
           {cartOrder && <LockedNavBar totalQtyBackEnd={totalQtyBackEnd}cartTotalQty={cartTotalQty} setOpenModal={props.setOpenModal}></LockedNavBar>}
            <Container>
                <Row className="mb-4 checkoutRow">
                    <Col xs={2}></Col>
                    <Col className="checkoutProgressDone"><p>Login</p></Col>
                    <Col xs={1}><ProgressBar animated striped variant="dark" now={100} className="checkoutProgressBar"/></Col>
                    <Col className="checkoutProgressDone"><p>Review</p></Col>
                    <Col xs={1}><ProgressBar animated striped variant="dark" now={100} className="checkoutProgressBar" /></Col>
                    <Col className="checkoutProgressDone"><p>Shipping</p></Col>
                    <Col xs={1}><ProgressBar animated striped variant="dark" now={100} className="checkoutProgressBar" /></Col>
                    <Col className="checkoutProgressDone"><p>Payment</p></Col>
                    <Col xs={2}></Col>
                </Row>
                <Row className="payoutMarginLeft">
                    <Col lg={6} md={8} sm={12} xs={12} className="payoutBorder p-3">
                        <Col xs={10} className="payoutLeft">
                            <h3>Shipping Info <Link to="/checkout" className="payoutChangeText">Change</Link></h3>
                            <hr className="payoutHr"></hr>
                            <span className="payoutAddressText">{JSON.parse(localStorage.getItem('shippingInfo')).address} {JSON.parse(localStorage.getItem('shippingInfo')).city}, {JSON.parse(localStorage.getItem('shippingInfo')).postalCode} {JSON.parse(localStorage.getItem('shippingInfo')).country}</span>
                            <p className="payoutAddressText">Contact Number: {JSON.parse(localStorage.getItem('shippingInfo')).phoneNum}</p>
                        </Col>
                        <Col sm={9} xs={12} className="pt-3 payoutLeft">
                            <h3>Payment <button className="payputIconButton" onClick={useStripeHandler}><FaCcStripe className="payoutIconSize" color="#5433FF"></FaCcStripe></button>{' '}<button className="payputIconButton" onClick={usePaypalHandler}><FaCcPaypal color="#3b7bbf" className="payoutIconSize"></FaCcPaypal></button></h3>
                            <hr className="payoutHr"></hr>
                            {cartOrder && 
                            <Payment 
                                useStripe={useStripe} 
                                totalPrice={orderTotalPrice}
                                orderCartSum={orderCartSum}
                                shippingPrice={shippingPrice}
                                orderTaxPrice={orderTaxPrice}
                                ></Payment>}
                        </Col>
                    </Col>

                    {/* This code is grabbing from the localStorage */}
                    {/* <Col md={4} sm={12} xs={12}>
                        <Col className="payoutBorder p-2">
                            <h3>Order Summary</h3>
                            <hr className="payoutHr"></hr>
                            <Row>
                                <span className="payoutOrderText">Items:<span className="payoutTextFloatRight"> ${cartSum.toFixed(2)}</span></span>
                            </Row>
                            <p className="payoutOrderText">Shipping and handling:<span className="payoutTextFloatRight"> ${shippingPrice.toFixed(2)}</span></p>
                            <Row>
                                <span className="payoutOrderText">Total before tax:<span className="payoutTextFloatRight"> ${totalBefore}</span></span>
                            </Row>

                            <p className="payoutOrderText">Tax:<span className="payoutTextFloatRight"> ${taxPrice}</span></p>
                            <hr className="payoutHr"></hr>
                            <p className="payoutOrderText payoutTotalBold">Order total:<span className="payoutTextFloatRight"> ${totalPrice.toFixed(2)}</span></p>

                        </Col>
                        <Col className="payoutBorder mt-4 p-2" sm={12} xs={12}>
                            <h3>Review Items</h3>
                            <hr className="payoutHr"></hr>
                            {cartItems.map((item, index) => (
                                <Row className="mb-2" key={index}>
                                    <Col xs={4}>
                                        <img className="payoutImg" src={item.image}></img>
                                    </Col>
                                    <Col >
                                        <p className="payoutOrderText">{item.name}</p>
                                        <p className="payoutOrderText">{item.lengthSize.length > 2 && item.lengthSize} {item.lengthSize.length <= 2 && item.lengthSize + "W"} {item.waistSize}L x {item.quantity}</p>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Col> */}

                    {/* This is the new backend Order Summary and Review Items */}
                    {cartOrder && <Col lg={4} md={4} sm={12} xs={12}>
                        <Col className="payoutBorder p-2">
                            <h3>Order Summary</h3>
                            <hr className="payoutHr"></hr>
                            <Row>
                                <span className="payoutOrderText">Items:<span className="payoutTextFloatRight"> ${orderCartSum.toFixed(2)}</span></span>
                            </Row>
                            <p className="payoutOrderText">Shipping and handling:<span className="payoutTextFloatRight"> ${orderShippingPrice.toFixed(2)}</span></p>
                            <Row>
                                <span className="payoutOrderText">Total before tax:<span className="payoutTextFloatRight"> ${orderTotalBefore}</span></span>
                            </Row>

                            <p className="payoutOrderText">Tax:<span className="payoutTextFloatRight"> ${orderTaxPrice}</span></p>
                            <hr className="payoutHr"></hr>
                            <p className="payoutOrderText payoutTotalBold">Order total:<span className="payoutTextFloatRight"> ${orderTotalPrice.toFixed(2)}</span></p>

                        </Col>
                        <Col className="payoutBorder mt-4 p-2" sm={12} xs={12}>
                            <h3>Review Items</h3>
                            <hr className="payoutHr"></hr>
                            
                            {cartOrder && cartOrder.cartItems.map((item, index) => (
                                <Row className="mb-2" key={index}>
                                    <Col xs={4}>
                                        <img className="payoutImg" src={item.image}></img>
                                    </Col>
                                    <Col >
                                        <p className="payoutOrderText">{item.name}</p>
                                        <p className="payoutOrderText">Quantity: {item.quantity}</p>
                                        <p className="payoutOrderText">Size: {!isNaN(item.lengthSize) && ("W" + item.lengthSize)} {isNaN(item.lengthSize) && item.lengthSize}  {!isNaN(item.waistSize) && item.waistSize.length > 0 && ("L" + item.waistSize)} {isNaN(item.waistSize) && item.waistSize}</p>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Col>}

                </Row>

            </Container>
        </React.Fragment>
    )
}

export default Payout;

