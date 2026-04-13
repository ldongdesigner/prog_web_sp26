let waterSound;
let childrenSound;

// button positions and sizes
let btn1 = { x: 150, y: 300, w: 220, h: 50 };
let btn2 = { x: 430, y: 300, w: 220, h: 50 };

function preload() {
  waterSound = loadSound("water_birds.mp3");
  childrenSound = loadSound("children_giggling.mp3");
}

function setup() {
  let canvas = createCanvas(800, 420);
  canvas.parent("sketch-holder");
  textAlign(CENTER, CENTER);
}

function draw() {
  background("#d7ebf8");

  // main panel
  fill("#c6def1");
  stroke("#6f8aa0");
  strokeWeight(3);
  rect(40, 40, 720, 340, 20);

  // title inside panel
  noStroke();
  fill("#111");
  textSize(34);
  text("Nature and Human Harmony", width / 2, 110);

  textSize(18);
  text("Select a sound to begin", width / 2, 165);

  // labels
  textSize(20);
  text("Nature's Voice", 260, 250);
  text("Human Joy", 540, 250);

  // draw buttons
  drawButton(btn1, "Play Nature's Voice");
  drawButton(btn2, "Play Human Joy");
}

function drawButton(button, label) {
  if (mouseOverButton(button)) {
    fill("#4f8fb8");
  } else {
    fill("#6ea8c7");
  }

  stroke("#4d7c96");
  strokeWeight(2);
  rect(button.x, button.y, button.w, button.h, 12);

  noStroke();
  fill("white");
  textSize(16);
  text(label, button.x + button.w / 2, button.y + button.h / 2);
}

function mouseOverButton(button) {
  return (
    mouseX > button.x &&
    mouseX < button.x + button.w &&
    mouseY > button.y &&
    mouseY < button.y + button.h
  );
}

function mousePressed() {
  userStartAudio();

  if (mouseOverButton(btn1)) {
    waterSound.play();
  }

  if (mouseOverButton(btn2)) {
    childrenSound.play();
  }
}