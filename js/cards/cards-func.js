// קובץ של פונקציות שמייצרות מסטרינג של קלף
//מספר שאיתו אפשר לייצר את הפונקציונאליות של משחק המלחמה
export function cardToNum(card) {
    let cardtext1 = JSON.stringify(card);
    let firstLetterCard1 = cardtext1.slice(14, 16);
    let correct1 = toCorrect(firstLetterCard1);
    let numCard1 = parseInt(correct1);
    return numCard1;
}
function toCorrect(str) {
    if (str.charAt(1) === '_') {
        str = str.charAt(0);
    }
    else {
        str = str.slice(0, 3);
    }
    return str;
}
;
