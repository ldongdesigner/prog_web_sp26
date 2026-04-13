let natureSound;
let humanSound;

let natureSlider;
let humanSlider;

let btnNature = { x: 120, y: 360, w: 150, h: 48, label: "Nature" };
let btnHuman = { x: 325, y: 360, w: 150, h: 48, label: "Humanity" };
let btnBoth = { x: 530, y: 360, w: 150, h: 48, label: "Both" };
let btnStop = { x: 325, y: 425, w: 150, h: 44, label: "Stop" };

function preload() {
  natureSound = loadSound("water_birds.mp3");
  humanSound = loadSound("children_giggling.mp3");
}

function setup() {
  let canvas = createCanvas(800, 620);
  canvas.parent("sketch-holder");
  textAlign(CENTER, CENTER);

  let natureControls = createDiv("");
  natureControls.id("nature-controls");
  natureControls.class("slider-inside");
  natureControls.parent("sketch-holder");

  let natureLabel = createElement("label", "Nature Volume");
  natureLabel.parent(natureControls);

  natureSlider = createSlider(0, 1, 0.7, 0.01);
  natureSlider.parent(natureControls);

  let humanControls = createDiv("");
  humanControls.id("human-controls");
  humanControls.class("slider-inside");
  humanControls.parent("sketch-holder");

  let humanLabel = createElement("label", "Humanity Volume");
  humanLabel.parent(humanControls);

  humanSlider = createSlider(0, 1, 0.7, 0.01);
  humanSlider.parent(humanControls);
}

function draw() {
  background(215, 234, 245);

  fill(197, 223, 238);
  noStroke();
  rect(20, 20, 760, 580, 22);

  fill(188, 214, 231);
  stroke(105, 140, 160);
  strokeWeight(3);
  rect(60, 70, 680, 470, 22);

  natureSound.setVolume(natureSlider.value());
  humanSound.setVolume(humanSlider.value());

  drawTitleArea();
  drawVisuals();
  drawButtons();
}

function drawTitleArea() {
  noStroke();
  fill(30, 40, 50);
  textSize(30);
  text("Nature and Humanity Harmonize", width / 2, 135);

  textSize(17);
  fill(60, 75, 85);
  text("Select a sound to begin", width / 2, 180);
}

function drawVisuals() {
  if (natureSound.isPlaying()) {
    fill(104, 180, 140, 220);
    ellipse(260, 270, 150 + 15 * sin(frameCount * 0.12), 150 + 15 * sin(frameCount * 0.12));
  } else {
    fill(130, 190, 160, 170);
    ellipse(260, 270, 130, 130);
  }

  if (humanSound.isPlaying()) {
    fill(255, 183, 120, 220);
    ellipse(540, 270, 150 + 15 * sin(frameCount * 0.15), 150 + 15 * sin(frameCount * 0.15));
  } else {
    fill(245, 190, 140, 170);
    ellipse(540, 270, 130, 130);
  }

  if (natureSound.isPlaying() && humanSound.isPlaying()) {
    fill(235, 210, 140, 180);
    ellipse(400, 270, 110 + 18 * sin(frameCount * 0.18), 110 + 18 * sin(frameCount * 0.18));
  }

  fill(255);
  textSize(20);
  text("Nature’s Voice", 260, 270);
  text("Human Joy", 540, 270);

  fill(60, 75, 85);
  textSize(14);
  text("Volume: " + nf(natureSlider.value(), 1, 2), 260, 330);
  text("Volume: " + nf(humanSlider.value(), 1, 2), 540, 330);
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

function isMouseOver(btn) {
  return mouseX > btn.x &&
         mouseX < btn.x + btn.w &&
         mouseY > btn.y &&
         mouseY < btn.y + btn.h;
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
    stopAllSounds();
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
    stopAllSounds();
  }
}

function playNature() {
  if (!natureSound.isPlaying()) {
    natureSound.play();
  }
}

function playHuman() {
  if (!humanSound.isPlaying()) {
    humanSound.play();
  }
}

function playBoth() {
  if (!natureSound.isPlaying()) {
    natureSound.play();
  }
  if (!humanSound.isPlaying()) {
    humanSound.play();
  }
}

function stopAllSounds() {
  if (natureSound.isPlaying()) {
    natureSound.stop();
  }
  if (humanSound.isPlaying()) {
    humanSound.stop();
  }
}