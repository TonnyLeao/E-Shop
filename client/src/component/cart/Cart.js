import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import CartItems from "./CartItems"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cart.css';

const axios = require('axios');

const Cart = (props) => {

    const cartItems = useSelector(state => state.cart.items);
    const auth = useSelector(state => state.auth)

    const [cartBackend, setCartBackend] = useState();

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

    const sumbitButtonHandler = () => {
        props.onHide();
        props.showLogin();
    }

    if(cartBackend){
        console.log(cartBackend.cartItems, "this is the cart backend!")
    }
    

    return (
        <React.Fragment>
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
                {/* {auth.status == "success" && <CartItems
                    key={index}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    totalPrice={item.totalPrice}
                    image={item.image}
                    waistSize={item.waistSize}
                    lengthSize={item.lengthSize}
                />} */}
                </React.Fragment>

            ))}
            {cartBackend && cartBackend.cartItems.map((item, index) => (
                <React.Fragment>
                {auth.status == "success" && <CartItems
                    key={index}
                    id={item.id}
                    product={item.product}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    totalPrice={Number(item.price) * Number(item.quantity)}
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
                            {props.auth.users ? 
                                <a href="/revieworder">
                                    <button className="addButton">Proceed to Checkout</button>
                                </a> 
                                : <button className="addButton" onClick={sumbitButtonHandler}>Log in to checkout</button>}

                        </Col>}
                </Col>}
                {auth.status == "success" && <Col className="floatRight">
                    {cartBackend && cartBackend.cartItems.length == 0 && <p className="centerCartText">The Cart is Empty</p>}
                    {cartBackend && cartBackend.cartItems.length  > 0 &&
                        <Col>
                            <p className="boldText">Subtotal : {(addTotalPrice(cartBackend.cartItems).toFixed(2))}</p>
                            {props.auth.users ? 
                                <a href="/revieworder">
                                    <button className="addButton">Proceed to Checkout</button>
                                </a> 
                                : <button className="addButton" onClick={sumbitButtonHandler}>Log in to checkout</button>}

                        </Col>}
                </Col>}
            </Row>


        </React.Fragment>
    )
}

export default Cart