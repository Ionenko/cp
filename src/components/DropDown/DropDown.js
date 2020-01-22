import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const DropDown = (props) => {
    const dropDownRef = useRef(null);

    function handleClickOutside(e){
        if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
            props.handleClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    });

    return(
        <div className={props.className} ref={dropDownRef} >
            {props.children}
        </div>
    )
};

DropDown.propTypes = {
    children: PropTypes.element.isRequired
};

export default DropDown;