import Camelid from "./Camelid";

import llamaImg from "./assets/llama.png";
import alpacaImg from "./assets/alpaca.png";

export default function App() {

  const llama = {
    name: "Llama",
    img: llamaImg,
    trivia: "Llamas are often used as pack animals."
  };

  const alpaca = {
    name: "Alpaca",
    img: alpacaImg,
    trivia: "Alpacas are raised for their soft fiber."
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Llama vs Alpaca</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <Camelid {...llama} />
        <Camelid {...alpaca} />
      </div>
      
    </div>
  );
}