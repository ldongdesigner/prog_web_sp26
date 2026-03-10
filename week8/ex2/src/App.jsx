import { useState } from "react";
import './App.css';
import AnimalComponent from './AnimalComponent';

function App() {
  const [headline, setHeadline] = useState("Leo's List of Animals");

  const [animals, setAnimals] = useState([
    "Alpaca",
    "Llama",
    "Elephant",
    "Tiger",
    "Panda",
    "Giraffe",
    "Zebra",
    "Kangaroo",
    "Penguin",
    "Dolphin"
  ]);

  function deleteAnimal(animalName) {
    const updatedAnimals = animals.filter((animal) => animal !== animalName);
    setAnimals(updatedAnimals);
  }

  function focusAnimal(animalName) {
    setHeadline(`Focused animal: ${animalName}`);
  }

  return (
    <div className="app">
      <h1>{headline}</h1>

      {animals.length === 0 ? (
        <p className="empty-message">No animals left in the list.</p>
      ) : (
        <div className="animal-list">
          {animals.map((animal) => (
            <AnimalComponent
              key={animal}
              animalName={animal}
              deleteFn={deleteAnimal}
              focusFn={focusAnimal}
            />
          ))}
        </div>
       )}
    </div>
  );
}
    
export default App
