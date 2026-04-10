function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  background(20);

  let spacing = 50;

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {

      let size = 20 + 15 * sin((x + frameCount) * 0.05 + y * 0.05);

      fill(100 + x * 0.2, 150 + y * 0.2, 255);
      ellipse(x, y, size, size);
    }
  }
}