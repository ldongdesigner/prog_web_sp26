// Array of questions and answers
const natureQuiz = [
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

// Pick a random question
const randomIndex = Math.round(Math.random() * (natureQuiz.length - 1));

// Prompt the user with the question 
const userResponse = prompt(natureQuiz[randomIndex].question);

// Show the response and the correct answer
alert(
    'You answered ' + userResponse + '. The correct answer was ' + natureQuiz[randomIndex].answer + '.' 
);

