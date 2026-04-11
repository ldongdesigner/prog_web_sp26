// Store p5 instances so buttons can control each sketch
window.simpleSketches = window.simpleSketches || {};

/* SKETCH 1 */
new p5((p) => {
  let drops = []; // each drop is a short line segment

  p.setup = function () {
    const canvas = p.createCanvas(360, 220);
    canvas.parent("holder1");

    // Create many line segments (water streaks)
    for (let i = 0; i < 120; i++) {
      drops.push({
        x: p.random(p.width),           // horizontal position
        y: p.random(70, 170),           // stay within the creek band
        speed: p.random(1, 2.5),        // how fast it moves right
        len: p.random(8, 18)            // length of the line
      });
    }

    p.noLoop(); // start paused
    window.simpleSketches["holder1"] = p;
  };

  p.draw = function () {
    drawBackground();

    // Draw and update each water line
    p.stroke(190, 230, 245, 120);
    for (let d of drops) {
      p.line(d.x, d.y, d.x + d.len, d.y); // short horizontal line

      // Move to the right
      d.x += d.speed;

      // Add slight vertical wiggle (wave feeling)
      d.y += p.sin(d.x * 0.03) * 0.3;

      // Reset when off screen
      if (d.x > p.width) {
        d.x = 0;
        d.y = p.random(70, 170);
      }
    }
  };

  function drawBackground() {
    p.background(210, 235, 242);

    // simple banks (top & bottom)
    p.noStroke();
    p.fill(90, 120, 70);
    p.rect(0, 0, p.width, 55);
    p.rect(0, 175, p.width, 45);

    // water area
    p.fill(120, 170, 200);
    p.rect(0, 55, p.width, 120);

    // light highlights
    p.stroke(255, 255, 255, 40);
    for (let y = 70; y < 170; y += 15) {
      p.line(0, y, p.width, y + 5);
    }
  }
}, "holder1");


/* SKETCH 2 */
new p5((p) => {
  let water = [];
  let leaves = [];

  p.setup = function () {
    const canvas = p.createCanvas(360, 220);
    canvas.parent("holder2");

    // Water lines (slower than sketch 1)
    for (let i = 0; i < 90; i++) {
      water.push({
        x: p.random(p.width),
        y: p.random(70, 170),
        speed: p.random(0.8, 2),
        len: p.random(8, 16)
      });
    }

    // Leaves (small ellipses that drift)
    for (let i = 0; i < 8; i++) {
      leaves.push({
        x: p.random(p.width),
        y: p.random(85, 155),
        speed: p.random(0.5, 1.2),
        size: p.random(8, 14),
        angle: p.random(p.TWO_PI)
      });
    }

    p.noLoop();
    window.simpleSketches["holder2"] = p;
  };

  p.draw = function () {
    drawBackground();

    // Draw water
    p.stroke(200, 238, 248, 110);
    for (let w of water) {
      p.line(w.x, w.y, w.x + w.len, w.y);
      w.x += w.speed;
      w.y += p.sin(w.x * 0.02) * 0.2;

      if (w.x > p.width) {
        w.x = 0;
        w.y = p.random(70, 170);
      }
    }

    // Draw leaves
    p.noStroke();
    for (let leaf of leaves) {
      p.push();
      p.translate(leaf.x, leaf.y);
      p.rotate(leaf.angle);
      p.fill(170, 110, 50);
      p.ellipse(0, 0, leaf.size * 1.3, leaf.size);
      p.pop();

      // move leaf
      leaf.x += leaf.speed;
      leaf.y += p.sin(p.frameCount * 0.05 + leaf.x * 0.03) * 0.3;
      leaf.angle += 0.01;

      if (leaf.x > p.width + 10) {
        leaf.x = -10;
        leaf.y = p.random(85, 155);
      }
    }
  };

  function drawBackground() {
    p.background(214, 238, 245);

    p.noStroke();
    p.fill(85, 120, 70);
    p.rect(0, 0, p.width, 55);
    p.rect(0, 175, p.width, 45);

    p.fill(110, 168, 198);
    p.rect(0, 55, p.width, 120);
  }
}, "holder2");


/* SKETCH 3 */
new p5((p) => {
  let water = [];
  let rain = [];

  p.setup = function () {
    const canvas = p.createCanvas(360, 220);
    canvas.parent("holder3");

    // Faster water lines
    for (let i = 0; i < 140; i++) {
      water.push({
        x: p.random(p.width),
        y: p.random(70, 170),
        speed: p.random(1.5, 3.5),
        len: p.random(10, 20)
      });
    }

    // Rain drops (diagonal lines)
    for (let i = 0; i < 60; i++) {
      rain.push({
        x: p.random(p.width),
        y: p.random(-220, 0),
        speed: p.random(4, 8),
        len: p.random(8, 14)
      });
    }

    p.noLoop();
    window.simpleSketches["holder3"] = p;
  };

  p.draw = function () {
    drawBackground();

    // Fast water
    p.stroke(210, 245, 255, 120);
    for (let w of water) {
      p.line(w.x, w.y, w.x + w.len, w.y);
      w.x += w.speed;
      w.y += p.sin(w.x * 0.05) * 0.4;

      if (w.x > p.width) {
        w.x = 0;
        w.y = p.random(70, 170);
      }
    }

    // Rain
    p.stroke(220, 240, 255, 120);
    for (let r of rain) {
      p.line(r.x, r.y, r.x - 3, r.y + r.len);
      r.y += r.speed;
      r.x -= 0.5;

      if (r.y > p.height) {
        r.y = p.random(-100, 0);
        r.x = p.random(p.width);
      }
    }
  };

  function drawBackground() {
    p.background(195, 223, 235);

    p.noStroke();
    p.fill(75, 105, 65);
    p.rect(0, 0, p.width, 55);
    p.rect(0, 175, p.width, 45);

    p.fill(95, 150, 185);
    p.rect(0, 55, p.width, 120);
  }
}, "holder3");
