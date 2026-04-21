let flowers = [];
let breezeOffset = 0;

function setup() {
  const canvas = createCanvas(900, 600);
  canvas.parent("sketch-holder");
  angleMode(RADIANS);

  // Create flowers across the field with varied properties.
  const palette = [
    ["#ff7aa2", "#ffd166", "#ff4d6d"],
    ["#a463f2", "#ffd166", "#7b2cbf"],
    ["#5ec2ff", "#ffe66d", "#2486c5"],
    ["#ff9966", "#fff08a", "#ff6b35"],
    ["#7bd389", "#fff3a3", "#3fa34d"],
    ["#f28482", "#ffe08a", "#d95d39"]
  ];

  for (let i = 0; i < 14; i++) {
    const x = map(i, 0, 13, 70, width - 70) + random(-18, 18);
    const y = random(height * 0.68, height * 0.9);
    const scaleValue = random(0.7, 1.4);
    const petalCount = floor(random(6, 13));
    const petalLength = random(26, 62);
    const petalWidth = random(12, 28);
    const swaySpeed = random(0.01, 0.03);
    const swayAmount = random(0.08, 0.24);
    const bobAmount = random(2, 8);
    const phase = random(TWO_PI);
    const colors = random(palette);

    flowers.push(
      new Flower(
        x,
        y,
        scaleValue,
        petalCount,
        petalLength,
        petalWidth,
        colors[0],
        colors[1],
        colors[2],
        swaySpeed,
        swayAmount,
        bobAmount,
        phase
      )
    );
  }
}

function draw() {
  drawBackground();

  // Breeze changes gradually over time using sine.
  breezeOffset += 0.01;
  const breeze = sin(breezeOffset) * 0.08;

  for (const flower of flowers) {
    flower.update(breeze);
    flower.display();
  }
}

function drawBackground() {
  // Sky
  for (let y = 0; y < height; y++) {
    const blend = map(y, 0, height, 0, 1);
    const c = lerpColor(color("#dff3ff"), color("#fdf7dd"), blend);
    stroke(c);
    line(0, y, width, y);
  }

  noStroke();

  // Distant soft hills
  fill(166, 214, 169, 140);
  ellipse(width * 0.2, height * 0.9, 420, 170);
  ellipse(width * 0.52, height * 0.88, 520, 180);
  ellipse(width * 0.84, height * 0.91, 390, 160);

  // Ground
  fill("#bde5a8");
  rect(0, height * 0.74, width, height * 0.26);

  // Small moving light dots for atmosphere
  for (let i = 0; i < 14; i++) {
    const px = (frameCount * 0.35 + i * 70) % (width + 80) - 40;
    const py = 80 + 18 * sin(frameCount * 0.02 + i);
    fill(255, 255, 255, 80);
    circle(px, py, 5 + 2 * sin(frameCount * 0.03 + i));
  }
}

class Flower {
  constructor(
    x,
    y,
    scaleValue,
    petalCount,
    petalLength,
    petalWidth,
    petalColor,
    centerColor,
    accentColor,
    swaySpeed,
    swayAmount,
    bobAmount,
    phase
  ) {
    this.x = x;
    this.baseY = y;
    this.y = y;
    this.scaleValue = scaleValue;
    this.petalCount = petalCount;
    this.petalLength = petalLength;
    this.petalWidth = petalWidth;
    this.petalColor = petalColor;
    this.centerColor = centerColor;
    this.accentColor = accentColor;
    this.swaySpeed = swaySpeed;
    this.swayAmount = swayAmount;
    this.bobAmount = bobAmount;
    this.phase = phase;
    this.stemHeight = random(90, 165) * scaleValue;
    this.leafSize = random(22, 38) * scaleValue;
    this.rotation = 0;
  }

  update(breeze) {
    const t = frameCount * this.swaySpeed + this.phase;
    this.rotation = sin(t) * this.swayAmount + breeze;
    this.y = this.baseY + sin(t * 1.8) * this.bobAmount;
  }

  display() {
    push();
    translate(this.x, this.y);

    // Stem and leaves move with the flower head to feel organic.
    this.drawStem();
    translate(0, -this.stemHeight);
    rotate(this.rotation);
    this.drawPetals();
    this.drawCenter();
    pop();
  }

  drawStem() {
    stroke("#3d7d3f");
    strokeWeight(5 * this.scaleValue);
    noFill();

    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(10 * sin(this.rotation * 4), -this.stemHeight * 0.3);
    curveVertex(16 * sin(this.rotation * 5), -this.stemHeight * 0.7);
    curveVertex(0, -this.stemHeight);
    curveVertex(0, -this.stemHeight);
    endShape();

    noStroke();
    fill(77, 153, 82, 220);

    push();
    translate(5 * sin(this.rotation * 6), -this.stemHeight * 0.45);
    rotate(-0.8 + this.rotation);
    ellipse(0, 0, this.leafSize * 1.3, this.leafSize * 0.65);
    pop();

    push();
    translate(-4 * sin(this.rotation * 5), -this.stemHeight * 0.62);
    rotate(0.9 + this.rotation);
    ellipse(0, 0, this.leafSize * 1.1, this.leafSize * 0.55);
    pop();
  }

  drawPetals() {
    noStroke();

    for (let i = 0; i < this.petalCount; i++) {
      push();
      rotate((TWO_PI / this.petalCount) * i);

      const waveStretch = 1 + 0.18 * sin(frameCount * 0.05 + i + this.phase);
      const localLength = this.petalLength * waveStretch;

      fill(this.petalColor);
      beginShape();
      vertex(0, 0);
      bezierVertex(
        this.petalWidth * 0.9,
        -localLength * 0.15,
        this.petalWidth * 0.75,
        -localLength * 0.75,
        0,
        -localLength
      );
      bezierVertex(
        -this.petalWidth * 0.75,
        -localLength * 0.75,
        -this.petalWidth * 0.9,
        -localLength * 0.15,
        0,
        0
      );
      endShape(CLOSE);

      fill(this.accentColor + "22");
      ellipse(0, -localLength * 0.58, this.petalWidth * 0.55, localLength * 0.32);

      pop();
    }
  }

  drawCenter() {
    noStroke();
    fill(this.centerColor);
    circle(0, 0, 28 * this.scaleValue);

    fill(255, 220);
    for (let i = 0; i < 8; i++) {
      const a = (TWO_PI / 8) * i + frameCount * 0.01;
      const r = 7 * this.scaleValue;
      circle(cos(a) * r, sin(a) * r, 3.2 * this.scaleValue);
    }

    fill(255, 160);
    circle(-4 * this.scaleValue, -4 * this.scaleValue, 8 * this.scaleValue);
  }
}

function windowResized() {
  // Keep the designed proportions stable for the assignment.
}
