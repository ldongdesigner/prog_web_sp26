import './App.css'

function App() {

  const baseFacts = [
    "Llamas are domesticated camelids.",
    "Llamas come from South America.",
    "Llamas are used as pack animals.",
    "Llamas eat grass and hay.",
    "Llamas can spit when threatened.",
  ];

  const danceFacts = {
    yes: "Llamas can be trained to dance.",
    no: "Llamas cannot be trained to dance.",
  };
  
  const canDance = false;

  const danceFact = canDance ? danceFacts.yes : danceFacts.no;

  return (
   <div className="container">
    <h1>Llama Facts</h1>

    <ul>
      {baseFacts.map((fact) => (
        <li key={fact}>{fact}</li>
      ))}

      <li key="dance-fact">{danceFact}</li>
    </ul>
   </div>
  );
}

export default App
