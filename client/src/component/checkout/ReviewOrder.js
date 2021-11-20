import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar'
import CartItems from "../cart/CartItems"
import LoginModal from "../modal/LoginModal";
import { useSelector } from 'react-redux';
import './ReviewOrder.css'

const axios = require('axios');

const ReviewOrder = (props) => {

    const [cartBackend, setCartBackend] = useState();
    const cartItems = useSelector(state => state.cart.items);
    const auth = useSelector(state => state.auth)

    const [modalLogin, setLoginModal] = useState(false);

    const getCartOrder = async() => {
        
        await axios.get('/api/v1/getcart')
            .then(function(response){
                const cartOrder = response.data.cart;
                setCartBackend(cartOrder)
            }).catch(function(error){
                console.log(error)
            })
            
    }

    useEffect(() => {
        
        getCartOrder()
        }, [])

    if(cartBackend){
        console.log(cartBackend.cartItems, "this is the backend cart@@@@@@")
    }

    const addTotalPrice = (arr) => {
        const totalArr = [];
        for (let i = 0; i < arr.length; i++) {
            totalArr.push(arr[i].totalPrice)
        }
        if (arr.length == 0) {
            return 0
        } else {
            const total = totalArr.reduce((acc, cur) => acc + cur)
            return total
        }

    }

    return (
        <Container>
        {auth.status !== "success" && 
            <Row className="mb-4 checkoutRow">
            <Col xs={2}></Col>
            <Col className="checkoutProgressDone"><p>Login</p></Col>
            <Col xs={1}><ProgressBar animated striped variant="secondary" now={100} className="checkoutProgressBar"/></Col>
            <Col className="checkoutProgressLeft"><p>Review</p></Col>
            <Col xs={1}><ProgressBar animated striped variant="secondary" now={100} className="checkoutProgressBar"/></Col>
            <Col className="checkoutProgressLeft"><p>Shipping</p></Col>
            <Col xs={1}><ProgressBar animated striped variant="secondary" now={100} className="checkoutProgressBar"/></Col>
            <Col className="checkoutProgressLeft"><p>Payment</p></Col>
            <Col xs={2}></Col>
        </Row>}

        {auth.status === "success" &&
            <Row className="mb-4 checkoutRow">
                <Col xs={2}></Col>
                <Col className="checkoutProgressDone"><p>Login</p></Col>
                <Col xs={1}><ProgressBar animated striped variant="dark" now={100} className="checkoutProgressBar"/></Col>
                <Col className="checkoutProgressDone"><p>Review</p></Col>
                <Col xs={1}><ProgressBar animated striped variant="secondary" now={100} className="checkoutProgressBar"/></Col>
                <Col className="checkoutProgressLeft"><p>Shipping</p></Col>
                <Col xs={1}><ProgressBar animated striped variant="secondary" now={100} className="checkoutProgressBar"/></Col>
                <Col className="checkoutProgressLeft"><p>Payment</p></Col>
                <Col xs={2}></Col>
            </Row>
        }
        
        <React.Fragment>
            <Row>
                <hr></hr>
                <Col xs={7}>
                    <p className="reviewCartTextTitle">Item</p>
                </Col>
                <Col>
                    <p className="reviewCartTextTitle">Quantity</p>
                </Col>
                <Col>
                    <p className="reviewCartTextTitle">Price</p>
                </Col>
                <hr></hr>
            </Row>
            {cartBackend && cartBackend.cartItems.map((item, index) =>
            (<React.Fragment>
                <CartItems
                    key={index}
                    id={item.product}
                    name={item.name}
                    product={item.product}
                    price={item.price}
                    quantity={item.quantity}
                    totalPrice={Number(item.price) * Number(item.quantity)}
                    image={item.image}
                    waistSize={item.waistSize}
                    lengthSize={item.lengthSize}
                    gender={item.gender}
                    category={item.category}
                />
            </React.Fragment>)
            )}

            {cartItems.map((item, index) => (
                <React.Fragment>
            {auth.users == false && <CartItems
                    key={index}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    totalPrice={item.totalPrice}
                    image={item.image}
                    waistSize={item.waistSize}
                    lengthSize={item.lengthSize}
                    gender={item.gender}
                    category={item.category}
                />}
                </React.Fragment>

            ))}

            <Row>
                {auth.users == false && <Col className="floatRight">
                    {cartItems.length == 0 && <p className="centerCartText">The Cart is Empty</p>}
                    {cartItems.length > 0 &&
                        <Col>
                            <p className="boldText">Subtotal : {(addTotalPrice(cartItems).toFixed(2))}</p>
                            {auth.status == "success"? 
                                <a href="/revieworder">
                                    <button className="addButton">Proceed to Shipping</button>
                                </a> 
                                : <button className="addButton" onClick={()=>setLoginModal(true)}>Log in to checkout</button>}

                        </Col>}
                </Col>}
                {auth.status == "success" && <Col className="floatRight">
                    {cartBackend && cartBackend.cartItems.length == 0 && <p className="centerCartText">The Cart is Empty</p>}
                    {cartBackend && cartBackend.cartItems.length  > 0 &&
                        <Col>
                            <p className="boldText">Subtotal : {(addTotalPrice(cartBackend.cartItems).toFixed(2))}</p>
                            {auth.status == "success"? 
                                <a href="/checkout">
                                    <button className="addButton">Proceed to Shipping</button>
                                </a> 
                                : <button className="addButton" onClick={()=>setLoginModal(true)}>Log in to checkout</button>}

                        </Col>}
                </Col>}
            </Row>
            <LoginModal
                show={modalLogin}
                onHide={() => setLoginModal(false)}
            ></LoginModal>

            
        </React.Fragment>

        </Container>
    )
}

export default ReviewOrder