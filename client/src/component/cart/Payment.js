import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Paypal from "../checkout/Paypal";
import { useHistory } from "react-router-dom";



const axios = require('axios');

const Payment = (props) => {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    let history = useHistory();

    const cartItems = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth)


    const options = {
        style: {
            base: {
                fontSize: "16px"
            },
            invalid: {
                color: '#9e2146'
            }
        }
    }

    

    const [cartOrder, setCartOrder] = useState('');

    const getCartOrder = () => {
        axios.get('/api/v1/getcart')
        .then(function(response){
            const cartOrder = response.data.cart;
            setCartOrder(cartOrder)
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() => {
        getCartOrder();
    },[])

    

    let order = {
        orderItems: []
    }

    if(cartOrder)
        order = {
        // orderItems: cartItems.items
        orderItems:cartOrder.cartItems
    }

    if(cartOrder) {
        console.log(cartOrder.cartItems, "THIS IS THE CARTORDER.cartItems FROM PAYMENTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log(order, "THIS IS THE ORDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        if(cartOrder.cartItems.length > 0) {
            for (let i = 0; i < cartOrder.cartItems.length; i++) {
                cartOrder.cartItems[i]["id"] = cartOrder.cartItems[i].product;
            }
            console.log("THE LENGTH IS GREATER THAN 0~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            console.log(cartOrder);
        }
    }

    // if(cartOrder.cartItems.length > 0) {
    //     for (let i = 0; i < cartOrder.cartItems.length; i++) {
    //         console.log(cartOrder.cartItems[i].product, "this is the product ID")
    //         // cartOrder.cartItems[i].id = cartOrder.cartItems[i].product
    //         cartOrder.cartItems[i]["id"] = cartOrder.cartItems[i].product
    //         setCartOrder(cartOrder.cartItems[i].id)
    //     }
    // }

    const orderInfo = JSON.parse(localStorage.getItem('cartItems'));


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

    const [totalPrice, setTotalPrice] = useState((Number((addTotalPrice(orderInfo) * .1)) + Number((addTotalPrice(orderInfo)))).toFixed(2))

    console.log(orderInfo)

    //order.itemsPrice = addTotalPrice(orderInfo)
    // order.shippingPrice = (order.itemsPrice > 50 ? 0 : 10)
    // order.taxPrice = (addTotalPrice(orderInfo) * .10)
    // order.totalPrice = order.itemsPrice + order.shippingPrice + order.taxPrice

    if (orderInfo) {
        order.itemsPrice = props.orderCartSum
        order.shippingPrice = props.shippingPrice
        order.taxPrice = props.orderTaxPrice
        order.totalPrice = props.totalPrice
        order.shippingInfo = {
            "address": JSON.parse(localStorage.getItem('shippingInfo')).address,
            "city": JSON.parse(localStorage.getItem('shippingInfo')).city,
            "phoneNum": JSON.parse(localStorage.getItem('shippingInfo')).phoneNum,
            "postalCode": JSON.parse(localStorage.getItem('shippingInfo')).postalCode,
            "country": JSON.parse(localStorage.getItem('shippingInfo')).country
        }
    }

    const paymentData = {
        // amount: Math.round(addTotalPrice(orderInfo) * 100)
        amount: Math.round((Number(props.totalPrice) * 100).toFixed(2))
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement)
                }
            });

            if (result.error) {
                console.log(result.error.message)
                document.querySelector('#pay_btn').disabled = false;
            } else {
                //The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    //Post order
                    axios.post('/api/v1/order/new', order)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    axios.post('/api/v1/emptyCart')
                        .then(function(response){
                            console.log(response);
                        })
                        .catch(function(error){
                            console.log(error)
                        });

                    history.push('/success')
                    console.log(order)

                    localStorage.setItem('cartItems',JSON.stringify([]))
                    localStorage.setItem('totalQuanity', JSON.stringify(0))
                    // props.closeModal()
                    history.go(0)
                } else {
                    console.log("There is an issue with payment processing")
                }
            }

        } catch (error) {
            // document.querySelector('#pay_btn').disabled = false;
            console.log(error)
        }
    }


    return (
        <React.Fragment>
            {props.useStripe && cartOrder && <Form onSubmit={submitHandler}>
                {/* Card Number */}

                <Form.Group className="mb-3">
                    <Form.Label className="loginText">Card Number*</Form.Label>
                    <CardNumberElement
                        className="form-control"
                        options={options}
                    />
                </Form.Group>
                {/* CardExpiryElement*/}
                <Form.Group className="mb-3">
                    <Form.Label className="loginText">Card Number*</Form.Label>
                    <CardExpiryElement
                        className="form-control"
                        options={options}
                    />
                </Form.Group>
                {/* CardCvcElement */}
                <Form.Group className="mb-3">
                    <Form.Label className="loginText">Card Number*</Form.Label>
                    <CardCvcElement
                        className="form-control"
                        options={options}
                    />
                </Form.Group>
                
                {auth.users && <button id="pay_btn" type="submit" className="addButton btnWide" disabled={!stripe}>
                    {/* Pay {(Number((addTotalPrice(orderInfo) * .1)) + Number((addTotalPrice(orderInfo)))).toFixed(2)} */}
                    Pay {props.totalPrice.toFixed(2)}
                </button>}
                {!auth.users && <a href="/auth/google">Login with Google to Checkout</a>}
            </Form>}
            {props.useStripe === false && 
            <Paypal 
                totalPrice={props.totalPrice.toFixed(2)}
                orderCartSum={props.orderCartSum}
                shippingPrice={props.shippingPrice}
                orderTaxPrice={props.orderTaxPrice}
                cartOrder = {cartOrder}
            ></Paypal>}


        </React.Fragment>
    )

}
export default Payment;