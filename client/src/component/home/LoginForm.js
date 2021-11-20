import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './LoginForm.css'

const axios = require('axios');

const LoginForm = () => {

    const orderInfo = JSON.parse(localStorage.getItem('cartItems'));

    const newOrderInfo = {
        cartItems:[...orderInfo]
    }

    let history = useHistory();

    const [values, setValues] = useState({
        username: '',
        password: '',
        error: null,
        loading: false,
        redirectToReferrer: false
    })

    const { username, password, error, loading, redirectToReferrer } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const login = (username, password) => {
        console.log(username, password)

       return axios.post('/api/users/login', {
            username: username,
            password: password
        }).then((response) => {
            console.log(response);
            setValues({
                ...values,
                username: '',
                password: '',
                error: '',
                loading: true,
                redirectToReferrer: true
            })
            
        },(error) => {
            
            setValues({...values, error: "error", loading: false, password:''})
            console.log(values, "this is the new value")
            console.log(error);
        });
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        login(username, password)
        .then(data => {
            console.log(data, "this is the data!")
        })
        // .then(data => {
        //     console.log(data.error, "hello this is the error!")
        //     if(data.error) {
        //         console.log(data.error, "hello this is the error!")
        //         setValues({...values, error: data.error, success:false})
        //     } else {
        //         setValues({
        //             ...values,
        //             username: '',
        //             password: '',
        //             error: '',
        //             success: true
        //         })
        //     }
        // })

        
    }

    const redirectUser = () => {
        if(redirectToReferrer) {
            // changeStuff();
            history.go(0)
        }
    }

    const changeStuff = async() => {
        // const post = await axios.post('/api/v1/addguestcart', newOrderInfo)
        // .then(function(response){
        //     console.log(response)
        // }).catch(function(error){
        //     console.log(error)
        // })
        

            const response = await fetch('/api/v1/addguestcart', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrderInfo),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });

            return response;
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12}>
                        {redirectUser()}
                        {/* {values.loading == true && <p></p>}
                        {values.error == null &&  <p></p>} */}
                        {values.error == "error" && <p className="loginErrorText">Invalid username or password doesn't match</p>}
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="loginText">Username*</Form.Label>
                                <Form.Control onChange={handleChange('username')} value={username} type="text"/>
                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="loginText">Password*</Form.Label>
                                <Form.Control onChange={handleChange('password')} value={password} type="password" />
                            </Form.Group>
                            <button onClick={clickSubmit} className="addButton loginButton" type="submit">
                                Sign In
                            </button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>)
}

export default LoginForm;