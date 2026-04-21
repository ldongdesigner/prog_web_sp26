let snowflakes = [];
let petalSlider;
let countSlider;
let speedSlider;

function setup() {
  let canvas = createCanvas(900, 600);
  canvas.parent("sketch-holder");

  // Create 3 sliders
  petalSlider = createSlider(4, 10, 6, 1);
  petalSlider.parent("petalSliderHolder");

  countSlider = createSlider(20, 150, 80, 1);
  countSlider.parent("countSliderHolder");

  speedSlider = createSlider(1, 5, 2, 1);
  speedSlider.parent("speedSliderHolder");

  // Start with some snowflakes
  makeSnowflakes(countSlider.value());
}

function draw() {
  drawScene();
  updateText();
  changeSnowflakeAmount();

  // Move and draw every snowflake
  for (let flake of snowflakes) {
    flake.petals = petalSlider.value();
    flake.speed = speedSlider.value();
    flake.move();
    flake.display();
  }
}

function drawScene() {
  background("#10243c");

  // Snowy ground
  noStroke();
  fill("#eaf4ff");
  rect(0, height - 90, width, 90);

  // Simple moon
  fill(255, 255, 255, 180);
  circle(760, 90, 70);
}

function updateText() {
  document.getElementById("petalValue").textContent = petalSlider.value();
  document.getElementById("countValue").textContent = countSlider.value();
  document.getElementById("speedValue").textContent = speedSlider.value();
}

function makeSnowflakes(total) {
  snowflakes = [];

  for (let i = 0; i < total; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(6, 14);

    snowflakes.push(new Snowflake(x, y, size));
  }
}

function changeSnowflakeAmount() {
  let target = countSlider.value();

  while (snowflakes.length < target) {
    let x = random(width);
    let y = random(-100, 0);
    let size = random(6, 14);

    snowflakes.push(new Snowflake(x, y, size));
  }

  while (snowflakes.length > target) {
    snowflakes.pop();
  }
}

class Snowflake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.petals = 6;
    this.speed = 2;

    // Random value so each snowflake moves a little differently
    this.offset = random(1000);
  }

  move() {
    // Fall downward
    this.y += this.speed;

    // Drift left and right using sin()
    this.x += sin(frameCount * 0.03 + this.offset) * 0.8;

    // Restart at the top after reaching the bottom
    if (this.y > height) {
      this.y = random(-50, 0);
      this.x = random(width);
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    stroke(255);
    strokeWeight(1.3);

    // Draw repeated lines to make a simple snowflake
    for (let i = 0; i < this.petals; i++) {
      rotate(TWO_PI / this.petals);
      line(0, 0, 0, this.size);
      line(0, this.size * 0.5, -this.size * 0.2, this.size * 0.7);
      line(0, this.size * 0.5, this.size * 0.2, this.size * 0.7);
    }

    pop();
  }
}
