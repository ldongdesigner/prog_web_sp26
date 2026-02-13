// Clicker counter (p5.js)

const rectSize = 75;
let rectX = 0;
let rectY = 0;
let speed = 0;

let clickCount = 0;
let bgColor; // Store background color

function setup() {
    createCanvas(500, 500);
    rectY = random(0, height * 0.25 - rectSize);
    speed = random(1, 3);
    bgColor = 155; // Initial background color
}

function draw() {
    background(bgColor);

    drawShape();

    rectX += speed;
    rectY += speed;

    if (rectX > width) {
        noLoop();
        textSize(24);
        fill(255); // White
        textStyle(BOLD);
        text('Your score was ' + clickCount + ' !', 150, 250);
    }
}

function mousePressed() {
    // Detec click inside square
    if (
        mouseX >= rectX && 
        mouseX <= rectX + rectSize && 
        mouseY >= rectY && 
        mouseY <= rectY + rectSize
    ) {
        clickCount++;

        // Change background to random color
        bgColor = color(random(255), random(255), random(255));
    }
}

function drawShape() {
    fill('purple');
    rect(rectX, rectY, rectSize, rectSize);
}

