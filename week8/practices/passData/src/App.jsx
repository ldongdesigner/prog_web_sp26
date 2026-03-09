import { useState } from 'react'

import './App.css'

function App() {
 const [headline, setHeadline] = useState("List of American States");
 const [usStates, setUsStates] = useState();

  return (
    <>
      <h1>{headline}</h1>
    </>
  )
}

export default App
