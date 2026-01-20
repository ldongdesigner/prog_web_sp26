function setup() {
    createCanvas(480,120);
}
function draw() {
    background(204);
    point(240,60);
    line(20,50,420,110);
    quad(158,55, 199,14, 392,66, 351,107);
    triangle(347,54, 392,9, 392,66);
    triangle(158,55, 290,91, 290,112);
    rect(180,60, 220, 40);
    ellipse(278,-100, 400,400);
    ellipse(412,60, 18,18);
    arc(90,60,80,80,0,HALF_PI);
    arc(190,60,80,80,0,radians(270));
}




