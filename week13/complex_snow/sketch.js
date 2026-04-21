let snowflakes = [];
let petalSlider;
let countSlider;
let speedSlider;

function setup() {
  let canvas = createCanvas(900, 600);
  canvas.parent("sketch-holder");

  petalSlider = createSlider(4, 10, 6, 1);
  petalSlider.parent("petal-holder");

  countSlider = createSlider(20, 220, 120, 1);
  countSlider.parent("count-holder");

  speedSlider = createSlider(0.5, 4, 1.5, 0.1);
  speedSlider.parent("speed-holder");

  createSnowflakes(countSlider.value());
}

function draw() {
  drawBackground();
  updateLabels();
  adjustSnowflakeCount();

  for (let flake of snowflakes) {
    flake.petals = petalSlider.value();
    flake.fallSpeed = speedSlider.value();
    flake.move();
    flake.display();
  }
}

function updateLabels() {
  document.getElementById("petal-value").textContent = petalSlider.value();
  document.getElementById("count-value").textContent = countSlider.value();
  document.getElementById("speed-value").textContent = speedSlider.value();
}

function createSnowflakes(total) {
  snowflakes = [];
  for (let i = 0; i < total; i++) {
    snowflakes.push(new Snowflake(random(width), random(height), random(4, 12)));
  }
}

function adjustSnowflakeCount() {
  let target = countSlider.value();

  while (snowflakes.length < target) {
    snowflakes.push(new Snowflake(random(width), random(-height, 0), random(4, 12)));
  }

  while (snowflakes.length > target) {
    snowflakes.pop();
  }
}

function drawBackground() {
  background("#122033");

  noStroke();

  fill(30, 55, 90, 80);
  ellipse(width * 0.25, height * 0.2, 260, 260);
  ellipse(width * 0.75, height * 0.18, 220, 220);

  fill("#eaf3fb");
  rect(0, height - 80, width, 80);

  fill("#dceaf7");
  ellipse(160, height - 70, 320, 120);
  ellipse(430, height - 60, 360, 140);
  ellipse(760, height - 70, 340, 130);
}

class Snowflake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.petals = 6;
    this.fallSpeed = 1.5;
    this.offset = random(TWO_PI);
    this.swingAmount = random(0.3, 1.2);
    this.rotation = random(TWO_PI);
  }

  move() {
    this.x += sin(frameCount * 0.03 + this.offset) * this.swingAmount;
    this.y += this.fallSpeed + this.size * 0.03;
    this.rotation += 0.01;

    if (this.y > height + 20) {
      this.y = random(-80, -20);
      this.x = random(width);
    }

    if (this.x < -20) {
      this.x = width + 20;
    }

    if (this.x > width + 20) {
      this.x = -20;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    stroke(255, 240);
    strokeWeight(1.4);
    noFill();

    for (let i = 0; i < this.petals; i++) {
      rotate(TWO_PI / this.petals);

      line(0, 0, 0, this.size);
      line(0, this.size * 0.45, -this.size * 0.18, this.size * 0.62);
      line(0, this.size * 0.45, this.size * 0.18, this.size * 0.62);
      line(0, this.size * 0.72, -this.size * 0.14, this.size * 0.84);
      line(0, this.size * 0.72, this.size * 0.14, this.size * 0.84);
    }

    pop();
  }
}
