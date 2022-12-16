import { random } from "../utils.js";
import { cardToNum } from "./cards-func.js"; // נייבא את הפונקציה שמייצרת לנו מספר מסטרינג של קלף
const btnPlayer1 = document.getElementById("player1");
const btnPlayer2 = document.getElementById("player2");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
let card1ForReal = [];
let card2ForReal = [];
let win1 = [];
let win2 = [];
let winWarArr = []; // מערך שנמלא במקרה של מלחמה (כששני הקלפים שווים)
const pack1 = document.getElementById("pack-1-display");
const pack2 = document.getElementById("pack-2-display");
let fullPackNum = [];
let howManyLoops = 0; // נאתחל משתנה על מנת בהמשך להציג כמה 
// פעמים המחשב צריך להריץ את הלופ על מנת למלא מערך של 52 מספרים רנדומליים
while (fullPackNum.length < 52) { // נייצר מערך של 52 מספרים רנדומליים
    let r = Math.floor(Math.random() * 52);
    howManyLoops++;
    if (fullPackNum.includes(r) === false) {
        fullPackNum.push(r);
    }
}
console.log(howManyLoops); // נציג בקונסול בכל רינדור כמה פעמים המחשב היה צריך להריץ את הלולאה
let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
let suits = ['clubs', 'spades', 'diamonds', 'hearts'];
let cards = [];
ranks.forEach(function (rank) {
    suits.forEach(function (suit) {
        cards.push(`cards_images/${rank}_of_${suit}.png`);
    });
});
let sortedPack = fullPackNum.map((n) => cards[n]); // על ידי המתודה מאפ נסדר את החבילת קלפים
// בסדר רנדומלי על ידי מיקום הקלפים באינדקס רנדומלי על ידי שימוש במערך של המספרים הרנדומליים שיצרנו
function game() {
    btnPlayer1.addEventListener("click", () => {
        // בלחיצה על הכפתור של שחקן אחד נבחר קלף רנדומלי מהחבילה המעוררבת
        if (sortedPack.length > 0) {
            const r = random(0, sortedPack.length);
            const warCard1 = sortedPack[r];
            sortedPack.splice(r, 1);
            card1ForReal.splice(0, 1, warCard1);
            card1.innerHTML = `<img src=${warCard1} class="war-card-display">`;
        }
        else if (sortedPack.length === 0 && win1.length > 0) {
            // כאשר החבילה נגמרת נבחר קלף מתוך הערימה של הקלפים ששחקן 1 זכה
            const r = random(0, win1.length);
            const nextCard1 = win1[r];
            win1.splice(r, 1);
            pack1.innerHTML = "";
            win1.map((c) => {
                const card = `<img src=${c} class="win-cards m-1">`;
                pack1.innerHTML += card;
            });
            card1ForReal.splice(0, 1, nextCard1);
            card1.innerHTML = `<img src=${nextCard1}  class="war-card-display">`;
        }
        // סוף משחק
        else if (win2.length === 0 && sortedPack.length < 2) {
            // כאשר לשחקן 2 הגמרו הקלפים רשום שחקן אחד ניצח
            card1.innerHTML = `game over player 1 won`;
        }
        else if (win1.length === 0 && fullPackNum.length < 2) {
            // כאשר לשחקן 1 הגמרו הקלפים רשום שחקן 2 ניצח
            card2.innerHTML = `game over player 2 won`;
        }
    });
    btnPlayer2.addEventListener("click", () => {
        // בלחיצה על כפתור של שחקן 2 רוב פעולות המשחק קורות
        // אם נשארו קלפים בחבילה נבחר מתוכה קלף רנדומלי
        if (sortedPack.length > 0) {
            const r = random(0, sortedPack.length);
            const nextCard2 = sortedPack[r];
            sortedPack.splice(r, 1);
            card2ForReal.splice(0, 1, nextCard2);
            card2.innerHTML = `<img src=${nextCard2}  class="war-card-display">`;
        }
        else if (sortedPack.length === 0 && win2.length > 0) {
            // כאשר החבילה נגמרת נבחר קלף מתוך הערימה של הקלפים ששחקן2  זכה
            const r = random(0, win2.length);
            const nextCard3 = win2[r];
            win2.splice(r, 1);
            pack2.innerHTML = "";
            win2.map((c) => {
                const card = `<img src=${c} class="win-cards m-1">`;
                pack2.innerHTML += card;
            });
            card2ForReal.splice(0, 1, nextCard3);
            card2.innerHTML = `<img src=${nextCard3}  class="war-card-display">`;
        }
        // סוף משחק
        else if (win2.length === 0 && sortedPack.length < 2) {
            // כאשר לשחקן 2 הגמרו הקלפים רשום שחקן אחד ניצח
            card2.innerHTML = `game over player 1 won`;
        }
        else if (win1.length === 0 && sortedPack.length < 2) {
            // חכאשר לשחקן 2 הגמרו הקלפים רשום שחקן אחד ניצ
            card2.innerHTML = `game over player 2 won`;
        }
        let numCard1 = cardToNum(card1ForReal[0]);
        let numCard2 = cardToNum(card2ForReal[0]);
        // כאשר הקלף של שחקן 1 גדול יותר הוא זוכה בקלף והקלפים שלו מוצגים בערימה
        if (numCard1 > numCard2) {
            setTimeout(() => {
                card1.innerHTML += "player 1 won the round";
            }, 1000);
            win1.push(card1ForReal[0]);
            win1.push(card2ForReal[0]);
            pack1.innerHTML = "";
            win1.map((c) => {
                const card = `<img src=${c} class="win-cards m-1">`;
                pack1.innerHTML += card;
            });
        }
        // כאשר הקלף של שחקן2  גדול יותר הוא זוכה בקלף והקלפים שלו מוצגים בערימה
        else if (numCard2 > numCard1) {
            setTimeout(() => {
                card2.innerHTML += "player 2 won the round";
            }, 1000);
            win2.push(card1ForReal[0]);
            win2.push(card2ForReal[0]);
            pack2.innerHTML = "";
            win2.map((c) => {
                const card = `<img src=${c} class="win-cards m-1">`;
                pack2.innerHTML += card;
            });
        }
        // כאשר שני הקלפים שווים- מלחמה!
        else if (numCard1 === numCard2) {
            console.log(numCard1);
            console.log(numCard1);
            war(); // במקרה של מלחמה נריץ את הפונקציה "וור" שכתבנו פה למטה
        }
    });
}
game();
function fillWarArr() {
    if (sortedPack.length > 3) {
        const r = random(0, sortedPack.length);
        const warCard2 = sortedPack[r];
        sortedPack.splice(r, 1);
        const r2 = random(0, sortedPack.length);
        const warCard3 = sortedPack[r2];
        sortedPack.splice(r2, 1);
        const r3 = random(0, sortedPack.length);
        const warCard5 = sortedPack[r3];
        sortedPack.splice(r3, 1);
        const r4 = random(0, sortedPack.length);
        const warCard6 = sortedPack[r4];
        sortedPack.splice(r4, 1);
        winWarArr = [
            warCard3,
            warCard6,
            card1ForReal[0],
            warCard2,
            card2ForReal[0],
            warCard5,
            ...winWarArr,
        ];
    }
    else if (sortedPack.length < 4) {
        const r = random(0, win1.length);
        const warCard2 = win1[r];
        win1.splice(r, 1);
        const r2 = random(0, win1.length);
        const warCard3 = win1[r2];
        win1.splice(r2, 1);
        const r3 = random(0, win2.length);
        const warCard5 = win2[r3];
        win2.splice(r3, 1);
        const r4 = random(0, win2.length);
        const warCard6 = win2[r4];
        win2.splice(r4, 1);
        winWarArr = [
            warCard3,
            warCard6,
            card1ForReal[0],
            warCard2,
            card2ForReal[0],
            warCard5,
            ...winWarArr,
        ];
    }
}
function war() {
    fillWarArr();
    let warCard3 = winWarArr[0];
    let warCard6 = winWarArr[1];
    setTimeout(() => {
        card1.innerHTML = `<img src=${warCard3} class="war-card-display">`;
        card2.innerHTML = `<img src=${warCard6} class="war-card-display">`;
        console.log(warCard3);
        console.log(warCard6);
    }, 1000);
    let war1 = cardToNum(warCard3);
    let war2 = cardToNum(warCard6);
    if (war1 > war2) {
        setTimeout(() => {
            card1.innerHTML += "player 1 won the war round!!!";
        }, 1000);
        win1 = [...win1, ...winWarArr];
        winWarArr = []; // במקרה שאחד השחקנים זכה נרוקן את המערך
        pack1.innerHTML = "";
        win1.map((c) => {
            const card = `<img src=${c} class="win-cards m-1">`;
            pack1.innerHTML += card;
        });
    }
    else if (war2 > war1) {
        setTimeout(() => {
            card2.innerHTML += "player 2 won the war round!!!";
        }, 1000);
        win2 = [...win2, ...winWarArr];
        winWarArr = []; // במקרה שאחד השחקנים זכה נרוקן את המערך
        pack2.innerHTML = "";
        win2.map((c) => {
            const card = `<img src=${c} class="win-cards m-1">`;
            pack2.innerHTML += card;
        });
    }
    else if (war1 === war2) { // במקרה שיש שוב פעם מלחמה נריץ שוב את הפונקציה "וור"
        // ונמשיך למלא את המערך עד שאחד השחקנים יזכה בכל הקופה
        war();
    }
}
