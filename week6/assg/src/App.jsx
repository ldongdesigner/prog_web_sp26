import './App.css'

function App() {

  const llamaFacts = [
    "Llamas are domesticated camelids.",
    "Llamas come from South America.",
    "Llamas are used as pack animals.",
    "Llamas eat grass and hay.",
    "Llamas can spit when threatened.",
    "Llamas can be trained to dance.",
    "Llamas cannot be trained to dance.",
  ];

  const canDance = false;

  const baseFacts = llamaFacts.slice(0, 5);
  const danceFact = canDance ? llamaFacts[5] : llamaFacts[6];

  return (
   <div className="container">
    <h1>Llama Facts</h1>
    <ul>
      {baseFacts.map((fact, index) => (
        <li key={index}>{fact}</li>
      ))}

      <li>{danceFact}</li>
    </ul>
   </div>
  );
}

export default App
