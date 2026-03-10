import { useState } from "react";
import { nanoid } from "nanoid";
import "./styles.css";
import Wonder from "./Wonder";

import greatWallImg from "./assets/great-wall.jpg";
import petraImg from "./assets/petra.jpg";
import colosseumImg from "./assets/colosseum.jpg";
import chichenItzaImg from "./assets/chichen-itza.jpg";
import machuPicchuImg from "./assets/machu-picchu.jpg";
import tajMahalImg from "./assets/taj-mahal.jpg";
import christImg from "./assets/christ-the-redeemer.jpg";

function App() {
  const [wonders, setWonders] = useState([
    {
      id: nanoid(),
      name: "Great Wall of China",
      location: "China",
      year: "700 BCE",
      image: greatWallImg,
      fact: "A massive wall system built across northern China over many centuries.",
      ancient: true
    },
    {
      id: nanoid(),
      name: "Petra",
      location: "Ma'an, Jordan",
      year: "312 BCE",
      image: petraImg,
      fact: "An ancient city famous for rock-cut architecture and rose-colored stone.",
      ancient: true
    },
    {
      id: nanoid(),
      name: "Colosseum",
      location: "Rome, Italy",
      year: "80 CE",
      image: colosseumImg,
      fact: "The largest amphitheater of the Roman Empire, used for public spectacles.",
      ancient: true
    },
    {
      id: nanoid(),
      name: "Chichen Itza",
      location: "Yucatán, Mexico",
      year: "600 CE",
      image: chichenItzaImg,
      fact: "A major Maya city best known for the pyramid El Castillo.",
      ancient: false
    },
    {
      id: nanoid(),
      name: "Machu Picchu",
      location: "Cuzco Region, Peru",
      year: "1450 CE",
      image: machuPicchuImg,
      fact: "An Inca mountain citadel set high in the Andes.",
      ancient: false
    },
    {
      id: nanoid(),
      name: "Taj Mahal",
      location: "Agra, India",
      year: "1643 CE",
      image: tajMahalImg,
      fact: "A white marble mausoleum built by Shah Jahan for Mumtaz Mahal.",
      ancient: false
    },
    {
      id: nanoid(),
      name: "Christ the Redeemer",
      location: "Rio de Janeiro, Brazil",
      year: "1931 CE",
      image: christImg,
      fact: "A monumental statue standing atop Corcovado Mountain overlooking Rio.",
      ancient: false
    }
  ]);

    function deleteWonder(id) {
      setWonders((currentWonders) =>
        currentWonders.filter((wonder) => wonder.id !==id)
      );
    }

    function duplicateWonder(id) {
      setWonders((currentWonders) => {
        const wonderToDuplicate = currentWonders.find(
          (wonder) => wonder.id === id
        );
        
      if (!wonderToDuplicate) {
        return currentWonders;
      }

      const wonderIndex = currentWonders.findIndex(
        (wonder) => wonder.id === id
      );

      const duplicatedWonder = {
        ...wonderToDuplicate,
        id: nanoid(),
        name: `${wonderToDuplicate.name} Copy`
      };

        return [
          ...currentWonders.slice(0, wonderIndex + 1),
          duplicatedWonder,
          ...currentWonders.slice(wonderIndex + 1)
        ];
      });
        
    }

  return (
    <div className="App">
      <header className="page-header">
        <h1>New Seven Wonders of the World</h1>
        <p className="intro">
          This collection highlights the seven monuments chosen in the 2007 New
          Seven Wonders campaign. Each card shows the wonder&apos;s image, location,
          year, and a key fact. Use the buttons to duplicate or remove a card.
        </p>
        <p className="legend">
          <span className="legend-box"></span>
          Highlighted cards mark wonders from ancient historic periods.
        </p>
      </header>
      
      {wonders.length === 0 ? (
        <p className="empty-message">No wonders left in the collection.</p>
      ) : (
        <section className="wonder-list">
          {wonders.map((wonder) => (
            <Wonder 
              key={wonder.id}
              wonder={wonder}
              deleteWonder={deleteWonder}
              duplicateWonder={duplicateWonder} 
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default App;