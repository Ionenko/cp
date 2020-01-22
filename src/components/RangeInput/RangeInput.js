import React from 'react';
import PropTypes from 'prop-types';

const RangeInput = (props) => {

    function onChange(e){
        const {onChange, name, max} = props;

        let value = parseInt(e.target.value || 0, 10);

        if(value > max) value = max;

        onChange(name, value);
    }

    return (
        <div>
            <input
                {...props}
                type="range"
                onChange={onChange}
            />
        </div>
    );
};

RangeInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default RangeInput;