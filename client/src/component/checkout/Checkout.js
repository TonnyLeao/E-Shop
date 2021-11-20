import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import { countries } from 'countries-list';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar'
import './Checkout.css'

const CheckOut = () => {

    const countriesList = Object.values(countries);

    const [address, setAddress] = useState(localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')).address : "");
    const [city, setCity] = useState(localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')).city : "");
    const [postalCode, setPostalCode] = useState(localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')).postalCode : "");
    const [phoneNum, setPhoneNum] = useState(localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')).phoneNum : "");
    const [country, setCountry] = useState(localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')).country : "");

    let history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(address, city, postalCode, phoneNum, country, "this is the shipping info!")
        history.push('/payout')

        localStorage.setItem('shippingInfo', JSON.stringify({address, city, postalCode, phoneNum, country}))

    }

    return (
        <Container>
        <Row className="mb-4 checkoutRow">
            <Col xs={2}></Col>
            <Col className="checkoutProgressDone"><p>Login</p></Col>
            <Col xs={1}><ProgressBar animated striped variant="dark" now={100} className="checkoutProgressBar"/></Col>
            <Col className="checkoutProgressDone"><p>Review</p></Col>
            <Col xs={1}><ProgressBar animated striped variant="dark" now={100} className="checkoutProgressBar"/></Col>
            <Col className="checkoutProgressDone"><p>Shipping</p></Col>
            <Col xs={1}><ProgressBar animated striped variant="secondary" now={100} className="checkoutProgressBar"/></Col>
            <Col className="checkoutProgressLeft"><p>Payment</p></Col>
            <Col xs={2}></Col>
        </Row>
            <Row>
                <Col  className="mx-auto payoutBorder p-3" md={4} sm={5} xs={6}>
                    <h2>Shipping Info<Link to="/revieworder" className="payoutChangeText">Review Order</Link></h2>
                    <hr className="payoutHr"></hr>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label className="loginText">Address*</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label className="loginText">City*</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label className="loginText">Phone Number*</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={phoneNum}
                                onChange={(e) => setPhoneNum(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label className="loginText">Postal Code*</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label className="loginText">Country*</Form.Label>
                            <Form.Select 
                                aria-label="Default select example"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                            {countriesList.map(country => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </Form.Select>
                        </Form.Group>

                        <button onClick={submitHandler} className="addButton btnWide mb-2">
                            Submit
                        </button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CheckOut