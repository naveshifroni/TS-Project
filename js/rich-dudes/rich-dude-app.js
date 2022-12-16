import { richDudes } from "./rich-dude.js";
const cardsDisplay = document.getElementById('rich-dudes-display');
richDudes.map((r) => {
    const card = `<div class="card rich-dude-card m-2">
  <img src="${r.image}" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${r.name}</h5>
    <p class="card-text"> 
    Worth: ${r.worth} <br>
    Source: ${r.source} <br>
    Country: ${r.country} <br>
    Birth year: ${r.birth_year} <br>
     </p>
  </div>
</div>`;
    const cardDiv = document.createElement('div');
    cardDiv.id = `${r.name}`;
    cardsDisplay.appendChild(cardDiv);
    cardDiv.innerHTML += card;
    cardDiv.addEventListener('click', () => {
        richDudes.filter((c) => c !== r);
        document.getElementById(cardDiv.id)?.remove();
    });
    return cardDiv;
});
