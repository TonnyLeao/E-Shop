import React, {useState} from "react";
import Form from 'react-bootstrap/Form'
import './FilterBox.css'

const FilterBox = (props) => {

    const [filterState, setFilterState] = useState("");


    const handleToggle = (e) => {
        // setFilterState(e.target.value)
        props.afterClick(e)
    }

    // console.log(filterState);



    return(
    <React.Fragment>
        <Form.Check onChange={handleToggle} label="0.00-29.99" value="1"></Form.Check>
        <Form.Check onChange={handleToggle} label="30.00-39.99" value="2"></Form.Check>
        <Form.Check onChange={handleToggle} label="40.00+" value="3"></Form.Check>
        
        
        
    </React.Fragment>)
}

export default FilterBox;