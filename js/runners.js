export const runners = {
    dog: {
        name: "dog",
        id: "dog",
        voice: "woof",
        img: "dog.png",
        step: 50,
    },
    horse: {
        name: "horse",
        id: "horse",
        voice: "neigh",
        img: "horse.png",
        step: 70,
    },
    duck: {
        name: "duck",
        id: "duck",
        voice: "quack",
        img: "duck.png",
        step: 40,
    },
    chick: {
        name: "chick",
        id: "chick",
        voice: "cheap",
        img: "chick.png",
        step: 30,
    },
};
export class Animal {
    name;
    id;
    voice;
    img;
    step;
    //the user selects an animal
    isChosen;
    //for css transform (move)
    translateX;
    constructor(name, id, voice, img, step, isChosen, translateX) {
        this.name = name;
        this.id = id;
        this.voice = voice;
        this.img = img;
        this.step = step;
        this.isChosen = isChosen;
        this.translateX = translateX;
    }
}
export let animalArray = [];
// תזכורת - לולאה שרצה על כל המפתחות של אובייקט
for (let k in runners) {
    let key = k; //"dog" | "horse" | "duck" | "chick"
    let animal = runners[key];
    animalArray.push(new Animal(animal.name, animal.id, animal.voice, animal.img, animal.step, false, 0));
}
