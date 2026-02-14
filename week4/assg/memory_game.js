let gap = 20;
let boxSize = 140;
let margin = 40;
let headerH = 120;

let cols = 5;
let rows = 4;

let boxes = [];

function setup() {
    createCanvas(860, 820);
    let startingX = margin;
    let startingY = margin + headerH;

    for (let rowVar = 0; rowVar < rows; rowVar++) { // Rows
        for (let colVar = 0; colVar < cols; colVar++) { // Columns
            boxes.push({
                x: startingX + colVar * (boxSize + gap),
                y: startingY + rowVar * (boxSize + gap),
            });
    //         const newBox = {
    //             x: startingX,
    //             y: startingY,
    //         };
    //         boxes.push(newBox);
    //         startingX += (boxSize + gap);
    //     }
    // startingY += (boxSize + gap);
    // startingX = margin;
        }
    }
}


function draw() {
    background('grey');
    for (let boxVar = 0; boxVar < boxes.length; boxVar++) {
        rect(boxes[boxVar].x, boxes[boxVar].y, boxSize, boxSize);
    }
}

function mousePressed() {
    for (let i = 0; i < boxes.length; i++) {
        if (
            mouseX > boxes[i].x &&
            mouseX < (boxes[i].x + boxSize) &&
            mouseY > boxes[i].y &&
            mouseY < (boxes[i].y + boxSize)
        ) {
            console.log('You hit box' + i);
        }
    }
}


