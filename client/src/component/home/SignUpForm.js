import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'

const axios = require('axios');

const SignUpForm = () => {

    const [values, setValues] = useState({
        username: '',
        password: '',
        error: null,
        success: false
    })

    const { username, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const signup = (username, password) => {
        console.log(username, password)

        return axios.post('/api/users/signup', {
            username: username,
            password: password
        }).then((response) => {
            console.log(response);
            setValues({
                ...values,
                username: '',
                password: '',
                error: '',
                success: true
            })

        }, (error) => {

            setValues({ ...values, error: "error", success: false, password:"" })
            console.log(values, "this is the new value")
            console.log(error);
        });
    }

    
    const clickSubmit = (event) => {
        event.preventDefault()
        signup(username, password)
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


    return (
            <Container>
                <Row>
            <Col>
                {values.success == true && <p>Your account has been created! Please login</p>}
                {values.error == "error" && <p className="loginErrorText">Username is already taken</p>}
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="loginText">Username</Form.Label>
                        <Form.Control onChange={handleChange('username')} value={username} type="text" />
                        {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="loginText">Password</Form.Label>
                        <Form.Control onChange={handleChange('password')} value={password} type="password" />
                    </Form.Group>
                    <button onClick={clickSubmit} className="addButton loginButton"type="submit">
                        Submit
                    </button>
                </Form>
            </Col>
            </Row>
            </Container>)
}

export default SignUpForm;