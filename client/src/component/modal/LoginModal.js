import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Modal';
import SignUpForm from "../home/SignUpForm";
import LoginForm from "../home/LoginForm";
import GoogleButton from 'react-google-button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './LoginModal.css'


function LoginModal(props) {

    const [showLogin, setShowLogin] = useState(false);

    

    const googleClickHandler = () => {
        props.setGoogleButton(true);
        props.setBackendCart(true);
    }

    const loginHandler = () => {
        if(showLogin === false) {
            setShowLogin(true);
            console.log(showLogin)
        } else {
            setShowLogin(false);
            console.log(showLogin)
        }
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="reduceHeaderMargin" closeButton>
                <Modal.Title className="centerLoginText" id="contained-modal-title-vcenter">
                        {(showLogin === false) && <p>Sign In</p>}
                        {(showLogin === true) && <p>Create an Account</p>}
                    
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        {(showLogin === false) && <LoginForm></LoginForm>}
                        {(showLogin === true) && <SignUpForm></SignUpForm>}
                    </Col>
                </Row>
                {/* <SignUpForm></SignUpForm> */}

                <Row>
                    <Col>
                        <a className="anchorRemove" href="/auth/google">
                            {(showLogin === false) && <GoogleButton onClick={googleClickHandler} className="mt-3 mb-3 largerButton" />}
                        </a>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col className="centerLoginText mt1 mb-4">
                        <p>{showLogin === false ? "Sign Up":"Already Have an Account?"}</p>
                        <button className="createAccountButton" onClick={() => loginHandler()}>{showLogin === false ? "Create An Account":"Sign In"}</button>
                    </Col>
                </Row>
            </Modal.Body>

            
            {/* <Modal.Footer className="centerLoginText">
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default LoginModal