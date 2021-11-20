import Accordion from 'react-bootstrap/Accordion';
import React from 'react';
import './AccordionShipping.css'

const AccordionShipping = () => {
    return (
        <React.Fragment>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><span className="accordionHeaderText">Shipping and Returns</span></Accordion.Header>
                    <Accordion.Body className="accordionBodyText">
                         We ship anywhere in the U.S. and to over 55 international destinations.
                        <br/>
                        <p></p>
                        Everyday free standard shipping on orders $50+ placed online for U.S. or Canada.
                        <br />
                        <p/>
                        Simple Returns. Up to 60 days. Get the full details on Returns & Exchanges. Excludes Final Sale items ending in .97 and clearance items sold for $5 or $15.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </React.Fragment>
    )
}

export default AccordionShipping;