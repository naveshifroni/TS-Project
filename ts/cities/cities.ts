import { names } from "./citiesarr.js";
import { ColorType } from "../colors/color-exports.js";


names.sort();

const input = document.getElementById("input") as HTMLInputElement;
const namesUL = document.querySelector(".name-list") as HTMLDivElement;
const chosenCity = document.getElementById(
  "chosen-city-name"
) as HTMLDivElement;
let cities: string[] = [];
const chosenCitiesBtn = document.getElementById(
  "chosen-cities-btn"
) as HTMLDivElement;

const chosenCitiesList = document.getElementById(
  "chosen-cities-list"
) as HTMLDivElement;

const input2 = document.getElementById("input2") as HTMLInputElement;
const colorUL = document.getElementById("color-list") as HTMLUListElement;
let colorVisitedChosen = "hi";// נאתחל משתנים של סטרינגים על מנת שיהיה יותר קל להגדיר צבעים בהמשך
let colorGonnaChosen = "hi";
let colorNeverChosen = "hi";
const colorVisited = document.getElementById(
  "inlineRadio1"
) as HTMLInputElement;
const colorGonnaVisit = document.getElementById(
  "inlineRadio2"
) as HTMLInputElement;
const colorNeverVisit = document.getElementById(
  "inlineRadio3"
) as HTMLInputElement;
let been: string[] = [];
let gonna: string[] = [];
let never: string[] = [];

const visitedUL = document.getElementById("visited-ul") as HTMLUListElement;
const gonnaUL = document.getElementById("gonna-ul") as HTMLUListElement;
const neverUL = document.getElementById("never-ul") as HTMLUListElement;

function init() {
  colorVisited.checked = true;
  localStorage.setItem("city", "visited"); // נאתחל את העמוד במצב בו הוא יכול לבחור צבע לערים שבהם הוא כבר ביקר
}

init();
//handle letter clicked:
input.addEventListener("input", () => {
  //clear all items in the UL
  //namesUL.innerHTML= ''
  document.querySelectorAll(".name-item").forEach((e) => e.remove());
  const inputValue = input.value.toLowerCase(); //"".length === 0

  //אם הקלט ריק - סיימנו
  if (inputValue.length === 0) {
    return;
  }

  //נגדיר רשימה חדשה עם כל השמות שתואמים לחיפוש:

  //2)filter the array according to the input value
  const filteredNames = names.filter((name) =>
    name.toLowerCase().startsWith(inputValue)
  );

  //LI עבור כל מחרוזת שתואמת לחיפוש - ניצור פריט-ברשימה
  //string[] => li[]
  const liArray = filteredNames.map((n) => {
    const li = document.createElement("li");
    li.classList.add("name-item");
    li.innerText = n;

    li.addEventListener("click", () => {
      document.querySelectorAll(".name-item").forEach((e) => e.remove());
      chosenCity.innerText = n;
      cities.push(n);
      cities.sort();
      console.log(cities);

      localStorage.setItem("Chosen-cities", JSON.stringify(cities));
    });

    return li;
  });

  //נציג את כל פריטי-הרשימה במסמך
  liArray.forEach((li) => namesUL.appendChild(li));
});

chosenCitiesBtn.addEventListener("click", () => {
  // כפתור להצגת הערים הנבחרות ולאיפוס הצבע שלהם
  chosenCity.innerHTML = "";
  chosenCitiesList.innerHTML = "";
  const mapped = cities.map((c) => {
    const divCity = document.createElement("div");
    divCity.classList.add("the-cities");
    divCity.innerText = c;
    divCity.addEventListener("click", () => {
      divCity.style.color = "magenta";
    });

    divCity.addEventListener("dblclick", () => {
      divCity.style.color = "purpule";
    });

    divCity.addEventListener("click", () => {
      // בלחיצה מחלקים את העיר לביקרתי/אבקר/לעולם לא
      if (localStorage.getItem("city") === "visited") {
        const visitedLI = document.createElement("li");
        visitedLI.innerText = c;
        visitedUL.appendChild(visitedLI);
        visitedUL.style.background = colorVisitedChosen;
      } else if (localStorage.getItem("city") === "gonna") {
        const visitedLI = document.createElement("li");
        visitedLI.innerText = c;
        gonnaUL.appendChild(visitedLI);
      } else if (localStorage.getItem("city") === "never") {
        const visitedLI = document.createElement("li");
        visitedLI.innerText = c;
        neverUL.appendChild(visitedLI);
      }
    });
    return divCity;
  });

  mapped.forEach((divCity) => chosenCitiesList.appendChild(divCity));
});


input2.addEventListener("input", () => {// נציג בתפריט נופל את הצבעים ששמרנו באפליקציית הצבעים
  const colorsFromDisk = localStorage.getItem("color-Arr") ?? "[]";
  const colorObjArr: ColorType[] = JSON.parse(colorsFromDisk);
  const colorNames = localStorage.getItem("name-Arr") ?? "[]";
  const colorsArr: string[] = JSON.parse(colorNames);


  document.querySelectorAll(".color-name").forEach((e) => e.remove());

  const inputValue = input2.value.toLowerCase(); 

  //אם הקלט ריק - סיימנו
  if (inputValue.length === 0) {
    return;
  }
  const filtered = colorsArr.filter((a) =>
    a.toLowerCase().startsWith(inputValue)
  );

  const liArray = filtered.map((n) => {
    const li2 = document.createElement("li");

    li2.classList.add("name-item", "color-name");
    li2.innerText = n;

    li2.addEventListener("click", () => {
      let index = colorObjArr.findIndex((b) => b.name === n);
      let color = colorObjArr[index];
      console.log(color);
      console.log(index);
      const bgc = `rgb(${color.r}, ${color.g}, ${color.b})`;

      if (localStorage.getItem("city") === "visited") {// נצבע את הרקע של הערים הממויינות לפי איזה קבוצת ערים המשתמש רצה לצבוע
        console.log(bgc);
        visitedUL.style.background = bgc;
      } else if (localStorage.getItem("city") === "gonna") {
        gonnaUL.style.background = bgc;
      } else if (localStorage.getItem("city") === "never") {
        neverUL.style.background = bgc;
      }
    });

    return li2;
  });
  liArray.forEach((li2) => colorUL.appendChild(li2));
});

// על מנת לבחור צבע לערים שביקרתי / אבקר/ לעולם לא אבקר נשמור בלוקאל סטורג'
/* מצב שעל פיו נדע לאיזה קבוצה של ערים המשתמש בוחר צבע */ //

colorVisited.addEventListener("click", () => {
  localStorage.setItem("city", "visited");
});

colorGonnaVisit.addEventListener("click", () => {
  localStorage.setItem("city", "gonna");
});

colorNeverVisit.addEventListener("click", () => {
  localStorage.setItem("city", "never");
});
