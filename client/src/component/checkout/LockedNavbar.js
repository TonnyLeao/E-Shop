import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import './LockedNavbar.css'

const LockedNavBar = (props) => {

    let history = useHistory();

    const onClickHander = () => {
        history.push('/revieworder')
        // props.setOpenModal(true);
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
            <NavDropdown className="mx-5 dropDownExpressBar" title="E-Shop" id="basic-nav-dropdown-Men">
                            <Row className="row1">
                                <Col>
                                    <Dropdown.Header className="dropDownLocked">Are you sure you want to return to your Shopping Cart?</Dropdown.Header>
                                </Col>
                                
                                <Col className="column1">
                                    <NavDropdown.Item><button className="lockoutButton">Stay in checkout</button></NavDropdown.Item>
                                </Col>
                                <Col className="column1 categoryPictureAlign">
                                    <NavDropdown.Item><button className="lockoutButton" onClick={onClickHander}>Return to cart</button></NavDropdown.Item>
                                </Col>
                            </Row>
                        </NavDropdown>
                {/* <Navbar.Brand href="/">Express</Navbar.Brand> */}
                {/* <p className="paymentLockFont">Checkout ({props.cartTotalQty > 1 ? <span className="paymentLockItem">{props.cartTotalQty} items</span>: <span className="paymentLockItem">{props.cartTotalQty} item</span>})</p> */}
                <p className="paymentLockFont">Checkout ({props.totalQtyBackEnd > 1 ? <span className="paymentLockItem">{props.totalQtyBackEnd} items</span>: <span className="paymentLockItem">{props.totalQtyBackEnd} item</span>})</p>
                <FaLock className="paymentLockSize"></FaLock>
            </Container>
        </Navbar>
    )
}

export default LockedNavBar;