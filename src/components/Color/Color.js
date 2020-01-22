import React from "react";
import PropTypes from 'prop-types';

const Color = ({value}) => {
    return (
        <div
            title={value}
            className="cp-color"
            style={{backgroundColor: value}}
        />
    );
};

Color.defaultProps = {
    value: '#000000'
};

Color.propTypes = {
    value: PropTypes.string.isRequired
};

export default Color;