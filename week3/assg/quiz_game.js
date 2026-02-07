let submitAnswerButton;
let restartButton;
let questionInput;
let currentQuestion;
let response = '';
let responseColor = 'green';
let heading;

let shapes = [];

let misses = 0;
let MAX_MISSES = 5;
let gameOver = false;

let statements = [
    { question: 'What gas do plants absorb from the air to make food?', answer: 'Carbon dioxide' },
    { question: 'What process do plants use to make their own food using sunlight?', answer: 'Photosynthesis' },
    { question: 'What is the main source of energy for Earth?', answer: 'Sun' },
    { question: 'What natural resource is needed for all living things to survive?', answer: 'Water' },
    { question: 'What do we call trash that can be reused to make new products?', answer: 'Recyclables' },
    { question: 'What gas do humans breathe in to stay alive?', answer: 'Oxygen' },
    { question: 'What type of energy comes from wind, sun, or water and does not run out?', answer: 'Renewable energy' }
];

// Keep a copy for restart
let originalStatements = statements.slice();
let totalQuestions = originalStatements.length;

function next() {
    if (statements.length < 1) {
       return null;
    }
    const randomIndex = Math.floor(Math.random() * statements.length);
    return statements[randomIndex];
}

function checkQuestion() {
    if (gameOver) return;
    if (!currentQuestion) return;

    if (currentQuestion.answer.toLowerCase() === questionInput.value().trim().toLowerCase()) {
        // remove current question from array
        statements = statements.filter(statementobj => {
            return statementobj !== currentQuestion;
        });
        response = 'Correct! Next question.';
        responseColor = 'green';
        addRandomShape();

        // Win condition
        if (statements.length === 0) {
            response = 'You won! You answered all the questions!';
            responseColor = 'green';
            message = '';
            gameOver = true;
            questionInput.attribute('disabled', '');
            submitAnswerButton.attribute('disabled', '');
            return;
        }
        
        currentQuestion = next();
        message = currentQuestion.question;
    } else {
        misses = misses + 1;
        response = 'Close! Correct answer is ' + currentQuestion.answer;
        responseColor = 'red';

        // LOSE condition
        if (misses >= MAX_MISSES) {
            response = 'You lost. You missed 5 questions.';
            responseColor = 'red';
            message = '';
            gameOver = true;
            questionInput.attribute('disabled', '');
            submitAnswerButton.attribute('disabled', '');
            return;
        }
    }

    questionInput.value('');
}

// Restart funtion
function resetGame () {
    statements = originalStatements.slice();
    misses = 0;
    response = '';
    responseColor = 'green';
    gameOver = false;
    shapes = [];

    questionInput.removeAttribute('disabled');
    submitAnswerButton.removeAttribute('disabled');

    currentQuestion = next();
    message = currentQuestion.question;
    questionInput.value('');
}

// Start game
currentQuestion = next();
let message = currentQuestion.question;

function setup() {
    createCanvas(800, 600);

    heading = createElement('h1', 'Sustainability Quiz');
    heading.position(150, 100);

    questionInput = createInput('');
    questionInput.size(250, 24);
    questionInput.position(150, 220);

    submitAnswerButton = createButton('Submit Answer');
    submitAnswerButton.size(250, 24);
    submitAnswerButton.mousePressed(checkQuestion);
    submitAnswerButton.position(150, 250);

    // Restart button
    restartButton = createButton('Restart Quiz');
    restartButton.size(250, 24);
    restartButton.position(150, 280);
    restartButton.mousePressed(resetGame);
}

function addRandomShape() {
    let shapeType = random(['circle', 'square', 'triangle']);
    let sizeShape = 50; // fixed size
    let colorShape = color(random(255), random(255), random(255));

    // layout settings (right side)
    let startX = width * 0.65;
    let startY = 200;
    let spacing = 60;

    // how many shapes fit across the right-side area
    let shapesPerRow = Math.floor((width - startX - 20) / spacing);
    if (shapesPerRow < 1) shapesPerRow = 1;

    // index of the new shape
    let i = shapes.length;

    // row/column for this shape
    let col = i % shapesPerRow;
    let row = Math.floor(i / shapesPerRow);

    let xShape = startX + col * spacing;
    let yShape = startY + row * spacing;

    shapes.push({ type: shapeType, x: xShape, y: yShape, size: sizeShape, col: colorShape });
}

function draw() {

    // Show incorrect count / until lose
    // fill(0);
    // textSize(16);
    // text('Incorrect answers: ' + misses + ' / ' + MAX_MISSES, 50, 320);
    // text('Misses left: ' + (MAX_MISSES - misses), 50, 345);

    // --- SCORE BAR (progress) ---
    let correct = totalQuestions - statements.length;   // how many answered correctly
    let progress = correct / totalQuestions;            // 0 to 1
    progress = constrain(progress, 0, 1); // constrain(value, min, max)

    // // background gets greener as score increases
    // let bgStart = color(173, 216, 230); // light blue
    // let bgEnd   = color(180, 240, 180); // light green
    // let bgColor = lerpColor(bgStart, bgEnd, progress); //lerpColor() = “linearly interpolate between two colors.”
    // background(bgColor);

    // background reacts to score (green) AND misses (red)
    let greenBoost = progress * 120;                 // more green as score increases
    let redPenalty = (misses / MAX_MISSES) * 120;    // more red as misses increase

    let r = 120 + redPenalty;
    let g = 170 + greenBoost - redPenalty;
    let b = 255 - redPenalty;

    background(r, g, b);

    fill('purple');
    textSize(20);
    text(message, 50, 150);

    fill(responseColor);
    text(response, 50, 280);

    // bar position/size
    let barX = 50;
    let barY = 320;
    let barW = 300;
    let barH = 20;

    // outline
    noFill();
    stroke(0);
    rect(barX, barY, barW, barH);

    // fill (based on progress)
    noStroke();
    fill(0, 200, 0);
    rect(barX, barY, barW * progress, barH);

    // label
    fill(0);
    textSize(14);
    text('Score: ' + correct + ' / ' + totalQuestions, barX, barY - 8);

    // --- LIVES BAR (misses left) ---
    let livesLeft = MAX_MISSES - misses;
    let livesProgress = livesLeft / MAX_MISSES;
    livesProgress = constrain(livesProgress, 0, 1);

    let bar2Y = 370;

    noFill();
    stroke(0);
    rect(barX, bar2Y, barW, barH);

    noStroke();
    fill(200, 0, 0);
    rect(barX, bar2Y, barW * livesProgress, barH);

    fill(0);
    text('Lives left: ' + livesLeft + ' / ' + MAX_MISSES, barX, bar2Y - 8);

    // Draw shapes (stacked on right side)
    for (let i = 0; i < shapes.length; i++) {
        fill(shapes[i].col);
        noStroke();

        if (shapes[i].type === 'circle') {
            circle(shapes[i].x, shapes[i].y, shapes[i].size);
        } else if (shapes[i].type === 'square') {
            square(shapes[i].x, shapes[i].y, shapes[i].size);
        } else if (shapes[i].type === 'triangle') {
            let x = shapes[i].x;
            let y = shapes[i].y;
            let s = shapes[i].size;
            triangle(x, y - s/2, x - s/2, y + s/2, x + s/2, y + s/2);
        }
    }
}



