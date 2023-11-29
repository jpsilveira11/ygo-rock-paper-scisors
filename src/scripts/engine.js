const state={
    score:{
        playerScore:0,
        opponentScore:0,
        scoreBox:document.getElementById('score'),
    },
    cardSprites:{
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
thePlayer:"player-cards",

}


function run(){}
run();