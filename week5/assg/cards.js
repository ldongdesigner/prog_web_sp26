const DOWN = 'down';
const UP = 'up';

const GRID_COLS = 5;
const GRID_ROWS = 4;

const CARD_W = 140;
const CARD_H = 140;
const GAP = 10;

const START_X = 30;
const START_Y = 100;

let cards = [];
let cardback;

// Store each face
let faces = [];

const gameState = {
    totalPairs: 0,
    flippedCards: [],
    numMatched: 0,
    attempts: 0,
    waiting: false
};

// Use file names as the "source of truth" for matching.
// Two cards match if their filename starts with the same number + underscore.
const faceFiles = [
  "0_fuelCell.png",
  "0_hydrogen.png",
  "1_solarPanel.png",
  "1_sun.png",
  "2_powerTower.png",
  "2_windTurbine.png",
  "3_waterDrop.png",
  "3_waterFilter.png",
  "4_electricCar.png",
  "4_EVCharger.png",
  "5_energyBattery.png",
  "5_lightning.png",
  "6_energyGauge.png",
  "6_smartTower.png",
  "7_powerGrid.png",
  "7_solarRoof.png",
  "8_CO2.png",
  "8_leaf.png",
  "9_cycling.png",
  "9_planet.png",
];

function preload() {
    cardback = loadImage('images/Back.png');

    faces = faceFiles.map((fname) => {
        const id = fname.split("_")[0]; // "8_CO2.png" - > "8"
        return { id, img: loadImage("images/" + fname)};
    });
}

function setup() {
    createCanvas(800, 800);
    textAlign(LEFT, TOP);

    // totalPairs = number of unique ids
    const idSet = new Set(faces.map((f) => f.id));
    gameState.totalPairs = idSet.size;
    
    // Build deck: Exactly 2 images per id, so just shuffle all 20.
    const deck = shuffleArray([...faces]);

    // Create cards in a 5 x 4 grid
    cards = [];
    let idx = 0;

    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            const x = START_X + c * (CARD_W + GAP);
            const y = START_Y + r * (CARD_H + GAP);

            const faceObj = deck[idx++];
            cards.push(new Card(x, y, faceObj.id, faceObj.img));
        }
    }
}

function draw() {
    background(0);

    // Draw HUD/Score
    fill(255);
    textSize(28);
    text(`Attempts: ${gameState.attemps}`, 30, 20);
    text(`Matches: ${gameState.numMatched}/${gameState.totalPairs}`, 30, 55);

    // Draw cards
    for (let i = 0; i < cards.length; i++) {
        cards[i].show();
    }

    // Win state
    if (gameState.numMatched === gameState.totalPairs) {
        fill("yellow");
        textSize(64);
        textAlign(CENTER, CENTER);
        text("YOU WIN!", width / 2, height / 2);
        noLoop();
    }
}

function mousePressed() {
    if (gameState.waiting) return;

    // Find the first card hit
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        // Don't allow clicking matched cards or already-up cards
        if (card.isMatch || card.face === UP) continue;

        if (card.didHit(mouseX, mouseY)) {
            // Flip it
            card.face = UP;
            gameState.flippedCards.push(card);

            // Only allow 2 flipped at a time
            if (gameState.flippedCards.length === 2) {
                gameState.attempts++;
                checkForMatch();
            }

            // Stop after flipping one card per click
            break;
        }
    }
}

function checkForMatch() {
    const [a, b] = gameState.flippedCards;
    gameState.waiting = true;

    // Match by paired (the filename prefix number)
    const isMatch = a.pairId === b.pairId;

    if (isMatch) {
        a.isMatch = true;
        b.isMatch = true;
        gameState.numMatched++;

        // Reset selection immediately
        gameState.flippedCards.length = 0;
        gameState.waiting = false;
    } else {
        // Flip back after a short pause so user can see the two cards
        window.setTimeout(() => {
            a.face = DOWN;
            b.face = DOWN;
            gameState.flippedCards.length = 0;
            gameState.waiting = false;
        }, 900);
    }
}

// Card class
class Card {
    constructor(x, y, pairId, cardFaceImg) {
        this.x = x;
        this.y = y;
        this.width = CARD_W;
        this.height = CARD_H;

        this.pairId = pairId;   // e.g. "8"
        this.cardFaceImg = cardFaceImg;

        this.face = DOWN;
        this.isMatch = false;
    }

    show() {
        // Card base
        fill(80);
        rect(this.x, this.y, this.width, this.height, 10);

        if (this.face === UP || this.isMatch) {
            // Face image (fit inside the card)
            image(this.cardFaceImg, this.x, this.y, this.width, this.height);
        } else {
            image(cardback, this.x, this.y, this.width, this.height);
        }
    }

    didHit(mx, my) {
        return (
            mx >= this.x &&
            mx <= this.x + this.width &&
            my >= this.y &&
            my <= this.y + this.height
        );
    }
}

// Shuffle
function shuffleArray(array) {
    let counter = array.length;
    while (counter > 0) {
        const idx = Math.floor(Math.random() * counter);
        counter--;
        const temp = array[counter];
        array[counter] = array[idx];
        array[idx] = temp;
    }
    return array;
}

