import './App.css';
import { useState } from "react";
import Login from "./pages/Login";
import Timer from "./pages/Timer";

function App() {
  const [access, setAccess] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        { !access ? <Login access={access} setAccess={setAccess}/> : <Timer/> }
      </header>
    </div>
  );
}

export default App;
