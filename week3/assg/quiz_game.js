let submitAnswerButton;
let questionInput;
let currentQuestion;
let response;
let responseColor = 'green';
let heading;
let statements = [
    { question: 'What gas do plants absorb from the air to make food?', answer: 'Carbon dioxide' },
    { question: 'What process do plants use to make their own food using sunlight?', answer: 'Photosynthesis' },
    { question: 'What do we call animals that eat only plants?', answer: 'Herbivores' },
    { question: 'What is the main source of energy for Earth?', answer: 'The Sun' },
    { question: 'What natural resource is needed for all living things to survive?', answer: 'Water' },
    { question: 'What layer of the Earth is made of soil and rock where plants grow?', answer: 'The crust' },
    { question: 'What do we call trash that can be reused to make new products?', answer: 'Recyclables' },
    { question: 'What gas do humans breathe in to stay alive?', answer: 'Oxygen' },
    { question: 'What do we call a place where plants and animals live?', answer: 'Habitat' },
    { question: 'What type of energy comes from wind, sun, or water and does not run out?', answer: 'Renewable energy' }

];
function next() {
    if(statements.length < 1) {
        alert('you won');
        return;
    }
    const randomIndex = Math.ceil(Math.random() * statements.length -1);
    return statements[randomIndex];
}
function checkQuestion() {
    if (currentQuestion.answer == questionInput.value()) {
        // remove correct answer from array
        statements = statements.filter(statementobj => {
            return currentQuestion.answer != statementobj.answer;
        });
        // this is the correct condition
        response = 'correct! next question';
        responseColor = 'green';
    } else {
        // this is the wrong answer condition
        response = 'oops, that wasn\'t quite right! try another';
        responseColor = 'red';
    }
    currentQuestion = next();
    questionInput.value('');
    if (currentQuestion) {
       message = currentQuestion.question; 
    }
    
}
//console.log(next());
currentQuestion = next();
let message = currentQuestion.question;
function setup {
    createCanvas(800, 600);
    
    heading = createElement('h1', ['Color Quiz']);
    heading.position(100, 100);
    questionInput = createInput('');
    questionInput.size(250, 24);
    questionInput.position(100, 220);
    submitAnswerButton = createButton('submit answer');
    submitAnswerButton.size(250, 24);
    submitAnswerButton.mousePressed(checkQuestion);
    submitAnswerButton.position(100, 250);

}
function draw() {
    background('lightblue');
    fill('purple');
    textSize(24);
    text(message, 100, 200);
    fill(responseColor);
    text(response, 100, 350);
}

