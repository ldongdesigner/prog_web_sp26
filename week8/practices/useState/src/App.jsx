import './App.css'
import {useState} from "react";

function App() {
  const [scoreObj, setScoreObj] = useState({left: 0, right: 0});

function incrementRightScore () {
  const newScore = {
    left: scoreObj.left,
    right: scoreObj.right + 1
  }
  setScoreObj(newScore);
}

  return (
    <>
    <h1> Solitare clicky game</h1>
    <div>
      left
      <button onClick={() => {
        setScoreObj({...scoreObj, left: scoreObj.left + 1});
      }}>Push Me</button>
    </div>

    <div>
      right
      <button onClick={incrementRightScore}>No Push Me</button>
    </div>

    <div>
      <h2>Scores</h2>
        Left Score {scoreObj.left} | Right Score {scoreObj.right}
    </div>
    </>  
  )
}

export default App
