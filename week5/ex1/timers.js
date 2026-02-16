// setTimeout + setInterval
let x = 0;
let y = 0;

const size = 50;
const step = 2;
const speed = 20; // ms per tick
const startDelay = 800;

let t = 0;
let drawTimer;

let bgColor = [20, 20, 20];
let currentColor = [255, 120, 120];

function setup () {
    createCanvas(500, 500);
    noStroke();

    // Start after a brief delay
    window.setTimeout( () => {
        drawTimer = window.setInterval(tick, speed);
    }, startDelay);
}

function drawBlock(px, py, rgb) {
    fill(rgb[0], rgb[1], rgb[2], 150);
    rect(px, py, size, size);
}

function tick() {
    t += 0.03;

    // Subtle animated brightness shift
    let pulse = 10 * sin(t);
    background(
    bgColor[0] + pulse,
    bgColor[1] + pulse,
    bgColor[2] + pulse
    );

    // Draw, then move downward
    drawBlock(x, y, currentColor);
    y += step;

    // New column when Y goes out of bounds
    if (y >= height) {
        y = 0;
        x += size;
    }

    // Stop when the blocks go beyond the width
    if (x >= width) {
        window.clearInterval(drawTimer);
        window.setTimeout( () => alert('done'), 100);
    }
}

// ANY key changes color
function keyTyped() {
    const code = key.charCodeAt(0); // ASCII value of the typed key
    
    // Block color (stronger)
    currentColor = [
        (code * 3) % 256,
        (code * 7) % 256,
        (code * 11) % 256
    ];

    // Background color (darker, softer version)
    bgColor = [
        (code * 2) % 80,
        (code * 4) % 80,
        (code * 6) % 80
     ];
}

