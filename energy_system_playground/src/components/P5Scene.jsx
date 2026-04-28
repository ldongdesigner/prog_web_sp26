import { useEffect, useRef } from "react";
import p5 from "p5";

function P5Scene({ sunlight, demand, batteryPercent, status }) {
  const hostRef = useRef(null);
  const valuesRef = useRef({ sunlight, demand, batteryPercent, status });

  useEffect(() => {
    valuesRef.current = { sunlight, demand, batteryPercent, status };
  }, [sunlight, demand, batteryPercent, status]);

  useEffect(() => {
    let sketchInstance;

    const sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(760, 420);
        canvas.parent(hostRef.current);
        p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        const { sunlight: sun, demand: load, batteryPercent: battery, status: mode } =
          valuesRef.current;

        drawSky(p, sun);
        drawGround(p);
        drawSun(p, sun);
        drawPanels(p, sun);
        drawHouse(p, load);
        drawBattery(p, battery, mode);
        drawWires(p, sun, battery, load);
        drawLabels(p, sun, battery, load, mode);
      };
    };

    sketchInstance = new p5(sketch);

    return () => {
      sketchInstance.remove();
    };
  }, []);

  return <div className="p5-host" ref={hostRef} />;
}

function drawSky(p, sunlight) {
  const topColor = p.lerpColor(
    p.color("#0f2747"),
    p.color("#8fd1ff"),
    sunlight / 100
  );
  const bottomColor = p.lerpColor(
    p.color("#10233e"),
    p.color("#d7efff"),
    sunlight / 100
  );

  for (let y = 0; y < p.height; y++) {
    const mix = y / p.height;
    const c = p.lerpColor(topColor, bottomColor, mix);
    p.stroke(c);
    p.line(0, y, p.width, y);
  }

  p.noStroke();
  p.fill(255, 255, 255, 60);
  p.ellipse(150, 90, 120, 46);
  p.ellipse(185, 88, 74, 38);
  p.ellipse(580, 74, 132, 50);
  p.ellipse(620, 74, 86, 40);
}

function drawGround(p) {
  p.noStroke();
  p.fill("#bfe3a8");
  p.rect(0, 310, p.width, 110);

  p.fill("#8fc47c");
  p.ellipse(130, 324, 240, 90);
  p.ellipse(380, 336, 320, 96);
  p.ellipse(650, 324, 230, 88);
}

function drawSun(p, sunlight) {
  const size = p.map(sunlight, 0, 100, 50, 92);
  const glow = p.map(sunlight, 0, 100, 30, 120);

  p.noStroke();
  p.fill(255, 215, 100, 60);
  p.circle(108, 88, size + glow);

  p.fill("#ffd45d");
  p.circle(108, 88, size);

  p.stroke("#ffd45d");
  p.strokeWeight(2);
  for (let angle = 0; angle < 360; angle += 30) {
    const x1 = 108 + p.cos(angle) * (size * 0.65);
    const y1 = 88 + p.sin(angle) * (size * 0.65);
    const x2 = 108 + p.cos(angle) * (size * 0.95);
    const y2 = 88 + p.sin(angle) * (size * 0.95);
    p.line(x1, y1, x2, y2);
  }
}

function drawPanels(p, sunlight) {
  const glowAlpha = p.map(sunlight, 0, 100, 50, 180);

  p.push();
  p.translate(210, 280);
  p.shearX(-22);

  p.stroke("#25435e");
  p.strokeWeight(3);
  p.fill("#1f4f84");
  p.rect(0, 0, 170, 54, 6);

  p.stroke(255, 255, 255, glowAlpha);
  for (let x = 20; x < 170; x += 28) {
    p.line(x, 0, x, 54);
  }
  for (let y = 12; y < 54; y += 14) {
    p.line(0, y, 170, y);
  }

  p.pop();

  p.stroke("#58636d");
  p.strokeWeight(6);
  p.line(250, 332, 270, 280);
  p.line(350, 332, 330, 280);
}

