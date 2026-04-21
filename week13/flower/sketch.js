let flowers = [];

function setup() {
  let canvas = createCanvas(900, 600);
  canvas.parent("sketch-holder");

  // Create several flowers with different positions, sizes, colors, and petal counts
  flowers.push(new Flower(120, 500, 0.8, 8, "#ff6fae", "#ffd54f"));
  flowers.push(new Flower(240, 520, 1.0, 10, "#8e7dff", "#ffe082"));
  flowers.push(new Flower(360, 490, 1.2, 7, "#ff9966", "#fff176"));
  flowers.push(new Flower(500, 515, 0.9, 12, "#66c7ff", "#ffec80"));
  flowers.push(new Flower(650, 500, 1.1, 9, "#7fd37f", "#ffe082"));
  flowers.push(new Flower(780, 520, 0.85, 6, "#f28482", "#ffd54f"));
}

function draw() {
  drawBackground();

  // Show all flowers
  for (let flower of flowers) {
    flower.move();
    flower.display();
  }
}

function drawBackground() {
  background("#dff3ff");

  noStroke();
  fill("#b8e39c");
  rect(0, 430, width, 170);

  fill(255, 255, 255, 120);
  ellipse(140, 90, 120, 50);
  ellipse(180, 90, 80, 40);
  ellipse(580, 120, 140, 55);
  ellipse(630, 120, 90, 45);
}

class Flower {
  constructor(x, y, size, petalCount, petalColor, centerColor) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.size = size;
    this.petalCount = petalCount;
    this.petalColor = petalColor;
    this.centerColor = centerColor;

    // Each flower gets a slightly different timing
    this.offset = random(TWO_PI);
  }

  move() {
    // sin() makes the flower move up and down smoothly
    this.y = this.baseY + sin(frameCount * 0.03 + this.offset) * 8;

    // sin() also makes the flower gently rotate left and right
    this.angle = sin(frameCount * 0.02 + this.offset) * 0.25;
  }

  display() {
    push();
    translate(this.x, this.y);

    // Draw stem
    stroke("#3f8f4f");
    strokeWeight(4);
    line(0, 0, 0, -90 * this.size);

    // Move to top of stem
    translate(0, -90 * this.size);
    rotate(this.angle);

    // Draw petals
    noStroke();
    fill(this.petalColor);

    for (let i = 0; i < this.petalCount; i++) {
      push();
      rotate((TWO_PI / this.petalCount) * i);

      // Simple petal shape
      ellipse(0, -22 * this.size, 18 * this.size, 42 * this.size);
      pop();
    }

    // Draw center
    fill(this.centerColor);
    circle(0, 0, 24 * this.size);

    pop();
  }
}
