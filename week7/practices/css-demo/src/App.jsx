import "./styles.css";

function App() {
  const kenAge = 28;
  const paragraphStyleObj = {
    color: "green",
    fontSize: "36px",
    margin: "20px auto",
    width: "600px"
  }

  return (
    <>
      <h1 className={kenAge > 18 && "blue"}>Css Demo</h1>
      <p style={paragraphStyleObj}>This is some random test</p>
    </>
  )
}

export default App