import React from "react";
import storeImg from "../../shared/storeImg";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DisplayHomeImg.css';

const DisplayHomeImg = () => {

    const cardData = storeImg.map((cardData, index) => {
        return (
            <Col key={index} lg={4} md={3} sm={8} className="my-3">
                <img className="imgSize" src={cardData.imgSrc}></img>
                <div className="text-center my-3">
                    <h4>{cardData.bottomText}</h4>   
                    <h5>Shop Now</h5>
                </div>
                
            </Col>
        )
    })

    return(
        <React.Fragment>
            <Container>
                <Row>
                    {cardData}
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default DisplayHomeImg;