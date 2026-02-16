let bubbles = [];
let totalBubbles = 50;

function setup() {
    createCanvas(600, 400);

    // Create 50 bubble instances
    for (let i = 0; i < totalBubbles; i++) {
        bubbles.push(new Bubble());
    }
}

function draw() {
    background(0);

    // Draw and move all bubbles
    for (let j = 0; j < bubbles.length; j++) {
        bubbles[j].move();
        bubbles[j].show();
    }

}

class Bubble {
    constructor() {
        // Position
        this.x = random(width);
        this.y = random(height);
        // Size
        this.size = random(20, 60);
        // Speed
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-2, 2);
        // Random color
        this.r = random(100, 255);
        this.g = random(100, 255);
        this.b = random(100, 255);
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Wrap around edges
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    show() {
        stroke(this.r, this.g, this.b, 150);
        strokeWeight(2);
        noFill();
        ellipse(this.x, this.y, this.size);
    }
}
