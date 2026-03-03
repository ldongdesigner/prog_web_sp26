function App() {
  const cars = [
    "Honda",
    "Chevy",
    "Kia",
    "Ford"
  ];

  return (
    <div>
      <h1>Rendering Lists</h1>
      { cars.map((car) => {

        return (<div key={car}>{car}</div>)
      })}
    </div>
  )
}

export default App;