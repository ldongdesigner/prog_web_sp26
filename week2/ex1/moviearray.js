// Create an array with my 5 favorite sustainability-related movies
let favMovies = ['Interstellar', 'Kiss the Ground', 'Before the Flood', 'WALL.E', 'An Inconvenient Truth'];
console.log("My favorite movies on sustainability are: ", favMovies);

// Prompt the user to enter their favorite sustainability movie
let userMovie = prompt ("What is your favorite movie about sustainability?");

// Add the user's movie to the array
favMovies.push(userMovie);
console.log("Updated favorite movies on sustainability are: ", favMovies);

// Convert the array to a string
let movielist = favMovies.toString();

// Display the full list of movies using an alert
alert("My favorite movies on sustainability are:\n" + movielist);


