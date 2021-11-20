import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import StarRating from '../review/StarRating';
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import './reviewModal.css'

const axios = require('axios');


//https://www.youtube.com/watch?v=eDw46GYAIDQ&ab_channel=EricMurphy

function ReviewModal(props) {

    const [headline, setHeadline] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(null);
    const [recommend, setRecommend] = useState('');

    let history = useHistory();

    // console.log(props.data, "this is the data")

    //NEW-Validate
    const [touched, setTouched] = useState({
        headline: false,
        comment: false,
    })

    const validate = (headline, comment) => {

        const errors = {
            headline: "",
            comment: "",
        }

        if (touched.headline) {
            if (headline.length < 3) {
                console.log("SOMETHING WAS LESS THAN 3!")
                console.log(touched, "this is the touched state!")
                errors.headline = "Title must be at least 3 characters"
            } else if (headline.length > 30) {
                errors.headline = "Title must be 30 characters or less"
            }
        }

        if (touched.comment) {
            if (comment.length < 20) {
                console.log("THE COMMENT WAS TOUCHED!")
                errors.comment = "Review must be at least 20 characters"
            } else if (comment.length > 600) {
                errors.comment = "Review must be 600 characters or less"
            }
        }

        // if(touched.text) {
        //     if(enterText.length < 15) {
        //         errors.text = "Text must be at least 15 characters"
        //     } else if (enterText.length > 500) {
        //         errors.text = "Text must be 500 characters or less"
        //     }
        // }

        // if(touched.rating) {
        //     if(rating.length === null) {
        //         errors.rating = "Please choose a rating"
        //         console.log("something is touched here!")
        //     } else {
        //         console.log("the else is happening in STAR!!!")
        //     }
        // }

        return errors;
    }

    let formIsValid = false;

    if (headline.length > 3 && headline.length < 30 && comment.length > 20 && comment.length < 600 && rating !== null && recommend !== "") {
        formIsValid = true;
    }

    const handleBlur = (field) => () => {
        setTouched({ [field]: "true" })
        console.log("I turn something true!!")
        console.log(touched, "something is now true!");
    }

    //deleted the last two to test
    const errors = validate(headline, comment)

    //End Of Validate

    const reviewHandler = () => {

        let data = {
            rating: rating,
            headline: headline,
            comment: comment,
            productId: props.data._id,
            recommend: recommend
        }

        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        axios.put('/api/v1/review', data, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        props.onHide();
        history.go(0)

    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{ border: "1px solid #fff" }} />
            <Modal.Title id="contained-modal-title-vcenter" className="reviewModelMarginLeft">
                <Container>
                    <Row>
                        <Col>Write a Review</Col>
                        <span className="textFontReviewModal mt-3">{props.data.name}</span>
                        <hr className="writeReviewHR"></hr>
                    </Row>
                </Container>
            </Modal.Title>
            <Modal.Body className="reviewModelMarginLeft">
                <Form>
                    <Row>
                        <Col>
                            <p className="requireTextReview">Required*</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <img className="reviewPictureHeight" src={props.data.images[0].url}></img>
                        </Col>
                        <Col xs={8} className="textCenter mt-2">
                            <p className="textFontReviewModal">Overall Rating*</p>
                            <StarRating
                                rating={rating}
                                setRating={setRating}
                            />
                            <p className="textFontReviewModal mt-4">Would you recommend this product to a friend?*</p>
                            <Button className={recommend === 1 ? "reviewModalButton activeButton3" : "reviewModalButton"} onClick={() => setRecommend(1)}>Yes</Button>
                            <Button className={recommend === 0 ? "reviewModalButton activeButton3" : "reviewModalButton"} onClick={() => setRecommend(0)}>No</Button>
                        </Col>
                    </Row>



                    <Form.Group className="mb-2 mt-4" controlId="exampleForm.ControlInput1">
                        <Form.Label className="textFontReviewModal">Review Title*</Form.Label>
                        <Form.Control
                            className="smaller-InputForm"
                            as="textarea"
                            name="headline"
                            rows={2}
                            placeholder="What's most important to know?"
                            value={headline}
                            // onFocus={handleBlur("headline")}
                            onBlur={handleBlur("headline")}
                            isInvalid={errors.headline}
                            onChange={(e) => setHeadline(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">{errors.headline}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="textFontReviewModal">Your Review*</Form.Label>
                        <Form.Control
                            className="smaller-InputForm"
                            as="textarea"
                            name="comment"
                            placeholder="What did you like or dislike about the product?"
                            rows={4}
                            value={comment}

                            // onFocus={handleBlur("comment")}
                            onBlur={handleBlur("comment")}

                            isInvalid={errors.comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">{errors.comment}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
            <Container className="mb-4 reviewModelMarginLeft">
                <Row>
                    <Col>
                        <Button type="submit" className="submitButtonReviewSize" disabled={!formIsValid} onClick={reviewHandler}>Submit</Button>
                    </Col>
                    <Col>
                        <p className="cancelReviewModal" onClick={props.onHide}>Cancel</p>
                    </Col>
                    {/* <Col>
                        <Button type="submit" onClick={reviewHandler}>Submit Review</Button>
                    </Col> */}
                </Row>
            </Container>

            {/* <Button
                type="submit"
                onClick={reviewHandler}
            >Submit Review</Button> */}
        </Modal>
    );
}

export default ReviewModal;