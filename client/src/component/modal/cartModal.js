import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Modal';
import Cart from '../cart/Cart';
import Payment from '../cart/Payment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CartModal(props) {

  console.log(props.auth.users, "this is the user!")

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Shopping Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col>
            <Cart auth={props.auth} showLogin={props.showLogin} onHide={props.onHide}></Cart>
          </Col>
          {/* <Col sm={4}>
            <Payment closeModal={props.onHide}></Payment>
          </Col> */}

        </Row>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

export default CartModal; 