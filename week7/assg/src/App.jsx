function App() {
  const commanderDecks = [
    {
      commander: "Alela, Cunning Conqueror",
      colors: ["blue", "green", "black"],
      theme: "Fairy typal",
      hasWon: true,
      mainGroup: true
    },
    {
      commander: "Kaust, Eyes of the Glade",
      colors: ["green", "red", "white"],
      theme: "Face down creatures",
      hasWon: false,
      mainGroup: false
    },
    {
      commander: "Esix, Fractal Bloom",
      colors: ["blue", "green"],
      theme: "token clones",
      hasWon: true,
      mainGroup: true
    },
    {
      commander: "Muldrotha, The Grave Tide",
      colors: ["blue", "green", "black"],
      theme: "Graveyard recursion",
      hasWon: false,
      mainGroup: false
    },
    {
      commander: "Breya, Etherium Shaper",
      colors: ["white", "black", "blue", "red"],
      theme: "Artifacts",
      hasWon: true,
      mainGroup: true
    },

  ]
  return (
    <>
      <h1>My Commander Collection</h1>
      <p>Show decks here</p>
      <table className="commander-table">
        <thead>
          <tr>
            <th>Commander Name</th>
            <th>Colors</th>
            <th>Has Won</th>
            <th>Usually take</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{commanderDecks[0].commander}</td>
            <td>{commanderDecks[0].colors.join(", ")}</td>
            <td>{commanderDecks[0].hasWon}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default App;