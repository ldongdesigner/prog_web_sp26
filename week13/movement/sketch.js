let slider1;
let slider2;

let pos1 = 0;
let pos2 = 0;

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas-holder");

  angleMode(DEGREES);
  noFill();
  stroke(0);
  strokeWeight(2);

  slider1 = createSlider(0, 15, 3);
  slider1.parent("slider1-holder");

  slider2 = createSlider(0, 15, 9);
  slider2.parent("slider2-holder");
}

function draw() {
  clear();
  background(255);

  translate(width / 2, height / 2);

  let sinValue1 = sin(pos1);
  let sinValue2 = sin(pos2);

  let amplified1 = sinValue1 * 50;
  let amplified2 = sinValue2 * 50;

  for (let x = 0; x <= 360; x += 5) {
    curve(
      0, amplified2,
      50, amplified2,
      amplified1, 10,
      amplified1, 10
    );

    rotate(x);
  }

  pos1 = pos1 + slider1.value();
  pos2 = pos2 + slider2.value();
}