const pathTo="./src/assets/icons/";
const state={
    score:{
        player:0,
        opponent:0,
        scoreBox:document.getElementById('score'),
    },
    players:{
        player:"player-field-card",
        opponent:"opponent-field-card",
        
    },
    side:{
        player:"player-cards",
        playerBox:document.querySelector(".card-box.framed#player-cards"),
        opponent:"opponent-cards",
        opponentBox:document.querySelector(".card-box.framed#opponent-cards"),
    },
    card:{
        art:document.getElementById("card-art"),
        name:document.getElementById("card-name"),
        type:document.getElementById("card-type"),
    },
    cardsOnField:{
        player:document.getElementById("player-field-card"),
        opponent:document.getElementById("opponent-field-card"),
    },

    actions:{
        button:document.getElementById("next-match"),
    },
};

const cards=[
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type:"Paper",
        src:`${pathTo}dragon.png`,
        beats:"Rock",
        beatenBy:"Scissors",
},
    {
        id:1,
        name:"Dark Magician",
        type:"Rock",
        src:`${pathTo}magician.png`,
        beats:"Scissors",
        beatenBy:"Paper",
    },
    {
        id:2,
        name:"Exodia the Forbidden One",
        type:"Scissors",
        src:`${pathTo}exodia.png`,
        beats:"Paper",
        beatenBy:"Rock",
    },
];

function matchup(playerCard,opponentCard) {
    if (playerCard.beats===opponentCard.type){
        state.score.player++;
        return "Won!";
    }
    if(playerCard.beatenBy===opponentCard.type) {
        state.score.opponent++;
        return "Lost!";
    }
    if(playerCard.type===opponentCard.type){
        return "Tie!";
    } 
}

async function getARandomCard(){
    const index=Math.floor(Math.random()*cards.length);
    return cards[index].id;
}

async function showCard(cardID){
    state.card.art.src=cards[cardID].src;
    state.card.name.innerText=cards[cardID].name;
    state.card.type.innerText=`Attribute: ${cards[cardID].type}`;
}

async function lockCards(){
let opponentCards = state.side.opponentBox;
    let opponentImgs = opponentCards.querySelectorAll("img");
    opponentImgs.forEach((img)=>img.remove());

let playerCards = state.side.playerBox;
    let playerImgs = playerCards.querySelectorAll("img");
playerImgs.forEach((img)=>img.remove());

}

async function duel(playerCardID,opponentCardID){
    let playerCard=cards[playerCardID];
    let opponentCard=cards[opponentCardID];
    let result=matchup(playerCard, opponentCard);
    return result;
}

async function newScore(){
state.score.scoreBox.innerText = `Won: ${state.score.player} | Lost: ${state.score.opponent}`
}

async function newDuel(){
    state.card.art.src="";
    state.actions.button.style.display="none";
    state.cardsOnField.player.style.display="none";
    state.cardsOnField.opponent.style.display="none";
    run();
}

async function drawButton(result){
    state.actions.button.innerText = result;
    state.actions.button.style.display = "block";
}

async function setCard(cardID){
    await lockCards();
    let opponentCardID=await getARandomCard();

    state.cardsOnField.player.style.display = 'block';
    state.cardsOnField.opponent.style.display = 'block';

    state.cardsOnField.player.src = cards[cardID].src;
    state.cardsOnField.opponent.src = cards[opponentCardID].src;

    let result=await duel(cardID,opponentCardID,state);

    await newScore();
    await drawButton(result);
}

async function getCardArt(cardID,theSide){
const cardArt=document.createElement("img");
cardArt.setAttribute("src","./src/assets/icons/card-back.png");
cardArt.setAttribute("height","100px");
cardArt.setAttribute("data-id",cardID);
cardArt.classList.add("card");
if(theSide===state.side.player){

    cardArt.addEventListener("mouseover",()=>{
        showCard(cardID);
    });

    cardArt.addEventListener("click",()=>{
    setCard(cardArt.getAttribute("data-id"));
    });
}

return cardArt;
}


async function draw(cards,side){
    for(let index=0;index<cards;index++){
        const randomCard=await getARandomCard();
        const cardBack=await getCardArt(randomCard,side);
        document.getElementById(side).appendChild(cardBack); 
}

}

function run(){
draw(5,state.side.player);
draw(5,state.side.opponent);
}
run();