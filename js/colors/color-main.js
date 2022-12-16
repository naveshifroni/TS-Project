import { Color, capRGB } from "./color-exports.js";
const exploreColor1 = document.getElementById("inlineRadio1");
const exploreColor2 = document.getElementById("inlineRadio2");
const redInput = document.getElementById("red-input");
const greenInput = document.getElementById("green-input");
const blueInput = document.getElementById("blue-input");
const box = document.getElementById("box");
const box2 = document.getElementById("box2");
const btnPick = document.getElementById("btnPick");
export let colorFavs = [];
export let colorNames = [];
function init() {
    exploreColor1.checked = true;
    localStorage.setItem("colorNum", "1");
}
init();
exploreColor1.addEventListener("click", () => {
    localStorage.setItem("colorNum", "1");
});
exploreColor2.addEventListener("click", () => {
    localStorage.setItem("colorNum", "2");
});
const allInputs = [redInput, greenInput, blueInput]; // ניצור מערך של אינפוטים של rgb
function rgb() {
    //cap red to min of value or 255 (if red > 255 => red = 255)
    //cap  r, g, b are between 0 to 255
    const [red, green, blue] = capRGB(Number(redInput.value), Number(greenInput.value), Number(blueInput.value));
    const c = new Color(red, green, blue, "color");
    const hexColor = c.hex();
    const rgbColor = c.rgb();
    let color1Or2 = localStorage.getItem("colorNum") === "2";
    if (color1Or2) {
        box2.style.background = rgbColor;
        box2.innerHTML = rgbColor + "<br>" + hexColor;
    }
    else {
        box.style.background = rgbColor;
        box.innerHTML = rgbColor + "<br>" + hexColor;
    }
    return c;
}
allInputs.forEach((i) => {
    i.addEventListener("input", (e) => {
        rgb();
    });
});
btnPick.addEventListener("click", () => {
    const color = JSON.stringify(rgb());
    let isColorNum = localStorage.getItem("colorNum") === "1";
    if (isColorNum) {
        localStorage.setItem("color 1", color);
    }
    else {
        localStorage.setItem("color 2", color);
    }
});
const buttonFavourites = document.getElementById("button-favourites");
const inputFavourite = document.getElementById("input-favourite");
const display = document.getElementById("favourites-display");
buttonFavourites.addEventListener("click", () => {
    const name = inputFavourite.value;
    const [red, green, blue] = capRGB(Number(redInput.value), Number(greenInput.value), Number(blueInput.value));
    const fc = new Color(red, green, blue, name);
    console.log(fc);
    const fav = JSON.stringify(fc);
    const favc = fc.rgb();
    const colorsFromDisk = JSON.parse(localStorage.getItem("color-Arr") ?? "[]");
    colorsFromDisk.push(fc);
    console.log(colorsFromDisk);
    const colorsNamesDisk = JSON.parse(localStorage.getItem("name-Arr") ?? "[]");
    colorsNamesDisk.push(name);
    localStorage.setItem("color-Arr", JSON.stringify(colorsFromDisk));
    localStorage.setItem("name-Arr", JSON.stringify(colorsNamesDisk));
    const favColor = document.createElement("div");
    favColor.style.backgroundColor = favc;
    favColor.style.width = `150px`;
    favColor.style.height = `150px`;
    favColor.classList.add("m-4");
    favColor.classList.add("fav-fav");
    display.appendChild(favColor);
    favColor.innerText = name;
    favColor.addEventListener("click", () => {
        favColor.remove();
    });
});
