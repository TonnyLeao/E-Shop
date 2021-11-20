import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Rating from 'react-rating';
import { FaStar } from "react-icons/fa";
import {FaRegStar} from "react-icons/fa"

import './ReviewProduct.css'

const ReviewProduct = (props) => {

    // console.log(props.data.ratings)
    // console.log(props.data.numOfReviews)
    // console.log(props.data)
    return(
       
        <React.Fragment>
            <Row className="rowFix">
            <Col className="reviewBackgroundColor alignCenter m-1">
                <span>{props.data.ratings.toFixed(1)} stars</span>
                <span>  |  </span>
                <span>{props.data.numOfReviews} Reviews</span>
                <div>
                    <Rating 
                        className="starSize"
                        initialRating={props.data.ratings.toFixed(1)}
                        emptySymbol={<FaRegStar></FaRegStar>}
                        fullSymbol={<FaStar></FaStar>}
                        readonly
                    />
                </div>
            </Col>
            <Col className="reviewBackgroundColor alignCenter m-1">
                <span>{(props.data.recommended * 100).toFixed(0)}% Recommended</span>
                <div>
                    <IoCheckmarkCircleOutline className="mt-1" size={30} />
                </div>
            </Col>
            </Row>
            
            
            {props.data && props.data.reviews.map(review => {
                return(
                <React.Fragment key={review._id}>
                    <Rating 
                        className="starSize"
                        initialRating={review.rating}
                        emptySymbol={<FaRegStar></FaRegStar>}
                        fullSymbol={<FaStar></FaStar>}
                        readonly
                    />
                    <h5 className="mt-2">{review.headline}</h5>
                    <p className="reviewTextComment">{review.comment}</p>
                    <Col>
                    <span className="reviewTextBold">{review.recommend > 0 ? "Yes" : "No"}</span>
                    <span>, I {review.recommend > 0 ? "" : "do not"} recommend this product</span>
                    </Col>
                    <p> - {review.name}</p>
                    
                    
                    <hr className="new1"></hr>
                </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}

export default ReviewProduct;