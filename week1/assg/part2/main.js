let grid = undefined;
let stroke1 = prompt("Enter a lowercase color for the bigSnowman's coat", "green");
let stroke2 = prompt("Enter a lowercase color for the smallSnowman's coat", "red");
function setup() {
    createCanvas(1000, 800);
    background("#ccc");
    angleMode(DEGREES);
    grid = loadImage("images/100px_grid.png");
}

function draw() {
    background(grid);
    noStroke();
    fill("#87CEEB")
    rect(0,0,1000,600);
    fill("#fafafa")
    rect(0,600,1000,600);

    // snowman legs
    fill("#f1f1f1");
    strokeWeight(20);
    stroke(stroke1);
    // left leg
    ellipse(350,650,200);
    // right leg
    ellipse(650,650,200);
    // body
    ellipse(500,450,350,400);
    // head
    ellipse(500,200,200);
    // buttons
    strokeWeight(50);
    point(500,360);
    point(500,460);
    point(500,560);

    // hat brim
    stroke(100,100,250);
    strokeWeight(40);
    line(400,120,600,120);
    // hat body
    quad(400,50, 600,50, 550,120, 450,120);
    // eyes
    stroke(0);
    strokeWeight(50);
    point(425,200);
    point(575,200);
    // mouth
    noFill();
    strokeWeight(10);
    arc(500,220,80,80,30,150);

    // second snowman
    fill("#f1f1f1");
    strokeWeight(15);
    stroke(stroke2);
    // bottom
    ellipse(880,650,200);
    // body
    ellipse(880,500,150);
    // head
    ellipse(880,380,120);
    // buttons
    strokeWeight(20);
    point(880,470);
    point(880,500);
    point(880,530);
    // eyes
    stroke(0);
    strokeWeight(30);
    point(850,375);
    point(905,375);
    // mouth
    noFill();
    strokeWeight(10);
    arc(880,390,60,60,30,150);

}


