import React, {useState} from "react";
import Form from 'react-bootstrap/Form'
import './FilterColor.css'

const FilterColor = (props) => {

    const [filterState, setFilterState] = useState("");


    

    const handleToggle = (e) => {
        // setFilterState(e.target.value)
        props.afterClick(e)
    }

    let sortedColor = [];

    const colorArr = () => {
        const colorData = props.filterState.map((data, index) => {
            return(data.color)
        })

        sortedColor = [...new Set(colorData)]

        const formData = sortedColor.map((data, index) => {
            return(
                <React.Fragment key={index}>
                    <Form.Check onChange={handleToggle} label={data} value={data}></Form.Check>
                </React.Fragment>
                )
        })
        return(formData);

    }


    // console.log(filterState);

    
    return(
    <React.Fragment>
        {colorArr()}
    </React.Fragment>)
}

export default FilterColor;