// Select the empty div
const myEmptyDiv = document.querySelector('#myEmptyDiv');

// Create a new headline element
const heading = document.createElement('h2');
heading.textContent = 'Llamas have excellent taste in mountain views.';
heading.style.cursor = 'pointer';

// Append the headline to the div
myEmptyDiv.appendChild(heading);

// Add click event listener
heading.addEventListener('click', function() {
    // Toggle background color on each click
    if (document.body.style.backgroundColor === 'lightgreen') {
        document.body.style.backgroundColor = 'lightyellow';
    } else {
        document.body.style.backgroundColor = 'lightgreen';
    }
});

