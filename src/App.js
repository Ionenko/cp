import React, {useState} from 'react';
import './App.scss';
import ColorPicker from "./components/ColorPicker";
import Logo from "./logo";

function App() {
    const [color, setColor] = useState("#fff");
    const [background, setBackground] = useState("#eee");

    const colors = [
        {
            name: 'red',
            value: '#F44336'
        },
        {
            name: 'yellow',
            value: '#FFEB3B'
        },
        {
            name: 'green',
            value: '#4CAF50'
        },
        {
            name: 'blue',
            value: '#01579b'
        }
    ];

    const changeLogoColor = (color) => {
        setColor(color);
    };

    const changeBoxBackground = (color) => {
        setBackground(color);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Logo fill={color}/>
                <ColorPicker
                    value={"#964FA8"}
                    colors={colors}
                    onChange={changeLogoColor}
                />
                <br/>
                <div style={{width: 100, height: 100, margin: 10, background: background}}/>
                <ColorPicker
                    value={"#eee"}
                    onChange={changeBoxBackground}
                />
            </header>

        </div>
    );
}

export default App;
