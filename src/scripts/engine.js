const state={
    score:{
        playerScore:0,
        opponentScore:0,
        scoreBox:document.getElementById('score'),
    },
    card:{
        art:document.getElementById("card-art"),
        name:document.getElementById("card-name"),
        type:document.getElementById("card-type"),
    },
    cardsOnField:{
        playerCard:document.getElementById("player-field-card"),
        opponentCard:document.getElementById("opponent-field-card"),
    },
    actions:{
        button:document.getElementById("next-match"),
    },
};

const pathTo="./src/assets/icons/";
// const matchup={}
const cards=[
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type:"Paper",
        src:`${pathTo}dragon.png`,
        beats:"Rock",
        beatenBy:"Scisors",
},
    {
        id:1,
        name:"Dark Magician",
        type:"Rock",
        src:`${pathTo}magician.png`,
        beats:"Scisors",
        beatenBy:"Paper",
    },
    {
        id:2,
        name:"Exodia the Forbidden One",
        type:"Scisors",
        src:`${pathTo}exodia.png`,
        beats:"Paper",
        BeatenBy:"Rock",
    }
]

const players={
player:"player-field-card",
opponent:"opponent-field-card",

}
const side={
player:"player-cards",
opponent:"opponent-cards",
};


async function getARandomCard(){
    const index=Math.floor(Math.random()*cards.length);
    return cards[index].id;
}

async function showCard(cardID){
    state.card.art.src=cards[cardID].src;
    state.card.name.innerText=cards[cardID].name;
    state.card.type.innerText=`Attribute: ${cards[cardID].type}`;
console.log(state.card.art.src);
console.log(state.card.name.innerText);
console.log(state.card.type.innerText);
}

async function getCardArt(cardID,theSide){
const cardArt=document.createElement("img");
cardArt.setAttribute("src","./src/assets/icons/card-back.png");
cardArt.setAttribute("height","100px");
cardArt.setAttribute("data-id",cardID);
cardArt.classList.add("card");
if(theSide===side.player){

    cardArt.addEventListener("mouseover",()=>{
        showCard(cardID);
    });

    cardArt.addEventListener("click",()=>{
    //setCard(cardArt.getAttribute("data-id"));
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
draw(5,side.player);
draw(5,side.opponent);
}
run();