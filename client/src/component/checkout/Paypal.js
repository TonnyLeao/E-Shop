import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const axios = require('axios');

const Paypal = (props) => {

    const paypal = useRef();
    let history = useHistory();

    const number = Number(props.totalPrice)
    const cartItems = useSelector(state => state.cart);

    // console.log(cartItems, "this is the cart items!")
    console.log(props.cartOrder, "this is the props.cartOrder!!!!!!!!!!!!!!!!!! FROM PAYPAL")

    const orderPay = {
        orderItems: props.cartOrder.cartItems
    }

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

        // orderPay.itemsPrice = addTotalPrice(orderInfo)
        // orderPay.shippingPrice = (orderPay.itemsPrice > 50 ? 0 : 10)
        // orderPay.taxPrice = (addTotalPrice(orderInfo) * .10)
        // orderPay.totalPrice = orderPay.itemsPrice + orderPay.shippingPrice + orderPay.taxPrice

    if (orderInfo) {
        orderPay.itemsPrice = props.orderCartSum
        orderPay.shippingPrice = props.shippingPrice
        orderPay.taxPrice = props.orderTaxPrice
        orderPay.totalPrice = props.totalPrice
        orderPay.shippingInfo = {
            "address": JSON.parse(localStorage.getItem('shippingInfo')).address,
            "city": JSON.parse(localStorage.getItem('shippingInfo')).city,
            "phoneNum": JSON.parse(localStorage.getItem('shippingInfo')).phoneNum,
            "postalCode": JSON.parse(localStorage.getItem('shippingInfo')).postalCode,
            "country": JSON.parse(localStorage.getItem('shippingInfo')).country
        }
    }


    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: "USD",
                                value: number
                            }
                        }
                    ],
                    application_context: {
                        shipping_preference: 'NO_SHIPPING'
                    }
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);

                orderPay.paymentInfo = {
                    id: order.id,
                    status: "succeeded"
                }

                //Post order
                axios.post('/api/v1/order/new', orderPay
                )
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
                console.log(orderPay)

                localStorage.setItem('cartItems',JSON.stringify([]))
                localStorage.setItem('totalQuanity', JSON.stringify(0))

                history.go(0)
            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])


    return (
    <div>
        <div ref={paypal}></div>
    </div>)
}

export default Paypal;