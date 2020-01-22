import Color from 'color';
import ColorString from 'color-string';

function normalizeHex(hex){
    return hex.toLowerCase();
}

function rgb2hex(r, g, b) {
    return normalizeHex(Color({ r, g, b }).hex());
}

function isColor(hex){
    return ColorString.get(hex);
}

function hex2rgb(hex){
    return Color( isColor(hex) ? hex : '#000').rgb().object();
}

export {
    rgb2hex,
    hex2rgb,
    isColor
}