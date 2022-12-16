import { Utils } from "../utils.js";
export class Color {
    // props:
    r;
    g;
    b;
    name;
    timestamp;
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.timestamp = Utils.currentDateString();
    }
    //instance method:
    hex() {
        return Color.toHex(this.r, this.g, this.b);
    }
    //static method:
    static toHex(r, g, b) {
        const redHex = r.toString(16).padStart(2, "0"); //f to 0f  (255 = FF)
        const greenHex = g.toString(16).padStart(2, "0");
        const blueHex = b.toString(16).padStart(2, "0");
        const hexColor = `#${redHex}${greenHex}${blueHex}`.toUpperCase();
        return hexColor;
    }
    //methods:
    rgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    //static methods:
    static fromRgb(red, green, blue) {
        return `rgb(${red}, ${green}, ${blue})`;
    }
}
// functions
export function capValue(value) {
    let r = Math.min(value, 255); //value = 800 => r = 255
    r = Math.max(r, 0); //value = -599 => 0
    return r;
}
export function capRGB(r, g, b) {
    let red = capValue(r);
    let green = capValue(g);
    let blue = capValue(b);
    return [red, green, blue];
}
/* export interface FavouriteColor {
  r: number;
  g: number;
  b: number;
  timestamp: string;

} */
