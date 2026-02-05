const primaryColors = ['#1B5E20', '#2E7D32', '#E0F2F1'];
const secondaryColors = ['#26A69A', '#42A5F5', '#FFCA28', '#66BB6A', '#80DEEA'];
const tertiaryColors = ['#004D40', '#0277BD', '#558B2F', '#F9A825', '#5D4037',  '#00838F', '#37474F'];
let primaryColor, secondaryColor, tertiaryColor;

function setup() {
    createCanvas(200, 200);
}

function drawTile() {
    translate(0, 0);

    // Pick one background color per run
    primaryColor = primaryColors[int(random(primaryColors.length))];
    noStroke();
    fill(primaryColor);
    rect(0, 0, 200, 200);
    

    for (let boxX = 20; boxX <= 180; boxX += 20) {
        for (let boxY = 20; boxY <= 180; boxY +=20) {
            
            // One line per grid point
            tertiaryColor = tertiaryColors[int(random(tertiaryColors.length))];
            stroke(tertiaryColor);
            strokeWeight(1);
            line (boxX, boxY, 140, 60);

            // Draw concentric circles per grid point
            for (let boxSize = 2; boxSize <= 15; boxSize +=4) {
                secondaryColor = secondaryColors[int(random(secondaryColors.length))];
                noFill();
                stroke(secondaryColor);
                strokeWeight(1);
                circle(boxX, boxY, boxSize);
            }
            
        }
    }
}

function draw() {
    drawTile();
    noLoop();
}

