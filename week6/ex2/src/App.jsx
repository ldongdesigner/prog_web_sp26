import "./App.css";

function App() {
  // JavaScript variables
  const name = "Leo";
  const myAge = 28;
  const course = "Programming for Web";
  const currentYear = 2026;
  

  // ternerary: condition ? true value : false value
  const workStatus = 
    myAge > 16 
      ? "I am legally allowed to work before 7 a.m." 
      : "I am not allowed to work before 7 a.m."

  return (
    <div className="container">
      <h1>Hello World!</h1>

      <p>My name is {name}.</p>

      <p>
        I am {myAge} years old and taking {course} in {currentYear}.
      </p>

      <p>{workStatus}</p>

      {myAge > 21 && (
          <p>I'm a young adult.</p>
      )}
    </div>
  );
}

export default App;
