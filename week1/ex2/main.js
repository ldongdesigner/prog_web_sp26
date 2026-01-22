
let canvasWidth = parseInt(
    prompt("Input a number between 400 and 600"), 10
);
let canvasHeight = parseInt(
    prompt("Input a number between 400 and 600"), 10
);

function setup() {
    createCanvas(canvasWidth,canvasHeight);
}

function draw() {
    background(230);
    stroke(40);
    strokeWeight(2);
    fill(58, 123, 213);
    circle(width/2, height/2, min(width,height)*0.4);
}



