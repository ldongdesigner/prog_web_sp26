let natureSound;
let humanSound;

let natureSlider;
let humanSlider;

let currentMode = "Stopped";

const btnNature = { x: 120, y: 360, w: 150, h: 50, label: "Nature" };
const btnHuman = { x: 325, y: 360, w: 150, h: 50, label: "Humanity" };
const btnBoth = { x: 530, y: 360, w: 150, h: 50, label: "Both" };
const btnStop = { x: 325, y: 430, w: 150, h: 45, label: "Stop" };

function preload() {
  natureSound = loadSound("water_birds.mp3");
  humanSound = loadSound("children_giggling.mp3");
}

function setup() {
  let canvas = createCanvas(800, 620);
  canvas.parent("sketch-holder");
  textAlign(CENTER, CENTER);

  natureSlider = createSlider(0, 1, 0.7, 0.01);
  natureSlider.parent("sketch-holder");
  natureSlider.position(150, 515);

  humanSlider = createSlider(0, 1, 0.7, 0.01);
  humanSlider.parent("sketch-holder");
  humanSlider.position(500, 515);
}

function draw() {
  background(215, 234, 245);

  fill(197, 223, 238);
  noStroke();
  rect(20, 20, 760, 580, 22);

  fill(188, 214, 231);
  stroke(105, 140, 160);
  strokeWeight(3);
  rect(60, 70, 680, 500, 22);

  natureSound.setVolume(natureSlider.value());
  humanSound.setVolume(humanSlider.value());

  drawTitle();
  drawCircles();
  drawButtons();
  drawLabels();
}

function drawTitle() {
  noStroke();
  fill(30, 40, 50);
  textSize(30);
  text("Nature and Humanity Harmonize", width / 2, 135);

  textSize(17);
  fill(60, 75, 85);
  text("Current Mode: " + currentMode, width / 2, 180);
}

function drawCircles() {
  let natureSize = 130;
  let humanSize = 130;

  if (natureSound.isPlaying()) {
    natureSize = 150 + 15 * sin(frameCount * 0.12);
  }

  if (humanSound.isPlaying()) {
    humanSize = 150 + 15 * sin(frameCount * 0.15);
  }

  noStroke();

  fill(104, 180, 140, 220);
  ellipse(260, 270, natureSize, natureSize);

  fill(255, 183, 120, 220);
  ellipse(540, 270, humanSize, humanSize);

  if (natureSound.isPlaying() && humanSound.isPlaying()) {
    fill(235, 210, 140, 180);
    let middleSize = 110 + 18 * sin(frameCount * 0.18);
    ellipse(400, 270, middleSize, middleSize);

    fill(50);
    textSize(16);
    text("Harmony", 400, 315);
  }

  fill(255);
  textSize(20);
  text("Nature", 260, 270);
  text("Humanity", 540, 270);
}

function drawButtons() {
  drawButton(btnNature);
  drawButton(btnHuman);
  drawButton(btnBoth);
  drawButton(btnStop);
}

function drawButton(btn) {
  if (isMouseOver(btn)) {
    fill(79, 143, 184);
  } else {
    fill(110, 168, 199);
  }

  stroke(80, 120, 145);
  strokeWeight(2);
  rect(btn.x, btn.y, btn.w, btn.h, 12);

  noStroke();
  fill(255);
  textSize(18);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function drawLabels() {
 fill(60, 75, 85);
  textSize(15);
  text("Nature Volume", 225, 505);
  text("Humanity Volume", 575, 505);

  textSize(14);
  textStyle(BOLD);
  text("Volume: " + nf(natureSlider.value(), 1, 2), 260, 330);
  text("Volume: " + nf(humanSlider.value(), 1, 2), 540, 330);
}

function isMouseOver(btn) {
  return (
    mouseX > btn.x &&
    mouseX < btn.x + btn.w &&
    mouseY > btn.y &&
    mouseY < btn.y + btn.h
  );
}

function mousePressed() {
  userStartAudio();

  if (isMouseOver(btnNature)) {
    playNature();
  } else if (isMouseOver(btnHuman)) {
    playHuman();
  } else if (isMouseOver(btnBoth)) {
    playBoth();
  } else if (isMouseOver(btnStop)) {
    stopSounds();
  }
}

function keyPressed() {
  userStartAudio();

  if (key === "n" || key === "N") {
    playNature();
  } else if (key === "h" || key === "H") {
    playHuman();
  } else if (key === "b" || key === "B") {
    playBoth();
  } else if (key === "s" || key === "S") {
    stopSounds();
  }
}

function playNature() {
  if (!natureSound.isPlaying()) {
    natureSound.play();
  }
  currentMode = "Nature";
}

function playHuman() {
  if (!humanSound.isPlaying()) {
    humanSound.play();
  }
  currentMode = "Humanity";
}

function playBoth() {
  if (!natureSound.isPlaying()) {
    natureSound.play();
  }
  if (!humanSound.isPlaying()) {
    humanSound.play();
  }
  currentMode = "Both";
}

function stopSounds() {
  if (natureSound.isPlaying()) {
    natureSound.stop();
  }
  if (humanSound.isPlaying()) {
    humanSound.stop();
  }
  currentMode = "Stopped";
}