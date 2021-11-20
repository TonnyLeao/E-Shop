import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import ButtonGroupSizeModal from '../modal/ButtonGroupSizeModal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sizeModal.css'
import Container from "react-bootstrap/esm/Container";

function SizeModal(props) {

  console.log(props.gender)

  const sizeArray = ["Tops", "Bottoms", "Measurement Tips"]

  const [label, setLabel] = React.useState("Tops")

  const printButtonLabel2 = (event) => {
    setLabel(event.target.getAttribute('name'));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
      className="modalSize"
    >
      <Modal.Header className="modal-headerNoBorder" closeButton>

      </Modal.Header>
      <Container>
        <Row>
          <Col><p className="sizeModalTopHeaderFont">Express {props.gender == "Female" ? "Women's" : "Men's"} Sizing</p></Col>
        </Row>
      </Container>
      <Row>
        <Col className="sizeModalTextCenter">
          <ButtonGroupSizeModal buttons={sizeArray} afterClick={printButtonLabel2}></ButtonGroupSizeModal>
        </Col>
      </Row>
      <Modal.Body>
        {label == "Tops" && props.gender == "Female" &&
          <React.Fragment>
            <h4>{label}</h4>
            <React.Fragment>
              <Table hover>
                <thead>
                  <tr className="sizeModalBackGround">
                    <th>Size</th>
                    <th>Numerical</th>
                    <th>Bust</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="sizeModalNumberFont">
                    <td>XXS</td>
                    <td className="grayTH">000-00</td>
                    <td>29.5-30.5</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>XS</td>
                    <td>0-2</td>
                    <td>31.5-32.5</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>S</td>
                    <td>4-6</td>
                    <td>33.5-34.5</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>M</td>
                    <td>8-10</td>
                    <td>35.5-37</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>L</td>
                    <td>12-14</td>
                    <td>38.5-40.5</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>XL</td>
                    <td>16-18</td>
                    <td>43-45.5</td>
                  </tr>
                </tbody>
              </Table>
            </React.Fragment>

          </React.Fragment>}

        {label == "Bottoms" && props.gender == "Female" &&
          <React.Fragment>
            <h4>{label}</h4>
            <React.Fragment>
              <Table hover>
                <thead>
                  <tr className="sizeModalBackGround">
                    <th>Size</th>
                    <th>Numerical</th>
                    <th>Waist</th>
                    <th>Hip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="sizeModalNumberFont">
                    <td>XXS</td>
                    <td className="grayTH">000-00</td>
                    <td>23-24</td>
                    <td>33.5-34.5</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>XS</td>
                    <td>0-2</td>
                    <td>25-26</td>
                    <td>35.5-36.5</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>S</td>
                    <td>4-6</td>
                    <td>27-28</td>
                    <td>37.5-38.5</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>M</td>
                    <td>8-10</td>
                    <td>29-30.5</td>
                    <td>39.5-41</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>L</td>
                    <td>12-14</td>
                    <td>32-34</td>
                    <td>42.5-44.5</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td>XL</td>
                    <td>16-18</td>
                    <td>36.5-39</td>
                    <td>47-49.5</td>
                  </tr>
                </tbody>
              </Table>
              <Table hover>
                <thead>
                  <tr className="sizeModalBackGround">
                    <th colSpan="2" scope="col">Size</th>
                    <th colSpan="2" scope="col">Inseam</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="sizeModalNumberFont">
                    <td colSpan="2" scope="col">SHORT</td>
                    <td colSpan="2" scope="col" className="grayTH">30</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td colSpan="2" scope="col">REGULAR</td>
                    <td colSpan="2" scope="col" className="grayTH">32</td>
                  </tr>
                  <tr className="sizeModalNumberFont">
                    <td colSpan="2" scope="col">LONG</td>
                    <td colSpan="2" scope="col" className="grayTH">34</td>
                  </tr>
                </tbody>

              </Table>
            </React.Fragment>
          </React.Fragment>
        }

        {label == "Measurement Tips" && props.gender == "Female" &&
          <Row>
            <Col xs={7}>
              <span className="sizeModalHeaderFont">How to Measure</span>
              <p className="sizeModalBodyFont">Using a cloth measuring tape, measure over the undergarments you will be wearing with the style you are ordering.</p>
              <p className="sizeModalBodyFont"> If you don't have a measuring tape, simply use a piece of string then line it up against a yardstick.</p>

              <span className="sizeModalSubHeaderFont">Bust</span>
              <p className="sizeModalBodyFont">For the most accurate results, wear a soft cup bra and keep your arms down. Measure around your chest at the fullest point of the bust and under your arms.</p>

              <span className="sizeModalSubHeaderFont">Natural Waist</span>
              <p className="sizeModalBodyFont">Measure around your waist at the narrowest point.</p>

              <span className="sizeModalSubHeaderFont">Hips</span>
              <p className="sizeModalBodyFont">Stand with your heels together and measure around the fullest part of your hips.</p>

              <span className="sizeModalSubHeaderFont">Inseam</span>
              <p className="sizeModalBodyFont">Measure a similar style of well-fitting pants from the crotch/rise seam along the inside leg to the hem.</p>
            </Col>
            <Col>
              <img src="https://res.cloudinary.com/dpjcaw4xb/image/upload/v1634941233/Express/SizeModal/womenSizeModal_wpzfwe.webp"></img>
            </Col>
          </Row>

        }

        {label == "Tops" && props.gender == "Male" &&
          <React.Fragment>
            <React.Fragment>
              <h4>{label}</h4>
            </React.Fragment>
            <Table hover>
              <thead>
                <tr className="sizeModalBackGround">
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Sleeve</th>
                  <th>Neck</th>
                </tr>
              </thead>
              <tbody>
                <tr className="sizeModalNumberFont">
                  <td>XS</td>
                  <td className="grayTH">33.5-35.5</td>
                  <td>31.25-31.75</td>
                  <td>13-13.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>S</td>
                  <td>36.5-38.5</td>
                  <td>32-32.5</td>
                  <td>14-14.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>M</td>
                  <td>39.5-41.5</td>
                  <td>32.75-33.25</td>
                  <td>15-15.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>L</td>
                  <td>42.5-44.5</td>
                  <td>33.5-34</td>
                  <td>16-16.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>XL</td>
                  <td>45.5-48.5</td>
                  <td>34.25-35</td>
                  <td>17-17.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>XXL</td>
                  <td>49.5-52.5</td>
                  <td>35.25-36</td>
                  <td>18-18.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>XS TALL</td>
                  <td className="grayTH">33.5-35.5</td>
                  <td>32.25-32.75</td>
                  <td>13-13.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>S TALL</td>
                  <td>36.5-38.5</td>
                  <td>33-33.5</td>
                  <td>14-14.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>M TALL</td>
                  <td>39.5-41.5</td>
                  <td>33.75-34.25</td>
                  <td>15-15.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>L TALL</td>
                  <td>42.5-44.5</td>
                  <td>34.5-35</td>
                  <td>16-16.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>XL TALL</td>
                  <td>45.5-48.5</td>
                  <td>35.25-36</td>
                  <td>17-17.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>XXL TALL</td>
                  <td>49.5-52.5</td>
                  <td>36.25-37</td>
                  <td>18-18.5</td>
                </tr>
              </tbody>
            </Table>

          </React.Fragment>
        }

        {label == "Bottoms" && props.gender == "Male" &&
          <React.Fragment>
            <h4>{label}</h4>
            <Table hover>
              <thead>
                <tr className="sizeModalBackGround">
                  <th>Size</th>
                  <th>Numerical</th>
                  <th>Waist</th>
                  <th>Hip</th>
                </tr>
              </thead>
              <tbody>
                <tr className="sizeModalNumberFont">
                  <td rowSpan="3" scope="row">XS</td>
                  <td>25</td>
                  <td>26</td>
                  <td>31.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>26</td>
                  <td>27</td>
                  <td>32.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>27</td>
                  <td>28</td>
                  <td>33.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td rowSpan="3" scope="row">S</td>
                  <td>28</td>
                  <td>29</td>
                  <td>34.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>29</td>
                  <td>30</td>
                  <td>35.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>30</td>
                  <td>31</td>
                  <td>36.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td rowSpan="3" scope="row">M</td>
                  <td>31</td>
                  <td>32</td>
                  <td>37.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>33</td>
                  <td>34</td>
                  <td>39.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>34</td>
                  <td>35</td>
                  <td>40.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td rowSpan="4" scope="row">L</td>
                  <td>34</td>
                  <td>35</td>
                  <td>40.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>35</td>
                  <td>36</td>
                  <td>41.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>36</td>
                  <td>37</td>
                  <td>42.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>37</td>
                  <td>38</td>
                  <td>43.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td rowSpan="5" scope="row">XL</td>
                  <td>38</td>
                  <td>39</td>
                  <td>45.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>39</td>
                  <td>40</td>
                  <td>46.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>40</td>
                  <td>41</td>
                  <td>47.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>41</td>
                  <td>42</td>
                  <td>48.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>42</td>
                  <td>43.5</td>
                  <td>49.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td rowSpan="5" scope="row">XXL</td>
                  <td>43</td>
                  <td>44.5</td>
                  <td>49.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>44</td>
                  <td>45.5</td>
                  <td>50.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>45</td>
                  <td>47</td>
                  <td>51.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>46</td>
                  <td>48</td>
                  <td>52.5</td>
                </tr>
                <tr className="sizeModalNumberFont">
                  <td>47</td>
                  <td>49</td>
                  <td>53.5</td>
                </tr>
              </tbody>
            </Table>

          </React.Fragment>
        }

        {label == "Measurement Tips" && props.gender == "Male" &&
          <React.Fragment>
            <Row>
              <Col xs={7}>
                <span className="sizeModalHeaderFont">How to Measure</span>
                <p className="sizeModalBodyFont">Using a cloth measuring tape, measure over the undergarments you will be wearing with the style you are ordering.</p>
                <p className="sizeModalBodyFont"> If you don't have a measuring tape, simply use a piece of string then line it up against a yardstick.</p>

                <span className="sizeModalSubHeaderFont">Chest</span>
                <p className="sizeModalBodyFont">Lift your arms slightly and measure around your body, crossing over the fullest part of your chest.</p>

                <span className="sizeModalSubHeaderFont">Natural Waist</span>
                <p className="sizeModalBodyFont">Measure around your waist at the narrowest point.</p>

                <span className="sizeModalSubHeaderFont">Hips</span>
                <p className="sizeModalBodyFont">Stand with your heels together and measure around the fullest part of your hips.</p>

                <span className="sizeModalSubHeaderFont">Neck</span>
                <p className="sizeModalBodyFont">Measure a shirt collar that fits you well. Lay collar flat and measure from center of collar button to far end of collar buttonhole.</p>

                <span className="sizeModalSubHeaderFont">Sleeve</span>
                <p className="sizeModalBodyFont">With forearm parallel to chest, measure from center back of neck around the elbow to the wrist bone. You can also use a well-fitting shirt, fold at shoulder and measure the same as above.</p>

              </Col>
              <Col>
                <img src="https://res.cloudinary.com/dpjcaw4xb/image/upload/v1634941233/Express/SizeModal/menSizeModal_fz0ugx.webp"></img>
              </Col>
            </Row>
          </React.Fragment>
        }

      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal >
  );
}

export default SizeModal;