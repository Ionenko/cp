import React, {useEffect, useRef, useState} from 'react';
import './ColorPicker.scss';
import RGBInput from "../RGBInput";
import {
    hex2rgb,
    rgb2hex
} from "../../utils/colorFunc";
import DropDown from "../DropDown";
import Color from "../Color";
import PropTypes from "prop-types";

const ColorPicker = (props) => {
    const {value, colors, onChange} = props;

    const [state, setState] = useState(() => {
        return {
            value: value,
            color: setColor(value)
        };
    });

    const [dropDowns, setDropDowns] = useState({
        rgb: false,
        colors: false,
    });

    const handleChange = useRef(onChange);

    useEffect(
        () => {
            handleChange.current = onChange;
        },
        [onChange]
    );

    useEffect(() => {
        if(value !== state.value){
            handleChange.current(state.value)
        }
    },[state.value, value]);


    function setColor(color) {
        const obj = hex2rgb(color);
        return {
            r: obj.r,
            g: obj.g,
            b: obj.b,
            hex: color
        }
    }

    function toggleDropdown(name, value){
        setDropDowns({
            ...dropDowns,
            [name]: value
        })
    }

    function discardRGBChanges(){
        setState({
            ...state,
            color: setColor(state.value)
        });
        toggleDropdown('rgb', false)
    }

    function applyRGBChanges(){
        setState({
            ...state,
            value: state.color.hex
        });
        toggleDropdown('rgb', false);
    }

    function changeColor(color){
        setState({
            value: color,
            color: setColor(color)
        });

        toggleDropdown('colors', false)
    }

    function changeRGB(name, value) {

        const obj = {
            ...state.color,
            [name]: value
        };

        setState({
            ...state,
            color: setColor(rgb2hex(obj.r, obj.g, obj.b))
        });
    }

    return (
        <div className="cp">
            <div className="cp-inner">
                <div className='cp-value'>
                    <input value={state.value} readOnly type="text"/>
                </div>
                <div className="cp-controls">
                    <div className="cp-controls-item">
                        <div onClick={() => toggleDropdown('rgb', !dropDowns.rgb)} className="cp-button">
                            <Color value={state.color.hex}/>
                        </div>
                        {
                            dropDowns.rgb ? (
                                <DropDown handleClose={discardRGBChanges} className="cp-dropdown">
                                    <div className="cp-dropdown-inner">
                                        <div className="cp-dropdown-arrow"/>
                                        <div className="cp-dropdown-body">
                                            <div className="cp-rgb">
                                                <div className="cp-rgb-item">
                                                    <div className="cp-rgb-label">
                                                        R
                                                    </div>
                                                    <div className="cp-range-input">
                                                        <RGBInput
                                                            value={state.color.r}
                                                            name="r"
                                                            onChange={changeRGB}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="cp-rgb-item">
                                                    <div className="cp-rgb-label">
                                                        G
                                                    </div>
                                                    <div className="cp-range-input">
                                                        <RGBInput
                                                            value={state.color.g}
                                                            name="g"
                                                            onChange={changeRGB}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="cp-rgb-item">
                                                    <div className="cp-rgb-label">
                                                        B
                                                    </div>
                                                    <div className="cp-range-input">
                                                        <RGBInput
                                                            value={state.color.b}
                                                            name="b"
                                                            onChange={changeRGB}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cp-buttons">
                                            <button onClick={discardRGBChanges} type="button" className="cp-button">
                                                Cancel
                                            </button>
                                            <button onClick={applyRGBChanges} type="button" className="cp-button primary">
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                                </DropDown>
                            ) : null
                        }
                    </div>
                    {
                        colors && colors.length > 0 ? (
                            <div className="cp-controls-item">
                                <div className="cp-button" onClick={() => toggleDropdown('colors', !dropDowns.colors)}>
                                    <div className="cp-arrow"/>
                                </div>
                                {
                                    dropDowns.colors ? (
                                        <DropDown handleClose={() => toggleDropdown('colors', false)} className="cp-dropdown">
                                            <div className="cp-dropdown-inner">
                                                <div className="cp-dropdown-arrow"/>
                                                <div className="cp-dropdown-body">
                                                    <div className="cp-list">
                                                        {
                                                            colors.map((color, index) => (
                                                                <div key={index + color} onClick={() => changeColor(color.value)} className="cp-list-item">
                                                                    <span>{ color.name }</span>
                                                                    <Color value={color.value}/>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </DropDown>
                                    ) : null
                                }
                            </div>

                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

ColorPicker.defaultProps = {
    value: '#03abfb',
    colors: []
};

ColorPicker.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    colors: PropTypes.array,
};

export default ColorPicker;