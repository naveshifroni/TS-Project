import { bubbleSort, random } from "../utils.js";
const input = document.getElementById("input");
const btn = document.getElementById("send-btn");
const btn2 = document.getElementById("sort-btn");
const btn3 = document.getElementById("div-btn");
const ul = document.getElementById("arrays");
const small = document.getElementById("arr-s");
const medium = document.getElementById("arr-m");
const large = document.getElementById("arr-l");
function createArr(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(random(0, 100));
    }
    return arr;
}
const arr = createArr(5); // דוגמא לשימוש בפונקציה
bubbleSort(arr);
console.log(arr);
btn.addEventListener("click", () => {
    //  בלחיצה על כפתור create
    // אנחנו מציגים את המערך
    ul.innerHTML = "";
    const length = +input.value;
    const userArr = createArr(length);
    const arrLi = document.createElement("li");
    ul.appendChild(arrLi);
    userArr.forEach((n) => (arrLi.innerText += `${n} ,`));
    btn2.addEventListener("click", () => {
        ul.innerHTML = "";
        bubbleSort(userArr);
        const arrLi2 = document.createElement("li");
        ul.appendChild(arrLi2);
        userArr.forEach((n) => (arrLi2.innerText += `${n} ,`));
    });
    btn3.addEventListener("click", () => {
        const arrS = [];
        const arrM = [];
        const arrL = [];
        userArr.forEach((j) => {
            if (j <= 30) {
                arrS.push(j);
            }
            else if (j <= 60) {
                arrM.push(j);
            }
            else if (j <= 100) {
                arrL.push(j);
            }
        });
        while (arrS.length > arrM.length + 1 || arrS.length > arrL.length + 1) {
            arrS.pop();
        }
        while (arrM.length > arrS.length + 1 || arrM.length > arrL.length + 1) {
            arrM.pop();
        }
        while (arrL.length > arrS.length + 1 || arrL.length > arrM.length + 1) {
            arrL.pop();
        }
        small.innerHTML = "";
        medium.innerHTML = "";
        large.innerHTML = "";
        arrS.forEach((s) => (small.innerHTML += `${s} ,`));
        arrM.forEach((m) => (medium.innerHTML += `${m} ,`));
        arrL.forEach((l) => (large.innerHTML += `${l} ,`));
    });
});
