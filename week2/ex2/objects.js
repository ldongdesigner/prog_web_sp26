// Array of game objects
const myGames = [
    { title: 'Minecraft', type: 'Survival', numberOfPlayers: '1-Multiplayer', rating: '9' },
    { title: 'Breath of the Wild', type: 'Adventure', numberOfPlayers: '1', rating: '10' },
    { title: 'Among Us', type: 'Party', numberOfPlayers: '4-15', rating: '8' }
];

// Prompt the user and cast input to a number
let gameIdx = Number(
    prompt("I have 3 games in my collection. Pick a number between 1 and 3 and I'll tell you about that game ")
);

// Alert the selected game using string concatenation
alert(
    'You selected ' + myGames[gameIdx-1].title + ', which is a ' + myGames[gameIdx-1].type + ' game for ' + myGames[gameIdx-1].numberOfPlayers + ' player(s). It has a rating of ' + myGames[gameIdx-1].rating + '.' 
);

