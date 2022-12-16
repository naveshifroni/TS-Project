import { random } from "../utils.js";
import { animalArray } from "./runners.js";
let arrRand = [0, 1, 2, 3]; // יצרנו מערך של מספרים מ 0-3 כדי להיעזר בו בהמשך בבחירת חיה
const animalShowCase = document.getElementById("animal-show-case");
const btnStart = document.getElementById("btn-start");
let id;
btnStart.addEventListener("click", () => {
    //remove chosen from all animals
    animalArray.forEach((a) => {
        a.isChosen = false;
        a.translateX = 0;
    });
    //remove the border from all img tags
    //select all img tags in the document
    document
        .querySelectorAll("#animal-show-case img")
        .forEach((img) => img.classList.remove("chosen-animal"));
    const r = random(0, arrRand.length); // הגרלנו מספר וחיה רנדומלית
    arrRand.splice(r, 1);
    const chosenAnimal = animalArray[r];
    animalArray.splice(r, 1);
    chosenAnimal.isChosen = true;
    const img = document.getElementById(chosenAnimal.id);
    img.classList.add("chosen-animal");
    setTimeout(() => {
        const audio = new Audio(`./media/${chosenAnimal.voice}.wav`);
        audio.play();
        id = setInterval(() => {
            chosenAnimal.translateX += chosenAnimal.step * 10;
            img.style.transform = `translateX(${chosenAnimal.translateX}px)`;
            if (img.getBoundingClientRect().x >
                document.body.getBoundingClientRect().width) {
                clearInterval(id);
                //resetGame()
            }
        }, 1000);
    }, 1000);
});
animalArray
    .sort((a, b) => (Math.random() > 0.5 ? 1 : -1))
    .map((animal) => {
    const image = document.createElement("img");
    image.src = `images/${animal.img}`;
    image.classList.add("col", "image-fluid");
    image.id = animal.id;
    //image.addEventListener('click', ()=>{})
    return image;
})
    .forEach((img) => {
    animalShowCase.appendChild(img);
});
