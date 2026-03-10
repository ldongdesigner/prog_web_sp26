import "./App.css";
import { useState } from "react";

import alpacaImg from "./assets/alpaca.png";
import llamaImg from "./assets/llama.png";

function App() {
  const [camelidImg, setCamelidImg] = useState({
    name: "Llama",
    image: llamaImg,
    fact: "Llamas are larger and are often used as pack animals."
  });

  function showAlpaca() {
    setCamelidImg({
      name: "Alpaca",
      image: alpacaImg,
      fact: "Alpacas are smaller and are famous for their soft fiber."
    });
  }

  function showLlama() {
    setCamelidImg({
      name: "Llama",
      image: llamaImg,
      fact: "Llamas are larger and are often used as pack animals."
    });
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Camelid Image Swapper</h1>

        <img
          className="camelid-img"
          src={camelidImg.image}
          alt={camelidImg.name}
        />

        <h2>{camelidImg.name}</h2>
        <p className="fact">{camelidImg.fact}</p>

        <div className="button-group">
          <button
            className={camelidImg.name === "Alpaca" ? "active" : ""}
            onClick={showAlpaca}
          >
            Alpaca
          </button>

          <button
            className={camelidImg.name === "Llama" ? "active" : ""}
            onClick={showLlama}
          >
            Llama
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
