import React from 'react';
import RangeInput from "../RangeInput";
import PropTypes from "prop-types";

const RGBInput = (props) => {
    return <RangeInput {...props} min={0} max={255} />
};

RangeInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default RGBInput;