function drawHouse(p, demand) {
  const windowGlow = p.map(demand, 10, 100, 80, 255);

  p.noStroke();
  p.fill("#e9dac7");
  p.rect(520, 216, 120, 92, 8);

  p.fill("#9b5f47");
  p.triangle(506, 222, 580, 170, 654, 222);

  p.fill("#7b4f3d");
  p.rect(570, 256, 26, 52, 4);

  p.fill(255, 234, 154, windowGlow);
  p.rect(536, 238, 22, 22, 4);
  p.rect(604, 238, 22, 22, 4);

  p.stroke("#7b4f3d");
  p.strokeWeight(3);
  p.line(547, 238, 547, 260);
  p.line(536, 249, 558, 249);
  p.line(615, 238, 615, 260);
  p.line(604, 249, 626, 249);
}

function drawBattery(p, batteryPercent, status) {
  const fillHeight = p.map(batteryPercent, 0, 100, 0, 132);
  let batteryColor = "#ff8f70";

  if (status === "Balanced") batteryColor = "#f2cc60";
  if (status === "Surplus") batteryColor = "#5fd39a";

  p.noStroke();
  p.fill("#eef2f3");
  p.rect(56, 208, 64, 140, 14);
  p.rect(76, 194, 24, 16, 4);

  p.fill(batteryColor);
  p.rect(62, 342 - fillHeight, 52, fillHeight, 10);

  p.stroke("#506270");
  p.strokeWeight(3);
  p.noFill();
  p.rect(56, 208, 64, 140, 14);
  p.rect(76, 194, 24, 16, 4);
}

function drawWires(p, sunlight, batteryPercent, demand) {
  const flow = p.frameCount * 0.04;

  p.noFill();
  p.stroke("#485763");
  p.strokeWeight(3);
  p.bezier(380, 300, 430, 280, 470, 280, 520, 262);
  p.bezier(120, 278, 150, 260, 180, 246, 210, 230);

  const solarStrength = p.map(sunlight, 0, 100, 0, 1);
  const demandStrength = p.map(demand, 10, 100, 0.2, 1);
  const batteryStrength = p.map(batteryPercent, 0, 100, 0.1, 1);

  drawFlowDots(
    p,
    [
      [210, 230],
      [255, 248],
      [300, 260],
      [342, 278],
      [380, 300],
    ],
    "#8be0ff",
    solarStrength,
    flow
  );

  drawFlowDots(
    p,
    [
      [520, 262],
      [482, 274],
      [440, 290],
      [400, 308],
      [360, 330],
    ],
    "#ffd36b",
    demandStrength,
    flow + 70
  );

  drawFlowDots(
    p,
    [
      [120, 278],
      [150, 260],
      [180, 246],
      [210, 230],
    ],
    "#7ef0ba",
    batteryStrength,
    flow + 120
  );
}

function drawFlowDots(p, points, colorValue, strength, offset) {
  const visibleDots = Math.max(1, Math.round(strength * 4));

  for (let i = 0; i < visibleDots; i += 1) {
    const index = (Math.floor(offset) + i) % points.length;
    const point = points[index];
    p.noStroke();
    p.fill(colorValue);
    p.circle(point[0], point[1], 9);
  }
}

function drawLabels(p, sunlight, batteryPercent, demand, status) {
  p.noStroke();
  p.fill(18, 30, 42, 180);
  p.rect(474, 26, 240, 88, 14);

  p.fill("#f5fbff");
  p.textSize(16);
  p.textStyle(p.BOLD);
  p.text("Live System Status", 494, 52);

  p.textStyle(p.NORMAL);
  p.textSize(13);
  p.text(`Sunlight: ${sunlight}%`, 494, 76);
  p.text(`Battery: ${batteryPercent}%`, 494, 95);
  p.text(`Demand: ${demand}%`, 604, 76);
  p.text(`Mode: ${status}`, 604, 95);
}

export default P5Scene;
